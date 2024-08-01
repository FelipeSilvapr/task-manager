import { TaskGateway } from '../../gateway/task.gateway';

export interface Input {
  id: string;
  userId: string;
  listId: string;
}


export interface Output {
  id: string;
  userId: string;
  listId: string;
}


export class DeleteTaskUsecase {
  constructor(private taskGateway: TaskGateway) {}

  async execute(input: Input): Promise<Output> {
    const task = await this.taskGateway.get(input.userId, input.listId, input.id);

    if (!task) {
      throw new Error('Task not found');
    }

    await this.taskGateway.delete(task);

    return {
      id: task.id,
      userId: task.userId,
      listId: task.listId,
    };
  }
}