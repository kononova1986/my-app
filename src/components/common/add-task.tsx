"use client";
import React, { JSX, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui";
import { cn } from "@/lib/utils";
import { nanoid } from "nanoid";
import { TaskToday, TaskPriority } from "../types";
import { useTranslation } from "react-i18next";
import { FcHighPriority, FcLowPriority, FcMediumPriority } from "react-icons/fc";

interface AddTaskProps {
  className?: string;
  onSubmit: (formData: TaskToday) => void;
}
 
export const AddTask: React.FC<AddTaskProps> = ({ className, onSubmit, }) => {
  const [addTask, setAddTask] = useState<TaskToday>({
    priority: undefined, 
    task: "",
    description: "",
    id: "",
  });

  const { t } = useTranslation();

 const priorityIcons: Record<string, JSX.Element> = {
    Low: <FcLowPriority className="mr-2" size={16} />,
    Medium: <FcMediumPriority className="mr-2" size={16} />,
    High: <FcHighPriority className="mr-2" size={16} />,
  };

  const handlePriorityChange = (value: TaskPriority) => {
    setAddTask((prev) => ({ ...prev, priority: value }));
  };

  const [isDisabled, setIsDisabled] = useState(true);
  
  useEffect(() => {
    if (addTask.task && addTask.description && addTask.priority) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [addTask]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAddTask((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const submitData = () => {
    onSubmit({ ...addTask, id: nanoid() });
      setAddTask({
        priority: undefined, 
        task: "",
        description: "",
        id: "",
      });
  };

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6",
          { className }
        )}
      >
        <div>
          <Label htmlFor="task" className="text-primary pl-1 text-xs">
            {t("addTask.task")}
          </Label>
          <Input
            id="task"
            className="min-w-[180px] bg-white"
            value={addTask.task}
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-primary pl-1 text-xs">
            {t("addTask.description")}
          </Label>
          <Input
            id="description"
            className="min-w-[180px] bg-white"
            value={addTask.description}
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <Label htmlFor="priority" className="text-primary pl-1 text-xs">
            {t("addTask.priority")}
          </Label>
          <Select
            value={addTask.priority ?? ""}
            onValueChange={handlePriorityChange}
          >
            <SelectTrigger className="min-w-[180px] bg-white">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(TaskPriority).map((priorityValue) => (
                <SelectItem key={priorityValue} value={priorityValue}>
                  <span>{priorityIcons[priorityValue]}</span>
                  <span>{priorityValue}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        disabled={isDisabled}
        onClick={() => {
          submitData();
        }}
      >
        {t("button.addTask")}
      </Button>
    </>
  );
};
