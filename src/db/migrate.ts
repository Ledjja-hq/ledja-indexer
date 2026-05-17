import { query } from './client';
import { schema } from './schema';

export async function runMigrations(): Promise<void> {
  console.log('Running migrations...');
  await query(schema);
  console.log('Migrations complete');
}
