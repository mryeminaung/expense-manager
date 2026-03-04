import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type Category = {
    id: number;
    name: string;
};

type Categories = {
    expense: Category[];
    income: Category[];
};

interface CategorySelectorProps {
    value: number;
    setData: (field: 'category_id', value: number) => void;
    currentType: 'expense' | 'income' | null;
}

export function CategorySelector({
    value,
    setData,
    currentType,
}: CategorySelectorProps) {
    const { categories } = usePage<{ categories: Categories }>().props;
    const [currentCategories, setCurrentCategories] = useState<Category[]>([]);

    useEffect(() => {
        if (!currentType) {
            setCurrentCategories([]);
            return;
        }
        setCurrentCategories(
            currentType === 'expense' ? categories.expense : categories.income,
        );
    }, [categories, currentType]);

    return (
        <Select
            value={value ? String(value) : ''}
            onValueChange={(val) => setData('category_id', Number(val))}
        >
            <SelectTrigger disabled={!currentType} className="w-full">
                <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel className="capitalize">
                        {currentType}
                    </SelectLabel>
                    {currentCategories.map((category) => (
                        <SelectItem
                            key={category.id}
                            value={String(category.id)}
                        >
                            {category.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
