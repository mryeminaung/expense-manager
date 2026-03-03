import AppLayout from '@/layouts/app-layout';
import transactions from '@/routes/transactions';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transactions',
        href: transactions.index().url,
    },
];

export default function TransactionPage() {
    console.log(usePage().props);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transactions" />
        </AppLayout>
    );
}
