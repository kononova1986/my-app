"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui";
import { cn } from "@/lib/utils";
import { nanoid } from "nanoid";
import { TaskToday, TaskPriority } from "../types";

interface AddTaskProps {
  className?: string;
  onSubmit: (formData: TaskToday) => void;
}
 
export const AddTask: React.FC<AddTaskProps> = ({ className, onSubmit, }) => {
  const [addTask, setAddTask] = useState<TaskToday>({
    priority: undefined, 
    title: "",
    description: "",
    id: "",
  });


  const handlePriorityChange = (value: TaskPriority) => {
    setAddTask((prev) => ({ ...prev, priority: value }));
  };

  const [isDisabled, setIsDisabled] = useState(true);
  
  useEffect(() => {
    if (addTask.title && addTask.description && addTask.priority) {
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
        title: "",
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
          <Label htmlFor="title" className="text-primary pl-1">
            Title
          </Label>
          <Input
            id="title"
            className="min-w-[180px] bg-white"
            value={addTask.title}
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-primary pl-1">
            Description
          </Label>
          <Input
            id="description"
            className="min-w-[180px] bg-white"
            value={addTask.description}
            onChange={handleChangeInput}
          />
        </div>

        <div>
          <Label htmlFor="task" className="text-primary pl-1">
            Task
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
                  {priorityValue}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isDisabled}
        className="text-base"
        onClick={() => {
          submitData();
        }}
      >
        Add Task
      </Button>
    </>
  );
};
