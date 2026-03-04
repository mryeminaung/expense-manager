import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import categories from '@/routes/categories';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import CategoriesTable from './components/categories-table';
import NewCategory from './components/new-category';

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
                    <NewCategory />
                </div>
                <CategoriesTable />
            </div>
        </AppLayout>
    );
}
