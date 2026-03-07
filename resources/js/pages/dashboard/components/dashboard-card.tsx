import type { LucideIcon } from 'lucide-react';
import { TrendingDown, TrendingUp, Wallet } from 'lucide-react';

type DashboardCardProps = {
    title: string;
    value: string;
    type: 'income' | 'expense' | 'balance';
    description: string;
};

const styleByType = {
    income: {
        card: 'border-emerald-100 bg-emerald-50/40',
        titleText: 'text-emerald-600',
        valueText: 'text-emerald-600',
        iconBg: 'bg-emerald-100',
        iconText: 'text-emerald-600',
        icon: TrendingUp,
    },
    expense: {
        card: 'border-rose-100 bg-rose-50/40',
        titleText: 'text-rose-600',
        valueText: 'text-red-600',
        iconBg: 'bg-rose-100',
        iconText: 'text-red-600',
        icon: TrendingDown,
    },
    balance: {
        card: 'border-slate-200 bg-white',
        titleText: 'text-slate-700',
        valueText: 'text-slate-950',
        iconBg: 'bg-slate-200',
        iconText: 'text-slate-600',
        icon: Wallet,
    },
} as const satisfies Record<
    DashboardCardProps['type'],
    {
        card: string;
        titleText: string;
        valueText: string;
        iconBg: string;
        iconText: string;
        icon: LucideIcon;
    }
>;

export default function DashboardCard({
    title,
    value,
    type,
    description,
}: DashboardCardProps) {
    const styles = styleByType[type];
    const Icon = styles.icon;

    return (
        <div
            className={`w-full rounded-3xl border p-8 shadow-sm ${styles.card}`}
        >
            <div className="flex items-start justify-between">
                <div>
                    <p
                        className={`text-sm font-medium tracking-wide uppercase ${styles.titleText}`}
                    >
                        {title}
                    </p>
                    <h2
                        className={`mt-2 text-xl font-bold lg:text-2xl ${styles.valueText}`}
                    >
                        $ {value}
                    </h2>
                    <p className="mt-3 text-sm text-slate-600">{description}</p>
                </div>

                <div
                    className={`rounded-2xl p-2.5 md:hidden lg:inline-flex ${styles.iconBg}`}
                >
                    <Icon
                        className={`h-6 w-6 ${styles.iconText}`}
                        strokeWidth={2.5}
                    />
                </div>
            </div>
        </div>
    );
}
