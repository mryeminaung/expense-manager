import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import categories from '@/routes/categories';
import { router } from '@inertiajs/react';
import { CircleSmall, Trash2 } from 'lucide-react';

type Category = {
    id: number;
    name: string;
    type: 'expense' | 'income';
};

export default function CategoryCard({ category }: { category: Category }) {
    return (
        <div className="group my-3 flex items-center justify-between rounded-xl border p-4">
            <div className="flex items-center gap-x-2">
                <CircleSmall
                    className="h-4 w-4"
                    color={category.type === 'income' ? 'green' : 'red'}
                    fill={category.type === 'income' ? 'green' : 'red'}
                />
                <p className="text-[14px]">{category.name}</p>
            </div>
            <div className="flex items-center gap-x-5">
                <Badge
                    className={cn(
                        'font-semibold capitalize',
                        category.type === 'income'
                            ? 'bg-green-500'
                            : 'bg-red-500',
                    )}
                >
                    {category.type}
                </Badge>
                <Trash2
                    onClick={() =>
                        router.delete(categories.destroy(category).url)
                    }
                    className="visible h-4 w-4 scale-90 transition-all duration-100 group-hover:visible group-hover:scale-100 md:invisible"
                />
            </div>
        </div>
    );
}
