<?php
namespace Database\Seeders;

use App\Models\Transaction;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $transactions = [
            [
                'amount'      => 120.50,
                'category_id' => 1,
                'date'        => '2024-06-01',
                'remark'      => 'Groceries',
            ],
            [
                'amount'      => 45.00,
                'category_id' => 2,
                'date'        => '2024-06-02',
                'remark'      => 'Transport',
            ],
            [
                'amount'      => 200.00,
                'category_id' => 3,
                'date'        => '2024-06-03',
                'remark'      => 'Utilities',
            ],
            [
                'amount'      => 75.25,
                'category_id' => 1,
                'date'        => '2024-06-04',
                'remark'      => 'Groceries',
            ],
            [
                'amount'      => 30.00,
                'category_id' => 4,
                'date'        => '2024-06-05',
                'remark'      => 'Entertainment',
            ],
            [
                'amount'      => 150.00,
                'category_id' => 5,
                'date'        => '2024-06-06',
                'remark'      => 'Shopping',
            ],
            [
                'amount'      => 60.00,
                'category_id' => 2,
                'date'        => '2024-06-07',
                'remark'      => 'Transport',
            ],
            [
                'amount'      => 90.00,
                'category_id' => 3,
                'date'        => '2024-06-08',
                'remark'      => 'Utilities',
            ],
            [
                'amount'      => 110.00,
                'category_id' => 4,
                'date'        => '2024-06-09',
                'remark'      => 'Entertainment',
            ],
            [
                'amount'      => 80.00,
                'category_id' => 5,
                'date'        => '2024-06-10',
                'remark'      => 'Shopping',
            ],
        ];

        foreach ($transactions as $transaction) {
            Transaction::create($transaction);
        }
        
        // Transaction::insert($transactions);
    }
}
