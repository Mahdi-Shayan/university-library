import config from "@/lib/config";
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const sql = neon(config.env.databaseUrl);

const globalForDb = globalThis as unknown as {
  db: ReturnType<typeof drizzle> | undefined;
};

export const db = globalForDb.db ?? drizzle(sql);

if (!globalForDb.db) globalForDb.db = db;
