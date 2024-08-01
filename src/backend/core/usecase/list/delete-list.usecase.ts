import { ListGateway } from "../../gateway/list.gateway";

export interface Input {
  id: string;
  userId: string;
}

export interface Output {
  id: string;
  userId: string;
}


export class DeleteListUsecase {
  constructor(private listGateway: ListGateway) { }

  async execute(input: Input): Promise<Output> {
    const list = await this.listGateway.get(input.userId, input.id);

    if (!list) {
      throw new Error("List not found");
    }

    await this.listGateway.delete(list);

    return {
      id: input.id,
      userId: input.userId,
    };
  }
}