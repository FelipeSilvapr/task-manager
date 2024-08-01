import { ListGateway } from '../gateway/list.gateway';
import { List, ListStatus } from '../domain/list';
import { Database } from '../../infrastructure/database/database';

const db = Database.getInstance();

export class ListRepository implements ListGateway {
  async create(list: List): Promise<List> {
    console.log('Creating list with values:', list); // Add this line to log the list object
    const query = `
      INSERT INTO lists (id, title, status, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [list.id, list.title, list.status, list.userId];
    console.log('Query values:', values); // Add this line to log the query values
    const result = await db.pool.query(query, values);
    return this.mapDbResultToList(result.rows[0]);
  }

  async update(list: List): Promise<void> {
    const query = `
      UPDATE lists
      SET title = $1, status = $2
      WHERE id = $3 AND user_id = $4;
    `;
    const values = [list.title, list.status, list.id, list.userId];
    await db.pool.query(query, values);
  }

  async delete(list: List): Promise<void> {
    const query = `
      DELETE FROM lists
      WHERE id = $1 AND user_id = $2;
    `;
    const values = [list.id, list.userId];
    await db.pool.query(query, values);
  }

  async get(userId: string, id: string): Promise<List | null> {
    const query = `
      SELECT * FROM lists
      WHERE id = $1 AND user_id = $2;
    `;
    const values = [id, userId];
    const result = await db.pool.query(query, values);
    return result.rows.length ? this.mapDbResultToList(result.rows[0]) : null;
  }

  async list(userId: string): Promise<List[]> {
    const query = `
      SELECT * FROM lists
      WHERE user_id = $1;
    `;
    const values = [userId];
    const result = await db.pool.query(query, values);
    return result.rows.map(row => this.mapDbResultToList(row));
  }

  private mapDbResultToList(row: any): List {
    const list = new List(row.id, row.title, row.status as ListStatus, row.user_id);
    return list;
  }
}
