// src/config/db.ts
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

const testDbConnection = async (retries = 5, delay = 2000): Promise<void> => {
  while (retries > 0) {
    try {
      const res = await pool.query('SELECT NOW()');
      console.log('✅ PostgreSQL connection successful:', res.rows[0].now);
      return;
    } catch (err) {
      console.error(`❌ Connection error, retrying (${6 - retries}/5):`, err.message);
      retries--;
      if (retries === 0) {
        console.error('🔴 All attempts failed. Stopping the server.');
        process.exit(1);
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

export { pool, testDbConnection };
