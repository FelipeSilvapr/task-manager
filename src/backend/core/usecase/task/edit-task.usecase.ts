import { TaskGateway } from "../../gateway/task.gateway";
import { TaskStatus } from "../../domain/task";

export interface Input {
  id: string;
  title?: string;  
  description?: string;
  status?: TaskStatus;
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


export class EditTaskUsecase {
  constructor(private taskGateway: TaskGateway) {}

  async execute(input: Input): Promise<Output> {
    const task = await this.taskGateway.get(input.userId, input.listId, input.id);

    if (!task) {
      throw new Error('Task not found');
    }

    if (input.title) {
      task.title = input.title;
    }

    if (input.description) {
      task.description = input.description;
    }

    if (input.status) {
      task.status = input.status;
    }

    await this.taskGateway.update(task);

    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      userId: task.userId,
      listId: task.listId,
    };
  }
}