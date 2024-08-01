import { Task } from '../domain/task';

export interface TaskGateway {
  create(task: Task): Promise<Task>;
  update(task: Task): Promise<void>;
  delete(task: Task): Promise<void>;
  get(userId: string, listId: string, id: string): Promise<Task | null>;
  list(userId: string, listId: string): Promise<Task[]>;
}