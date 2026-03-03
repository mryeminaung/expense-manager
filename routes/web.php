<?php

use App\Http\Controllers\Expense\CategoryController;
use App\Http\Controllers\Expense\TransactionController;
use App\Models\Category;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    $categories = Category::all()->groupBy('type');
    return Inertia::render('dashboard', compact('categories'));
})->middleware(['auth', 'verified'])->name('dashboard');

Route::resources([
    'categories'   => CategoryController::class,
    'transactions' => TransactionController::class,
]);

require __DIR__ . '/settings.php';
