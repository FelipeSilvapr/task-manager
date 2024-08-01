import { ListGateway } from "../../gateway/list.gateway";

export interface Input {
  id: string;
  title: string;
  userId: string;
}

export interface Output {
  id: string;
  title: string;
  userId: string;
}


export class EditListUsecase {
  constructor(private listGateway: ListGateway) {}

  async execute(input: Input): Promise<Output> {
    const list = await this.listGateway.get(input.userId, input.id);

    if (!list) {
      throw new Error("List not found");
    }

    list.title = input.title;

    await this.listGateway.update(list);

    return {
      id: list.id,
      title: list.title,
      userId: list.userId,
    };
  }
}

