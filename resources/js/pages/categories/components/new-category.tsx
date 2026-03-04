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
import categories from '@/routes/categories';
import { useForm, usePage } from '@inertiajs/react';
import { CirclePlus, Loader } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function NewCategory() {
    const [currentType, setCurrentType] = useState<'expense' | 'income' | null>(
        null,
    );

    const { data, setData, post, errors, reset, processing } = useForm({
        name: '',
        type: '',
    });

    const { flash } = usePage<{ flash: { success?: string; error?: string } }>()
        .props;

    function handleFormData(e: any) {
        e.preventDefault();

        toast.success(flash.success || 'Category Saved!', {
            position: 'top-right',
            duration: 5000,
        });

        post(categories.store().url, {
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
                    New Category
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleFormData}>
                    <DialogHeader className="mb-5">
                        <DialogTitle>Add New Category</DialogTitle>
                        <DialogDescription className="hidden">
                            Make changes to your profile here. Click save when
                            you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="name">Category Name</Label>
                            <Input
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                id="name"
                                name="name"
                                type="text"
                                placeholder="eg. Groceries, Salary, etc."
                            />
                            <InputError message={errors.name} />
                        </Field>
                        <Field>
                            <Label htmlFor="type">Type</Label>
                            <div className="flex items-center justify-between gap-x-3">
                                <Button
                                    type="button"
                                    onClick={() => {
                                        setCurrentType('income');
                                        setData('type', 'income');
                                    }}
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
                                    onClick={() => {
                                        setCurrentType('expense');
                                        setData('type', 'expense');
                                    }}
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
                            {processing ? 'Adding' : 'Add'} Category
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
