import { v4 as uuid } from 'uuid';

import { ListGateway } from "../../gateway/list.gateway";
import { List, ListStatus } from "../../domain/list";

export interface Input {
  title: string;
  userId: string;
}

export interface Output {
  id: string;
  title: string;
  status: ListStatus;
  userId: string;
}

export class CreateListUsecase {
  constructor(private listGateway: ListGateway) {}

  async execute(input: Input): Promise<Output> {
    const list = new List(uuid(), input.title, "ACTIVE", input.userId);

    const createdList = await this.listGateway.create(list);

    return {
      id: createdList.id,
      title: createdList.title,
      status: createdList.status,
      userId: createdList.userId,
    };
  }
}
