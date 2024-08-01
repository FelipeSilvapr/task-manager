"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListRepository = void 0;
const list_1 = require("../domain/list");
const database_1 = require("../../infrastructure/database/database");
const db = database_1.Database.getInstance();
class ListRepository {
    async create(list) {
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
    async update(list) {
        const query = `
      UPDATE lists
      SET title = $1, status = $2
      WHERE id = $3 AND user_id = $4;
    `;
        const values = [list.title, list.status, list.id, list.userId];
        await db.pool.query(query, values);
    }
    async delete(list) {
        const query = `
      DELETE FROM lists
      WHERE id = $1 AND user_id = $2;
    `;
        const values = [list.id, list.userId];
        await db.pool.query(query, values);
    }
    async get(userId, id) {
        const query = `
      SELECT * FROM lists
      WHERE id = $1 AND user_id = $2;
    `;
        const values = [id, userId];
        const result = await db.pool.query(query, values);
        return result.rows.length ? this.mapDbResultToList(result.rows[0]) : null;
    }
    async list(userId) {
        const query = `
      SELECT * FROM lists
      WHERE user_id = $1;
    `;
        const values = [userId];
        const result = await db.pool.query(query, values);
        return result.rows.map(row => this.mapDbResultToList(row));
    }
    mapDbResultToList(row) {
        const list = new list_1.List(row.id, row.title, row.status, row.user_id);
        return list;
    }
}
exports.ListRepository = ListRepository;
