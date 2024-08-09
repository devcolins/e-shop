import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";

config({ path: '.env.local' }); 

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});


await client.connect();

export const db = drizzle(client, { schema });

console.log('Connected to database');