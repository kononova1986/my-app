'use client'
import React, { ChangeEventHandler, useState } from 'react';
import { Input } from '../ui';
import { Button } from '../ui';
import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';
import type { Duration } from '../types';

interface DurationStepProps {
  className?: string;
  inputId: string;
  defaultValue: number;
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
}

export const DurationStep: React.FC<DurationStepProps> = ({
  className,
  inputId,
  defaultValue,
  handleInputChange,
}) => {
  const [duration, setDuration] = useState<Duration>({
    value: defaultValue,
    id: inputId,
  });

  const addValue = () => {
    const newValue = duration.value + 1;
    setDuration({ ...duration, value: newValue });
    handleInputChange({ target: { id: inputId, value: newValue.toString() } } as React.ChangeEvent<HTMLInputElement>);
  };

  const minusValue = () => {
    const newValue = duration.value <= 1 ? duration.value : duration.value - 1;
    setDuration({ ...duration, value: newValue });
    handleInputChange({ target: { id: inputId, value: newValue.toString() } } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleLocalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setDuration({ ...duration, value: isNaN(newValue) ? duration.value : newValue });
    handleInputChange(e);
  };

  return (
    <div className={cn('flex flex-row gap-1', className)}>
      <Button size={'sm'} className="w-8 h-8 [&_svg]:size-4" onClick={minusValue}>
        <Minus />
      </Button>
      <Input
        id={inputId}
        className="flex w-10 h-8 justify-center text-center px-2"
        value={duration.value}
        onChange={handleLocalInputChange}
      />
      <Button size={'sm'} className="w-8 h-8 [&_svg]:size-4" onClick={addValue}>
        <Plus className="py-0" />
      </Button>
    </div>
  )
}