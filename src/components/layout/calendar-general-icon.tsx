'use client'
import { CalendarDays } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { Button } from '../ui';
import { cn } from '@/lib/utils';
import { usePathname } from "next/navigation";

export const CalendarGeneralIcon: React.FC = () => {
  const router = useRouter();
  const pathName = usePathname();
   const [active, setActive] = useState(false);
  

   useEffect(() => {
     setActive(pathName === "/");
   }, [pathName]);

  return (
    <Button
      variant="link"
      className={cn(
        "flex items-center justify-center w-7 h-7 px-7 py-5 transition-all duration-300 ease-in-out",
        active && "outline outline-1 outline-white px-7 py-5 scale-110"
      )}
      onClick={() => {
        router.push("/");
      }}
      size="lg"
    >
      <CalendarDays className="stroke-white" />
    </Button>
  );
};