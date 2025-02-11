"use client";
import React, { JSX, useState } from "react";
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
import { TaskToday, TaskPriority } from "../types";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";
import { useTranslation } from "react-i18next";

const tasks: TaskToday[] = [
  {
    id: nanoid(),
    priority: TaskPriority.High,
    task: "Chris",
    description: "HTML tables",
  },
];

const priorityIcons: Record<string, JSX.Element> = {
  Low: <FcLowPriority className="mr-2" size={16} />,
  Medium: <FcMediumPriority className="mr-2" size={16} />,
  High: <FcHighPriority className="mr-2" size={16} />,
};

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
    | {
        priority: undefined;
        task: "";
        description: "";
        id: "";
        isChecked: false;
      }
    | undefined
  >(undefined);

  const [showCard, setShowCard] = useState(false);

  const [sortOrder, setSortOrder] = useState<SortType>({
    column: "",
    order: "desc",
  });

  const { t } = useTranslation();

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
      if (!prev)
        return { priority: undefined, task: "", description: "", id: "" };
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
      <Table className="min-w-[350px] max-w-full text-base mt-6 border">
        <TableHeader>
          <TableRow>
            <TableHead

              onClick={() => {
                handleSorted("priority");
              }}
            >
              <div className="flex items-end cursor-pointer text-sm">
                Priority
                <IconSort columnName={"priority"} />
              </div>
            </TableHead>
            <TableHead
              onClick={() => {
                handleSorted("task");
              }}
            >
              <div className="flex items-end cursor-pointer text-sm">
                Task
                <IconSort columnName={"task"} />
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
              <TableCell className="font-medium">
                <div className="flex flex-row">
                  {priorityIcons[task.priority as keyof typeof priorityIcons]}
                  {task.priority}
                </div>
              </TableCell>
              <TableCell>{task.task}</TableCell>
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
          <Card className="w-min-[350px] w-max-[650px] pt-6 mt-6">
            <CardContent>
              <form onSubmit={handleClickUpdateTask}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="priority">{t("addTask.priority")}</Label>
                    <Input
                      id="priority"
                      value={update?.priority}
                      onChange={handleUpdateInput}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="task">{t("addTask.task")}</Label>
                    <Input
                      id="task"
                      value={update?.task}
                      onChange={handleUpdateInput}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="description">
                      {t("addTask.description")}
                    </Label>
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
                    className="w-full px-1 text-base"
                    onClick={() => setShowCard(false)}
                  >
                    {t("button.cancel")}
                  </Button>
                  <Button type="submit" className="w-full text-base">
                    {t("button.update")}
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
