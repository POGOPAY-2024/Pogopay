<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;

class AdminController extends Controller
{
    public function showDashboard()
    {
        $transactions = Transaction::with('user')->get();
        return view('dashboard', compact('transactions'));
    }

    public function destroy($id)
    {
        $transaction = Transaction::findOrFail($id);
        $transaction->delete();

        return redirect()->back()->with('success', 'Transaction supprimée avec succès');
    }

    public function getTransaction($id)
{
    $transaction = Transaction::with('user')->findOrFail($id);
    return response()->json($transaction);
}

}
