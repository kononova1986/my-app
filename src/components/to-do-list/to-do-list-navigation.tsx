"use client"
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui';
import { cn } from '@/lib/utils';
import { TodayList } from './today-list';
import { useTranslation } from 'react-i18next';

interface ToDoListNavigationProps {
  className?: string;
}

export const ToDoListNavigation: React.FC<ToDoListNavigationProps> = ({ className, }) => {
   const { t } = useTranslation();
  return (
    <div className={cn("flex justify-center", className)}>
      <Tabs defaultValue="yesterday" className="w-full ">
        <TabsList className="grid grid-cols-5 justify-center m-0 bg-neutral-200">
          <TabsTrigger value="yesterday">
            {t("toDoNavigation.yesterday")}
          </TabsTrigger>
          <TabsTrigger value="today">{t("toDoNavigation.today")}</TabsTrigger>
          <TabsTrigger value="tomorrow">
            {t("toDoNavigation.tomorrow")}
          </TabsTrigger>
          <TabsTrigger value="week">{t("toDoNavigation.week")}</TabsTrigger>
          <TabsTrigger value="month">{t("toDoNavigation.month")}</TabsTrigger>
        </TabsList>
        <div>
          <TabsContent value="yesterday">....</TabsContent>
          <TabsContent value="today">
            <TodayList />
          </TabsContent>
          <TabsContent value="tomorrow">.....</TabsContent>
          <TabsContent value="week">.....</TabsContent>
          <TabsContent value="month">.....</TabsContent>
        </div>
      </Tabs>
    </div>
  );
};