import DeleteUser from '@/components/delete-user';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import profile from '@/routes/profile';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Account Deletion',
        href: profile.accountDeletion().url,
    },
];

export default function Account() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Account settings" />

            <h1 className="sr-only">Account Settings</h1>

            <SettingsLayout>
                <div className="space-y-6">
                    <Heading
                        variant="small"
                        title="Account settings"
                        description="Update your account's settings"
                    />
                    <DeleteUser />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
