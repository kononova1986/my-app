export enum TaskPriority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
  Critical = "Critical",
  Urgent = "Urgent",
}

export type TaskPriorityType = TaskPriority | undefined;

export interface TaskToday {
  priority: TaskPriorityType;
  title?: string;
  description: string;
  id: string;
  isChecked?: boolean;
}

export interface Duration {
  value: number;
  id: string;
}

export type DurationArray = Duration[];
