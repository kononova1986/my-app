"use client";
import React, { useState } from "react";
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui";
import { Clock, Droplets, Settings, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { DurationStep } from "./duration-step";
import { Button } from "../ui";
import type { DurationArray } from "../types";

interface PeriodsSettingProps {
  className?: string;
}

export const PeriodsSetting: React.FC<PeriodsSettingProps> = ({
  className,
}) => {
  const [dataPeriod, setDataPeriod] = useState<DurationArray>([
    { value: 28, id: "menstruation" },
    { value: 4, id: "cycle" },
    { value: 14, id: "ovulation" },
  ]);

  const [showPeriod, setShowPeriod] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, value } = e.target;
    if (!isNaN(Number(value))) {
      setDataPeriod((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, value: Number(value) } : item
        )
      );
    }
  };
  const handleSaveData = () => {
    console.log(dataPeriod);
    setIsLoading(true);
    setTimeout(() => {
      setShowPeriod(true);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={cn("w-full m-0", className)}>
      {isLoading ? (
        <div className="flex flex-col space-y-4 mt-6">
          <Skeleton className="h-6 w-full rounded-sm" />
          <Skeleton className="h-6 w-full rounded-sm" />
          <Skeleton className="h-6 w-full rounded-sm" />
          <Skeleton className="h-6 w-full rounded-sm" />
        </div>
      ) : (
        <Table className="border border-neutral-300">
          <TableHeader className="bg-neutral-200">
            <TableRow>
              <TableHead className="text-sm">Menstruation</TableHead>
              <TableHead>
                {showPeriod && (
                  <div className="flex text-center justify-end">
                    <Settings size={16} color="#6b7280" />
                  </div>
                )}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {dataPeriod.map((data) => (
              <TableRow key={data.id}>
                <TableCell>
                  <div className={cn("flex items-center text-center gap-2")}>
                    {data.id === "menstruation" && (
                      <Droplets size={14} color="#f43f5e" />
                    )}
                    {data.id === "cycle" && <Clock size={14} color="#16a34a" />}
                    {data.id === "ovulation" && (
                      <Sparkles size={14} color="#16a34a" />
                    )}
                    {data.id === "menstruation" && "Menstruation Duration"}
                    {data.id === "cycle" && "Cycle Duration"}
                    {data.id === "ovulation" && "Ovulation"}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex text-center justify-end">
                    {showPeriod ? (
                      <>
                        {data.id === "menstruation" && `${data.value} days`}
                        {data.id === "cycle" && `${data.value} days`}
                        {data.id === "ovulation" && `on ${data.value} day`}
                      </>
                    ) : (
                      <DurationStep
                        defaultValue={data.value}
                        inputId={data.id}
                        handleInputChange={handleInputChange}
                      />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <div className="flex justify-end mt-4">
        {!showPeriod && (
          <Button className="w-full" onClick={handleSaveData}>
            Save
          </Button>
        )}
      </div>
    </div>
  );
};
