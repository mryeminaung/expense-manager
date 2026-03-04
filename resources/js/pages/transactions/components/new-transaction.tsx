import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import transactions from '@/routes/transactions';
import { useForm, usePage } from '@inertiajs/react';
import { CirclePlus, DollarSign, Loader } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { CategorySelector } from './category-selector';
import { DatePicker } from './date-picker';

export default function NewTransaction() {
    const [currentType, setCurrentType] = useState<'expense' | 'income' | null>(
        null,
    );

    const { data, setData, post, errors, reset, processing } = useForm({
        amount: '',
        category_id: 0,
        date: new Date(),
        remark: '',
    });

    const { flash } = usePage<{ flash: { success?: string; error?: string } }>()
        .props;

    function handleFormData(e: any) {
        e.preventDefault();

        toast.success(flash.success || 'Transaction Saved!', {
            position: 'top-right',
            duration: 5000,
        });

        post(transactions.store().url, {
            preserveState: false,
            onSuccess: () => {
                reset();
                setCurrentType(null);
            },
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="rounded-xl">
                    <CirclePlus className="h-4 w-4" />
                    New Transaction
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleFormData}>
                    <DialogHeader className="mb-3">
                        <DialogTitle>New Transaction</DialogTitle>
                        <DialogDescription className="hidden">
                            Make changes to your profile here. Click save when
                            you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="amount">Amount</Label>
                            <div className="relative flex items-center justify-center">
                                <DollarSign className="absolute left-2 size-3 text-muted-foreground" />
                                <Input
                                    value={data.amount}
                                    onChange={(e) =>
                                        setData('amount', e.target.value)
                                    }
                                    step="0.01"
                                    id="amount"
                                    name="amount"
                                    min={1.0}
                                    type="number"
                                    className="pl-5"
                                    placeholder="0.00"
                                />
                            </div>
                            <InputError message={errors.amount} />
                        </Field>
                        <Field>
                            <Label htmlFor="type">Type</Label>
                            <div className="flex items-center justify-between gap-x-3">
                                <Button
                                    type="button"
                                    onClick={() => setCurrentType('income')}
                                    className={`flex-1 rounded-xl py-5 ${currentType === 'income' ? 'bg-primary text-primary-foreground' : ''}`}
                                    variant={
                                        currentType === 'income'
                                            ? 'default'
                                            : 'outline'
                                    }
                                >
                                    Income
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => setCurrentType('expense')}
                                    className={`flex-1 rounded-xl py-5 ${currentType === 'expense' ? 'bg-primary text-primary-foreground' : ''}`}
                                    variant={
                                        currentType === 'expense'
                                            ? 'default'
                                            : 'outline'
                                    }
                                >
                                    Expense
                                </Button>
                            </div>
                        </Field>
                        <Field>
                            <Label htmlFor="type">Category</Label>
                            <CategorySelector
                                value={data.category_id}
                                setData={setData}
                                currentType={currentType}
                            />
                            <InputError message={errors.category_id} />
                        </Field>
                        <Field>
                            <DatePicker
                                currentType={currentType}
                                currentDate={data.date}
                                setData={setData}
                            />
                            <InputError message={errors.date} />
                        </Field>
                        <Field>
                            <Label htmlFor="remark">
                                Remark{' '}
                                <span className="text-muted-foreground">
                                    (optional)
                                </span>
                            </Label>
                            <Textarea
                                value={data.remark}
                                onChange={(e) =>
                                    setData('remark', e.target.value)
                                }
                                id="remark"
                                disabled={!currentType}
                                rows={20}
                                className="resize-none"
                                name="remark"
                                placeholder="Type your remark here..."
                            />
                            <InputError message={errors.remark} />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        {/* <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose> */}
                        <Button
                            type="submit"
                            disabled={processing || !currentType}
                            className="mt-3 w-full rounded-xl py-5"
                        >
                            {processing ? (
                                <Loader className="h-4 w-4 animate-spin" />
                            ) : (
                                <CirclePlus className="h-4 w-4" />
                            )}
                            {processing ? 'Adding' : 'Add'}{' '}
                            {currentType === 'expense' ? 'Expense' : 'Income'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
