<?php
namespace App\Http\Controllers;
use App\Models\User;

use Illuminate\Http\Request;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
class AdminController extends Controller
{
    public function login( Request $request )
    {
        $request->validate([
            "email"=>"required"
        ]);
        if(Auth::attempt(["email"=>$request->input("email"),"password"=>$request->input("password")])){
           if ( Auth::user()->role == "admin"  ){
                session()->regenerate();
                toastr()->success('Login successfully!');
                return to_route("dashboard");
            }
        }
        toastr()->error('invalid credentials!');
        return back();
    }
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        toastr()->success('Logout successfully!');
        return to_route("showLogin");
    }
    public function showDashboard()
    {
        $transactions = Transaction::with('user')->get();
        return view('dashboard', compact('transactions'));
    }
    public function showUsers()
    {
        $users = User::where('role', 'user')->withCount('transactions')->get();
        return view('users', compact('users'));
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
