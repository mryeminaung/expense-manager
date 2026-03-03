<?php
namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $incomeCategories = [[
            'name' => 'Salary',
            'type' => 'income',
        ], [
            'name' => 'Freelance',
            'type' => 'income',
        ], [
            'name' => 'Freelance',
            'type' => 'income',
        ]];

        $expenseCategories = [[
            'name' => 'Food & Drinks',
            'type' => 'expense',
        ], [
            'name' => 'Transportation',
            'type' => 'expense',
        ], [
            'name' => 'Shopping',
            'type' => 'expense',
        ], [
            'name' => 'Entertainment',
            'type' => 'expense',
        ], [
            'name' => 'Health',
            'type' => 'expense',
        ], [
            'name' => 'Education',
            'type' => 'expense',
        ]];

        foreach (array_merge($incomeCategories, $expenseCategories) as $category) {
            Category::create($category);
        }

        // Category::insert(array_merge($incomeCategories, $expenseCategories));
    }
}
