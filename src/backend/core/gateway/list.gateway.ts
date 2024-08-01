import { List } from '../domain/list';

export interface ListGateway {
  create(list: List): Promise<List>;
  update(list: List): Promise<void>;
  delete(list: List): Promise<void>;
  get(userId: string, id: string): Promise<List | null>;
  list(userId: string): Promise<List[]>;
}