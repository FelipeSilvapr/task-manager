import { Client } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

const runMigrations = async (script: string) => {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
  });

  try {
    await client.connect();
    console.log('Connected to the database.');

    let migrationFilePath;

    migrationFilePath = path.join(__dirname, `./migrations/${script}.sql`);

    const migrationSQL = fs.readFileSync(migrationFilePath, 'utf8');
    await client.query(migrationSQL);
    console.log(`Migrations have been ${script} successfully.`);
  } catch (err) {
    console.error(`Error ${script} migrations:`, err);
  } finally {
    await client.end();
    console.log('Disconnected from the database.');
  }
};

const action = process.argv[2]; 

runMigrations(action).catch(err => console.error('Unexpected error:', err));
