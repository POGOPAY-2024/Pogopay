<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/add-card', [PaymentController::class, 'addCard']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/generate-qr-code', [PaymentController::class, 'generateQrCode']);
    Route::post('/scan-qr-code', [PaymentController::class, 'scanQrCode']);
    Route::post('/process-payment', [PaymentController::class, 'processPayment']);
    Route::get('/transaction-history', [PaymentController::class, 'transactionHistory']);
    Route::get('/profile', [PaymentController::class, 'getProfile']);
    Route::put('/profile', [PaymentController::class, 'updateProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/token', [AuthController::class, 'createToken'])->middleware('auth:sanctum');
    Route::get('/get-cards/{id}', [PaymentController::class, 'getCards']); 


});



