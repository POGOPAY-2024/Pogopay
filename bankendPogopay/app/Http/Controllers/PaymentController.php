<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Log;

use Illuminate\Http\Request;
use SimpleXMLElement;
use GuzzleHttp\Client;
use Endroid\QrCode\QrCode;
use Illuminate\Support\Facades\Validator;


use App\Models\Transaction;
use App\Models\User;
use App\Models\Card; 
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    private $apiName = 'pogo_api';
    private $apiPassword = 'Pogo_api2022';
    private $clientId = '600003404';
    private $cmiApiUrl = 'https://testpayment.cmi.co.ma/fim/api';
    
    public function addCard(Request $request)
    {
        $header = $request->header('Authorization');
       print($header);
       $var='test tokn';
       $output = new \Symfony\Component\Console\Output\ConsoleOutput();
$output->writeln("<info>$header</info>");
$output->writeln("<info>$var</info>");

//dd($request->all());    
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id', 
            'card_number' => 'required|string|max:19',
            'expiry_date' => 'required',
            'cvv' => 'required|string|max:4', 
        ]);
    
        $card = Card::create([
            'user_id' => $validatedData['user_id'], 
            'card_number' => $validatedData['card_number'],
            'expiry_date' => $validatedData['expiry_date'],
            'cvv' => $validatedData['cvv'],
        ]);
    
        return response()->json($card, 201);
    }
    
    
    public function getCards($iduser)
    {
        $user = User::find($iduser);
    
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
    
        $cards = $user->cards;
    
        return response()->json($cards);
    }
    
    public function generateQrCode()
    {    
        $user = Auth::user();
        
        $rib = $user->rib;
        $name= $user->$name;

        $qrData = [
            'rib' => $rib,
            'name'=>$name,
        ];

        $qrCode = new QrCode(json_encode($qrData));

        return response($qrCode->writeString(), 200)->header('Content-Type', 'image/png');
    }

    //   traiter le QR code scanné
public function scanQrCode(Request $request)
{
    $qrData = json_decode($request->input('qr_data'), true);

    if (!$qrData) {
        return response()->json(['error' => 'Invalid QR data'], 400);
    }

    $recipientRib = $qrData['rib'] ?? null;
    $accountName = $qrData['accountName'] ?? null;

    if ($recipientRib && $accountName) {
        return response()->json(['rib' => $recipientRib, 'accountName' => $accountName]);
    } else {
        return response()->json(['error' => 'Recipient RIB or account name not found in QR data'], 400);
    }
}

    // Process payment via CMI API
    public function processPayment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'amountsansfrais' => 'required|numeric|min:0.01',
            'amountavecfrais' => 'required|numeric|min:0.01',
            'recipient_rib' => 'required',
            'card_id' => 'required',
            'user_id' => 'required',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => $validator->errors()], 422);
        }
       
        $validatedData = $validator->validated();
        $amountsansfrais = $validatedData['amountsansfrais'];
        $amountavecfrais = $validatedData['amountavecfrais'];
        $recipientRib = $validatedData['recipient_rib'];
        $cardId = $validatedData['card_id'];
        $userid = $validatedData['user_id'];

        $card = Card::find($cardId);

        if (!$card) {
            return response()->json(['status' => 'error', 'message' => 'No card found for user'], 400);
        }

        $preAuthResponse = $this->sendPaymentRequest('PreAuth', $amountavecfrais, $card->card_number, $card->expiry_date, $card->cvv);

            $orderId = $preAuthResponse->OrderId;
            $postAuthResponse = $this->sendPostAuthRequest($orderId);

            $output = new \Symfony\Component\Console\Output\ConsoleOutput();
            $output->writeln("<info>$preAuthResponse->Response</info>");

            //$output->writeln("<info>$postAuthResponse</info>");
        $transaction = Transaction::create([
            'user_id' => $userid, 
            'recipient_rib' => $recipientRib,
            'amountsansfrais' => $amountsansfrais,
            'amountavecfrais' => $amountavecfrais,
            'status' => 'completed',

        ]);
              
                return response()->json(['status' => 'success', 'message' => 'Payment completed successfully']);
          
       
    }

    private function sendPaymentRequest($type, $amount, $cardNumber, $cardExpiry, $cvv)
    {
        $xml = new SimpleXMLElement('<CC5Request/>');
        $xml->addChild('Name', $this->apiName);
        $xml->addChild('Password', $this->apiPassword);
        $xml->addChild('ClientId', $this->clientId);
        $xml->addChild('Type', $type);
        $xml->addChild('Total', $amount);
        $xml->addChild('Currency', '504'); // Example for Moroccan Dirham
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


    // récupérer l'historique des transactions
    public function transactionHistory($iduser)
    {
        $user = User::find($iduser);
    
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
    
        $transactions = $user->transactions;

        return response()->json($transactions);
    }

    public function getProfile(Request $request)
    {
        $user = Auth::user();
        return response()->json($user);
    }

    //update user profile
    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        $user->update($request->only('name', 'email', 'phone'));
        return response()->json(['status' => 'success', 'message' => 'Profile updated successfully', 'user' => $user]);
    }
}