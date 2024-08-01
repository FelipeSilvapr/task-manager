"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const runMigrations = async (script) => {
    const client = new pg_1.Client({
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
    }
    catch (err) {
        console.error(`Error ${script} migrations:`, err);
    }
    finally {
        await client.end();
        console.log('Disconnected from the database.');
    }
};
const action = process.argv[2];
runMigrations(action).catch(err => console.error('Unexpected error:', err));
