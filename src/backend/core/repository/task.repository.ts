import { TaskGateway } from '../gateway/task.gateway';
import { Task, TaskStatus } from '../domain/task';
import { Database } from '../../infrastructure/database/database';

const db = Database.getInstance();

export class TaskRepository implements TaskGateway {
  async create(task: Task): Promise<Task> {
    const query = `
      INSERT INTO tasks (id, title, description, status, list_id, user_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [task.id, task.title, task.description, task.status, task.listId, task.userId];
    const result = await db.pool.query(query, values);
    return this.mapDbResultToTask(result.rows[0]);
  }

  async update(task: Task): Promise<void> {
    const query = `
      UPDATE tasks
      SET title = $1, description = $2, status = $3
      WHERE id = $4 AND user_id = $5 AND list_id = $6;
    `;
    const values = [task.title, task.description, task.status, task.id, task.userId, task.listId];
    await db.pool.query(query, values);
  }

  async delete(task: Task): Promise<void> {
    const query = `
      DELETE FROM tasks
      WHERE id = $1 AND user_id = $2 AND list_id = $3;
    `;
    const values = [task.id, task.userId, task.listId];
    await db.pool.query(query, values);
  }

  async get(userId: string, listId: string, id: string): Promise<Task | null> {
    const query = `
      SELECT * FROM tasks
      WHERE id = $1 AND user_id = $2 AND list_id = $3;
    `;
    const values = [id, userId, listId];
    const result = await db.pool.query(query, values);
    return result.rows.length ? this.mapDbResultToTask(result.rows[0]) : null;
  }

  async list(userId: string, listId: string): Promise<Task[]> {
    const query = `
      SELECT * FROM tasks
      WHERE user_id = $1 AND list_id = $2;
    `;
    const values = [userId, listId];
    const result = await db.pool.query(query, values);
    return result.rows.map(row => this.mapDbResultToTask(row));
  }

  private mapDbResultToTask(row: any): Task {
    return new Task(row.id, row.title, row.description, row.status as TaskStatus, row.list_id, row.user_id);
  }
}
