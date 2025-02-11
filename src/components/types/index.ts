export enum TaskPriority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

export type TaskPriorityType = TaskPriority | undefined;

export interface TaskToday {
  priority: TaskPriorityType;
  task?: string;
  description: string;
  id: string;
  isChecked?: boolean;
}

export interface Duration {
  value: number;
  id: string;
}

export type DurationArray = Duration[];
