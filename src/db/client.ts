import { Pool } from 'pg';
import { config } from '../config';

export const pool = new Pool({ connectionString: config.databaseUrl });

export async function query(text: string, params?: unknown[]) {
  return pool.query(text, params);
}

export async function connectDb(): Promise<void> {
  const client = await pool.connect();
  client.release();
  console.log('PostgreSQL connected');
}
