import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import categories from '@/routes/categories';
import profile from '@/routes/profile';
import transactions from '@/routes/transactions';
import type { NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    CircleDollarSign,
    FolderOpen,
    LayoutDashboard,
    Settings,
    ShieldQuestion,
} from 'lucide-react';
import AppLogo from './app-logo';
import { NavUser } from './nav-user';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutDashboard,
    },
    {
        title: 'Transactions',
        href: transactions.index(),
        icon: CircleDollarSign,
    },
    {
        title: 'Categories',
        href: categories.index(),
        icon: FolderOpen,
    },
    {
        title: 'Settings',
        href: profile.edit(),
        icon: Settings,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Help',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: ShieldQuestion,
    },
];

export function AppSidebar() {
    const { isMobile } = useSidebar();

    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                {isMobile && <NavUser />}
            </SidebarFooter>
        </Sidebar>
    );
}
