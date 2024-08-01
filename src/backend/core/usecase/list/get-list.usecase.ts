import { ListGateway } from "../../gateway/list.gateway";
import { List } from "../../domain/list";
import { ListTasksUsecase } from "../task/list-tasks.usecase";

export interface Input {
  id: string;
  userId: string;
}

export interface Output extends List { }


export class GetListUsecase {
  constructor(
    private listGateway: ListGateway,
    private listTasksUsecase: ListTasksUsecase
  ) { }

  async execute(input: Input): Promise<Output> {
    const list = await this.listGateway.get(input.userId, input.id);

    if (!list) {
      throw new Error("List not found");
    }

    const { tasks } = await this.listTasksUsecase.execute({
      listId: list.id,
      userId: list.userId,
    });

    console.debug("tasks", tasks);

    list.tasks = tasks;

    console.debug("list", list);

    return list;
  }
}