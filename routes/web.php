<?php

use App\Http\Controllers\Expense\CategoryController;
use App\Http\Controllers\Expense\DashboardController;
use App\Http\Controllers\Expense\TransactionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::resources([
    'categories'   => CategoryController::class,
    'transactions' => TransactionController::class,
]);

require __DIR__ . '/settings.php';
