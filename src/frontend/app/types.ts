export type TaskStatus = 'TODO' | 'IN-PROGRESS' | 'DONE';

export type ListStatus = 'ACTIVE' | 'ARCHIVED';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  listId: number;
}

export interface List {
  id: string;
  title: string;
  status: ListStatus;
  tasks: Task[];
}
