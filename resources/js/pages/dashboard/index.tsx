import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import DashboardCard from './components/dashboard-card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="px-4 pt-6">
                <Heading
                    title="Dashboard"
                    description="Your financial overview at a glance."
                />
            </div>

            <div className="grid gap-4 px-4 md:grid-cols-3">
                <DashboardCard
                    title="Total Income"
                    value="4,250"
                    type="income"
                    description="This month"
                />
                <DashboardCard
                    title="Total Expense"
                    value="2,830"
                    type="expense"
                    description="This month"
                />
                <DashboardCard
                    title="Current Balance"
                    value="1420"
                    type="balance"
                    description="Available"
                />
            </div>
        </AppLayout>
    );
}
