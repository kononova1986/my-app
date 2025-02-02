'use client'
import React, { useState } from 'react';
import { Calendar } from '../ui';
import { cn } from '@/lib/utils';
import { useRouter } from "next/navigation";

interface CalendarGeneralProps {
  className?: string;
  
}

export const CalendarGeneral: React.FC<CalendarGeneralProps> = ({ className, }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const router = useRouter();
  return (
    <div className={cn("w-[350px] flex justify-center", {className})}>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border "
        onDayClick={()=>{router.push('/to-do-list/today')}}
      />
    </div>
  );
};