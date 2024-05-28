<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use SimpleXMLElement;
use GuzzleHttp\Client;
use Endroid\QrCode\QrCode;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Card; // Assurez-vous que ce modèle existe et est configuré
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    private $cmiApiUrl;
    private $clientId;
    private $apiName;
    private $apiPassword;

    public function __construct()
    {
        $this->cmiApiUrl = env('CMI_API_URL');
        $this->clientId = env('CMI_CLIENT_ID');
        $this->apiName = env('CMI_API_NAME');
        $this->apiPassword = env('CMI_API_PASSWORD');
    }

    public function addCard(Request $request)
    {
        $validatedData = $request->validate([
            'card_number' => 'required|string|max:19',
            'expiry_date' => 'required|date_format:m/Y',
            'cvv' => 'required|string|max:4',
        ]);

        $card = Card::create([
            'user_id' => Auth::id(),
            'card_number' => $validatedData['card_number'],
            'expiry_date' => $validatedData['expiry_date'],
            'cvv' => $validatedData['cvv'],
        ]);

        return response()->json($card, 201);
    }

    // Méthode pour générer le QR code
    public function generateQrCode(Request $request)
    {    
        $user = Auth::user();
        
        $rib = $user->rib;
        $fullname= $user->$name;

        $qrData = [
            'recipient_rib' => $rib,
            'fullname'=>$fullname,
        ];

        $qrCode = new QrCode(json_encode($qrData));

        return response($qrCode->writeString(), 200)->header('Content-Type', 'image/png');
    }

    //  pour traiter le QR code scanné
    public function scanQrCode(Request $request)
    {
        $qrData = json_decode($request->input('qr_data'), true);

        $recipientRib = $qrData['recipient_rib'] ?? null;

        if ($recipientRib) {
            return response()->json(['recipient_rib' => $recipientRib]);
        } else {
            return response()->json(['error' => 'Recipient RIB not found in QR data'], 400);
        }
    }

    // Process payment via CMI API
    public function processPayment(Request $request)
    {
        $validatedData = $request->validate([
            'amountsansfrais' => 'required|numeric',
            'amountavecfrais' => 'required|numeric',
            'recipient_rib' => 'required|string',
        ]);

        $amountsansfrais = $validatedData['amountsansfrais'];
        $amountavecfrais = $validatedData['amountavecfrais'];
        $recipientRib = $validatedData['recipient_rib'];

        $user = Auth::user();
        $card = Card::where('user_id', $user->id)->first(); // Suppose que chaque utilisateur a une carte par défaut. Ajustez selon vos besoins.

        if (!$card) {
            return response()->json(['status' => 'error', 'message' => 'No card found for user'], 400);
        }

        $preAuthResponse = $this->sendPaymentRequest('PreAuth', $amountavecfrais, $card->card_number, $card->expiry_date, $card->cvv);

        if ($preAuthResponse->ProcReturnCode == '00') {
            $orderId = $preAuthResponse->OrderId;
            $postAuthResponse = $this->sendPostAuthRequest($orderId);

            if ($postAuthResponse->ProcReturnCode == '00') {
                $transaction = new Transaction();
                $transaction->user_id = Auth::id();
                $transaction->recipient_rib = $recipientRib;
                $transaction->amountsansfrais = $amountsansfrais;
                $transaction->amountavecfrais = $amountavecfrais;
                $transaction->status = 'completed';
                $transaction->save();

                return response()->json(['status' => 'success', 'message' => 'Payment completed successfully']);
            } else {
                return response()->json(['status' => 'error', 'message' => 'Post-auth failed']);
            }
        } else {
            return response()->json(['status' => 'error', 'message' => 'Pre-auth failed']);
        }
    }

    private function sendPaymentRequest($type, $amount, $cardNumber, $cardExpiry, $cvv)
    {
        $xml = new SimpleXMLElement('<CC5Request/>');
        $xml->addChild('Name', $this->apiName);
        $xml->addChild('Password', $this->apiPassword);
        $xml->addChild('ClientId', $this->clientId);
        $xml->addChild('Type', $type);
        $xml->addChild('Total', $amount);
        $xml->addChild('Currency', '504');
        $xml->addChild('Number', $cardNumber);
        $xml->addChild('Expires', $cardExpiry);
        $xml->addChild('Cvv2Val', $cvv);

        $client = new Client();
        $response = $client->post($this->cmiApiUrl, [
            'body' => $xml->asXML(),
            'headers' => [
                'Content-Type' => 'application/xml'
            ]
        ]);

        return new SimpleXMLElement($response->getBody()->getContents());
    }

    private function sendPostAuthRequest($orderId)
    {
        $xml = new SimpleXMLElement('<CC5Request/>');
        $xml->addChild('Name', $this->apiName);
        $xml->addChild('Password', $this->apiPassword);
        $xml->addChild('ClientId', $this->clientId);
        $xml->addChild('Type', 'PostAuth');
        $xml->addChild('OrderId', $orderId);

        $client = new Client();
        $response = $client->post($this->cmiApiUrl, [
            'body' => $xml->asXML(),
            'headers' => [
                'Content-Type' => 'application/xml'
            ]
        ]);

        return new SimpleXMLElement($response->getBody()->getContents());
    }

    // Méthode pour récupérer l'historique des transactions
    public function transactionHistory(Request $request)
    {
        $userId = Auth::id();
        $transactions = Transaction::where('user_id', $userId)->orWhere('recipient_id', $userId)->get();

        return response()->json($transactions);
    }

    public function getProfile(Request $request)
    {
        $user = Auth::user();
        return response()->json($user);
    }

    // Method to update user profile
    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        $user->update($request->only('name', 'email', 'phone'));
        return response()->json(['status' => 'success', 'message' => 'Profile updated successfully', 'user' => $user]);
    }
}
