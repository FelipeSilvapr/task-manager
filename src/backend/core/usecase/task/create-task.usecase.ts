import { v4 as uuid } from "uuid";

import { TaskGateway } from "../../gateway/task.gateway";
import { Task, TaskStatus } from "../../domain/task";

export interface Input {
  title: string;
  description: string;
  userId: string;
  listId: string;
}

export interface Output {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  userId: string;
  listId: string;
}


export class CreateTaskUsecase {
  constructor(private taskGateway: TaskGateway) {}

  async execute(input: Input): Promise<Output> {
    const task = new Task(uuid(), input.title, input.description, "TODO", input.listId, input.userId);

    const createdTask = await this.taskGateway.create(task);

    return {
      id: createdTask.id,
      title: createdTask.title,
      description: createdTask.description,
      status: createdTask.status,
      userId: createdTask.userId,
      listId: createdTask.listId,
    };
  }
}

