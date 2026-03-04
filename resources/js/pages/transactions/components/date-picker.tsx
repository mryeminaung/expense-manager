import { Calendar } from '@/components/ui/calendar';
import { Field, FieldLabel } from '@/components/ui/field';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from '@/components/ui/input-group';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';

function formatDate(date: Date | undefined) {
    if (!date) {
        return '';
    }

    return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
}

export function DatePicker({
    currentDate,
    currentType,
    setData,
}: {
    currentDate?: Date;
    currentType: 'expense' | 'income' | null;
    setData: (field: 'date', value: Date) => void;
}) {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(currentDate);
    const [month, setMonth] = React.useState<Date | undefined>(date);
    const [value, setValue] = React.useState(formatDate(date));

    return (
        <Field className="mx-auto w-48">
            <FieldLabel htmlFor="date-required">Date</FieldLabel>
            <InputGroup>
                <InputGroupInput
                    id="date-required"
                    value={value}
                    disabled
                    placeholder="June 01, 2025"
                    onKeyDown={(e) => {
                        if (e.key === 'ArrowDown') {
                            e.preventDefault();
                            setOpen(true);
                        }
                    }}
                />
                <InputGroupAddon align="inline-end">
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <InputGroupButton
                                id="date-picker"
                                variant="ghost"
                                size="icon-xs"
                                disabled={!currentType}
                                aria-label="Select date"
                            >
                                <CalendarIcon />
                                <span className="sr-only">Select date</span>
                            </InputGroupButton>
                        </PopoverTrigger>
                        <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="end"
                            alignOffset={-8}
                            sideOffset={10}
                        >
                            <Calendar
                                mode="single"
                                selected={date}
                                month={month}
                                onMonthChange={setMonth}
                                onSelect={(date) => {
                                    setDate(date);
                                    setValue(formatDate(date));
                                    if (date) {
                                        const baseTime =
                                            currentDate ?? new Date();
                                        const selectedDateTime = new Date(date);
                                        selectedDateTime.setHours(
                                            baseTime.getHours(),
                                            baseTime.getMinutes(),
                                            baseTime.getSeconds(),
                                            baseTime.getMilliseconds(),
                                        );

                                        setData('date', selectedDateTime);
                                    }
                                    setOpen(false);
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                </InputGroupAddon>
            </InputGroup>
        </Field>
    );
}
