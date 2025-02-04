"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Input,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui";
import {
  CheckCheck,
  CircleArrowDown,
  CircleArrowUp,
  Pencil,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { nanoid } from "nanoid";
import { AddTask } from "../common/add-task";
import { TaskToday, TaskPriority  } from "../types";


const tasks: TaskToday[] = [
  {
    id: nanoid(),
    priority: TaskPriority.High,
    title: "Chris",
    description: "HTML tables",
  },
];

const tasksWithIds = tasks.map((task) => ({
  ...task,
  id: nanoid(),
}));

console.log(tasksWithIds);

interface TodayListProps {
  className?: string;
}

type SortType = {
  column: string;
  order: "asc" | "desc";
};

export const TodayList: React.FC<TodayListProps> = () => {
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const [isTasks, setIsTasks] = useState<TaskToday[]>(tasksWithIds);
  const [update, setUpdate] = useState<
    | TaskToday
    | { priority: undefined; title: ""; description: ""; id: ""; isChecked: false }
    | undefined
  >(undefined);

  const [showCard, setShowCard] = useState(false);

  const [sortOrder, setSortOrder] = useState<SortType>({
    column: "",
    order: "desc",
  });

  const handleSorted = (sortName: keyof TaskToday) => {
    const order = sortOrder.order === "asc" ? 1 : -1;
    setIsTasks((prev) =>
      [...prev].sort((a, b) => {
         const aValue = a[sortName] ?? ""; 
         const bValue = b[sortName] ?? "";
        if (aValue > bValue) {
          return order;
        } else if (aValue < bValue) {
          return -order;
        }
        return 0;
      })
    );
    setSortOrder({
      column: sortName,
      order: sortOrder.order === "asc" ? "desc" : "asc",
    });
    setActiveColumn(sortName);
  };

  const onSubmit = (addTask: TaskToday): void => {
    setIsTasks((prev) => [...prev, addTask]); 
  };

  const handleDeleteTask = (id: string) => {
    setIsTasks((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateTask = (id: string) => {
    const updated = isTasks.find((item) => item.id === id);
    if (updated) {
      setUpdate((prev) => ({ ...prev, ...updated }));
    }
    setShowCard(true);
  };

  const handleUpdateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUpdate((prev) => {
      if (!prev) return { priority: undefined, title: "", description: "", id: "" }; 
      return { ...prev, [id]: value };
    });
  };

  const handleClickUpdateTask = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsTasks((prev) =>
      prev.map((task) =>
        task.id === update?.id ? { ...task, ...update } : task
      )
    );

    setShowCard(false);
  };

  const IconSort: React.FC<{
    columnName: string;
  }> = ({ columnName }) => {
    return (
      <>
        {sortOrder.order === "desc" ? (
          <CircleArrowDown
            className={cn(
              "opacity-60 p-1",
              activeColumn === columnName && "opacity-100"
            )}
          />
        ) : (
          <CircleArrowUp
            className={cn(
              "opacity-60 p-1",
              activeColumn === columnName && "opacity-100"
            )}
          />
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col justify-center">
      <AddTask onSubmit={onSubmit} />
      <Table className="min-w-[350px] max-w-full text-base mt-6 border border-neutral-300 ">
        <TableHeader className="bg-neutral-200">
          <TableRow>
            <TableHead
              onClick={() => {
                handleSorted("priority");
              }}
            >
              <div className="flex items-end cursor-pointer text-sm">
                Task
                <IconSort columnName={"priority"} />
              </div>
            </TableHead>
            <TableHead
              onClick={() => {
                handleSorted("title");
              }}
            >
              <div className="flex items-end cursor-pointer text-sm">
                Title
                <IconSort columnName={"title"} />
              </div>
            </TableHead>
            <TableHead
              onClick={() => {
                handleSorted("description");
              }}
            >
              <div className="flex items-end cursor-pointer text-sm">
                Description
                <IconSort columnName={"description"} />
              </div>
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white">
          {isTasks.map((task) => (
            <TableRow
              key={task.id}
              className={cn("italic text-sm", task.isChecked && "")}
            >
              <TableCell className="font-medium">{task.priority}</TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex flex-row gap-1">
                  {!task.isChecked && (
                    <>
                      <X
                        className="p-1 cursor-pointer opacity-50 hover:opacity-100"
                        onClick={() => {
                          handleDeleteTask(task.id);
                        }}
                      />
                      <Pencil
                        className="p-[5px] cursor-pointer opacity-50 hover:opacity-100"
                        onClick={() => {
                          handleUpdateTask(task.id);
                        }}
                      />
                    </>
                  )}
                  <CheckCheck
                    onClick={() => {
                      setIsTasks((prev) =>
                        prev.map((item) =>
                          item.id === task.id
                            ? { ...item, isChecked: true }
                            : item
                        )
                      );
                    }}
                    className={cn(
                      "p-1 cursor-pointer opacity-50 hover:opacity-100",
                      task.isChecked && "stroke-primary opacity-100 p-0"
                    )}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {showCard && (
        <div className="flex justify-center">
          <Card className="w-[350px] pt-6 mt-6">
            <CardContent>
              <form onSubmit={handleClickUpdateTask}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="priority">Task</Label>
                    <Input
                      id="priority"
                      value={update?.priority}
                      onChange={handleUpdateInput}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={update?.title}
                      onChange={handleUpdateInput}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={update?.description}
                      onChange={handleUpdateInput}
                    />
                  </div>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  <Button
                    variant="outline"
                    className="text-base"
                    onClick={() => setShowCard(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="text-base">
                    Update
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
