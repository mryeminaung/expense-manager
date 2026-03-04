import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import CategoryCard from './category-card';

type Category = {
    id: number;
    name: string;
    type: 'expense' | 'income';
};

type Categories = {
    expense: Category[];
    income: Category[];
};

export default function CategoriesTable() {
    const { categories } = usePage<{ categories: Categories }>().props;
    const { flash } = usePage<{ flash: { success?: string; error?: string } }>()
        .props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success, {
                position: 'top-right',
                duration: 1000,
            });
        }
    }, [flash]);

    return (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-10">
            <div className="col-span-1">
                <h3 className="text-sm font-semibold uppercase">
                    Income Categories
                </h3>
                {categories.income.map((category: Category) => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
            <div className="col-span-1">
                <h3 className="text-sm font-semibold uppercase">
                    Expense Categories
                </h3>
                <div className="flex"></div>
                {categories.expense.map((category: Category) => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
        </div>
    );
}
