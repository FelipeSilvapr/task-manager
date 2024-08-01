import { ListGateway } from "../../gateway/list.gateway";
import { ListStatus } from "../../domain/list";

export interface Input {
  id: string;
  userId: string;
}

export interface Output {
  id: string;
  status: ListStatus;
  userId: string;
}


export class ArchiveListUsecase {
  constructor(private listGateway: ListGateway) {}

  async execute(input: Input): Promise<Output> {
    const list = await this.listGateway.get(input.userId, input.id);

    if (!list) {
      throw new Error("List not found");
    }

    list.archive(); 

    await this.listGateway.update(list);

    return {
      id: list.id,
      status: list.status,
      userId: list.userId,
    };
  }
}
