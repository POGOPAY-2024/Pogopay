<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use App\Http\Controllers\AdminController;


Route::middleware(['web'])->group(function () {
    Route::get('dashboard', [AdminController::class, 'showDashboard'])->name('dashboard');
    Route::delete('/delete/{id}', [AdminController::class, 'destroy'])->name('destroy');
    Route::get('/transactions/{id}', [AdminController::class, 'getTransaction'])->name('transactions.show');
});

 
require __DIR__.'/auth.php';
