import { Pool } from 'pg';

export class Database {
  private static instance: Database;
  private _pool: Pool;

  private constructor() {
    this._pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: 5432,
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  get pool(): Pool {
    return this._pool;
  }
}

export default Database;
