import { ListGateway } from "../../gateway/list.gateway";
import { List } from "../../domain/list";

export interface Input {
  userId: string;
}

export interface Output {
  lists: List[];
}


export class ListListsUsecase {
  constructor(private listGateway: ListGateway) { }

  async execute(input: Input): Promise<Output> {
    const lists = await this.listGateway.list(input.userId);

    return {
      lists,
    };
  }
}
