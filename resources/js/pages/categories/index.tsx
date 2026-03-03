import AppLayout from '@/layouts/app-layout';
import categories from '@/routes/categories';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: categories.index().url,
    },
];

export default function CategoryPage() {
    console.log(usePage().props);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
        </AppLayout>
    );
}
