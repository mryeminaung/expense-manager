<?php
namespace App\Http\Controllers\Expense;

use App\Http\Controllers\Controller;
use App\Http\Requests\Expense\TransactionRequest;
use App\Http\Resources\Expense\TransactionResource;
use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transactions = Transaction::with('category')->get();
        $categories   = Category::all()->groupBy('type');

        return Inertia::render('transactions/index', [
            'transactions' => TransactionResource::collection($transactions),
            'categories'   => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TransactionRequest $request)
    {
        Transaction::create($request->validated());

        return to_route('transactions.index')
            ->with('success', 'Transaction created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transaction $transaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        $transaction->delete();

        return to_route('transactions.index')
            ->with('success', 'Transaction deleted successfully.');
    }
}
