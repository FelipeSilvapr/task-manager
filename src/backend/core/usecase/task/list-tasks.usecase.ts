import { TaskGateway } from "../../gateway/task.gateway";
import { Task } from "../../domain/task";

export interface Input {
  listId: string;
  userId: string;
}

export interface Output {
  tasks: Task[];
}


export class ListTasksUsecase {
  constructor(private taskGateway: TaskGateway) {}

  async execute(input: Input): Promise<Output> {
    const tasks = await this.taskGateway.list(input.userId, input.listId);

    return {
      tasks,
    };
  }
}