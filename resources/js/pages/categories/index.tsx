import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import categories from '@/routes/categories';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CirclePlus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: categories.index().url,
    },
];

export default function CategoryPage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />

            <div className="px-4 py-6">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Categories"
                        description="Manage your income and expense categories"
                    />
                    <Button className="rounded-xl">
                        <CirclePlus className="h-4 w-4" />
                        Add Category
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
