import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

if (!process.env.VERCEL_ENV) {
  neonConfig.wsProxy = (host) => `${host}:5433/v1`;
  neonConfig.useSecureWebSocket = false;
  neonConfig.pipelineTLS = false;
  neonConfig.pipelineConnect = false;
}
  
// export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// export const db = drizzle(pool)

export const getDb = () => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  return {
    db: drizzle(pool),
    [Symbol.asyncDispose]: async () => {
      console.log('disposing pool')
      return await pool.end()
    }
  }
}

export const { db } = getDb();