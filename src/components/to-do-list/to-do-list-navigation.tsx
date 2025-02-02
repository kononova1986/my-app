import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui';
import { cn } from '@/lib/utils';
import { TodayList } from './today-list';

// const navList = [
//   {
//     title: "Yesterday",
//     url: "/yesterday",
//   },
//   {
//     title: "Today",
//     url: "/today",
//   },
//   {
//     title: "Tomorrow",
//     url: "/tomorrow",
//   },
//   {
//     title: "Week",
//     url: "/week",
//   },
//   {
//     title: "Month",
//     url: "/month",
//   },
//   {
//     title: "Year",
//     url: "/year",
//   },
// ];

interface ToDoListNavigationProps {
  className?: string;
  
}

export const ToDoListNavigation: React.FC<ToDoListNavigationProps> = ({ className,  }) => {
  return (
    <div className={cn("flex justify-center", className)}>
      <Tabs defaultValue="yesterday" className="w-full ">
        <TabsList className="grid grid-cols-5 justify-center m-0 bg-neutral-200">
          <TabsTrigger value="yesterday">Yesterday</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
        </TabsList>
        <div>
          <TabsContent value="yesterday">yesterday</TabsContent>
          <TabsContent value="today">
            <TodayList />
          </TabsContent>
          <TabsContent value="tomorrow">tomorrow</TabsContent>
          <TabsContent value="week">week</TabsContent>
          <TabsContent value="month">month</TabsContent>
        </div>
      </Tabs>
    </div>
  );
};