"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const task_1 = require("../domain/task");
const database_1 = require("../../infrastructure/database/database");
const db = database_1.Database.getInstance();
class TaskRepository {
    async create(task) {
        const query = `
      INSERT INTO tasks (id, title, description, status, list_id, user_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
        const values = [task.id, task.title, task.description, task.status, task.listId, task.userId];
        const result = await db.pool.query(query, values);
        return this.mapDbResultToTask(result.rows[0]);
    }
    async update(task) {
        const query = `
      UPDATE tasks
      SET title = $1, description = $2, status = $3
      WHERE id = $4 AND user_id = $5 AND list_id = $6;
    `;
        const values = [task.title, task.description, task.status, task.id, task.userId, task.listId];
        await db.pool.query(query, values);
    }
    async delete(task) {
        const query = `
      DELETE FROM tasks
      WHERE id = $1 AND user_id = $2 AND list_id = $3;
    `;
        const values = [task.id, task.userId, task.listId];
        await db.pool.query(query, values);
    }
    async get(userId, listId, id) {
        const query = `
      SELECT * FROM tasks
      WHERE id = $1 AND user_id = $2 AND list_id = $3;
    `;
        const values = [id, userId, listId];
        const result = await db.pool.query(query, values);
        return result.rows.length ? this.mapDbResultToTask(result.rows[0]) : null;
    }
    async list(userId, listId) {
        const query = `
      SELECT * FROM tasks
      WHERE user_id = $1 AND list_id = $2;
    `;
        const values = [userId, listId];
        const result = await db.pool.query(query, values);
        return result.rows.map(row => this.mapDbResultToTask(row));
    }
    mapDbResultToTask(row) {
        return new task_1.Task(row.id, row.title, row.description, row.status, row.list_id, row.user_id);
    }
}
exports.TaskRepository = TaskRepository;
