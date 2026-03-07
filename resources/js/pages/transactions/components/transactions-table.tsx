import { Button } from '@/components/ui/button';
import transactions from '@/routes/transactions';
import { useForm, usePage } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';

type Transaction = {
    id: number;
    amount: string | number;
    remark: string | null;
    date: string;
    category: {
        id: number;
        name: string;
        type: 'income' | 'expense';
    };
};

type TransactionsProp = Transaction[] | { data: Transaction[] };

function formatAmount(amount: string | number, type: 'income' | 'expense') {
    const numericAmount = Number(amount);
    const prefix = type === 'income' ? '+' : '-';

    return `${prefix}$${numericAmount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
    });
}

export default function TransactionsTable() {
    const { transactions: transactionsProp } = usePage<{
        transactions: TransactionsProp;
    }>().props;

    const rows = Array.isArray(transactionsProp)
        ? transactionsProp
        : (transactionsProp?.data ?? []);

    const { delete: destroy, processing } = useForm();

    const handleDelete = (id: number) => {
        destroy(transactions.destroy({ transaction: id }).url, {
            preserveScroll: true,
        });
    };

    return (
        <div className="rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-7">
                <h2 className="text-xl font-semibold text-slate-950">
                    All Transactions
                </h2>
                <span className="rounded-2xl bg-slate-100 px-3 py-1 text-xs text-slate-700">
                    {rows.length} transactions
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-240 border-separate border-spacing-0">
                    <thead>
                        <tr className="bg-slate-100/70 text-left">
                            <th className="px-6 py-4 text-xs font-semibold tracking-wide text-slate-600 uppercase">
                                Date
                            </th>
                            <th className="px-6 py-4 text-xs font-semibold tracking-wide text-slate-600 uppercase">
                                Type
                            </th>
                            <th className="px-6 py-4 text-xs font-semibold tracking-wide text-slate-600 uppercase">
                                Category
                            </th>
                            <th className="px-6 py-4 text-xs font-semibold tracking-wide text-slate-600 uppercase">
                                Amount
                            </th>
                            <th className="px-6 py-4 text-xs font-semibold tracking-wide text-slate-600 uppercase">
                                Note
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold tracking-wide text-slate-600 uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((transaction) => {
                            const isIncome =
                                transaction.category.type === 'income';

                            return (
                                <tr
                                    key={transaction.id}
                                    className="group border-b border-slate-200 last:border-b-0"
                                >
                                    <td className="px-6 py-5 text-base text-slate-700">
                                        {formatDate(transaction.date)}
                                    </td>
                                    <td className="px-6 py-5">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                isIncome
                                                    ? 'bg-emerald-100 text-emerald-700'
                                                    : 'bg-rose-100 text-rose-700'
                                            }`}
                                        >
                                            {isIncome ? 'Income' : 'Expense'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-base font-medium text-slate-950">
                                        {transaction.category.name}
                                    </td>
                                    <td
                                        className={`px-6 py-5 text-base font-bold ${
                                            isIncome
                                                ? 'text-emerald-600'
                                                : 'text-red-600'
                                        }`}
                                    >
                                        {formatAmount(
                                            transaction.amount,
                                            transaction.category.type,
                                        )}
                                    </td>
                                    <td className="px-6 py-5">
                                        {transaction.remark ? (
                                            <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-xs text-slate-700">
                                                {transaction.remark}
                                            </span>
                                        ) : (
                                            <span className="text-base text-slate-400">
                                                -
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                handleDelete(transaction.id)
                                            }
                                            disabled={processing}
                                            className="text-slate-500 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-600 focus-visible:opacity-100"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
