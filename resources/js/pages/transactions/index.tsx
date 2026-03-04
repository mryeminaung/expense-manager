import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import transactions from '@/routes/transactions';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import NewTransaction from './components/new-transaction';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transactions',
        href: transactions.index().url,
    },
];

export default function TransactionPage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transactions" />

            <div className="px-4 py-6">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Transactions"
                        description="Manage and track all your financial transactions"
                    />
                    <NewTransaction />
                </div>
            </div>
        </AppLayout>
    );
}
