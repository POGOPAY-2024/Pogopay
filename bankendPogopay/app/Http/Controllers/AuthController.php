<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Register a new user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string|max:15|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'rib' => 'required|string|max:23|unique:users',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'rib' => $request->rib,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('Personal Access Token')->accessToken;

        return response()->json(['token' => $token], 201);
    }



    /**
     * Login a user and create token.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
{
    if (Auth::attempt(['email' => $request->input("email"), 'password' => $request->input("password")])) {
        $user = User::where('email', $request->email)->first();
                $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(['token' => $token, 'user' => $user], 200);
    }
    return response()->json(['message' => 'Unauthorized'], 401);
}




    /**
     * Logout the user (Revoke the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        // $user = Auth::user()->token();
        // $user->revoke();

        // return response()->json(['message' => 'Successfully logged out'], 200);


        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out'], 200);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function createToken(Request $request)
    {
        $token = $request->user()->createToken('auth_token')->plainTextToken;
        return response()->json(['token' => $token], 200);
    }

    public function passwordverif(Request $request, $id)
    {
        $request->validate([
            'password' => 'required|string',
        ]);

        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        if (Hash::check($request->password, $user->password)) {
            return response()->json(['success' => true], 200);
        } else {
            return response()->json(['error' => 'Invalid password'], 400);
        }
    }
      
    public function getCardsselct($iduser)
    {
        $user = User::find($iduser);
    
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
    
        $cards = $user->cards;
    
        return response()->json(['cards' => $cards]);
    }
    

}
