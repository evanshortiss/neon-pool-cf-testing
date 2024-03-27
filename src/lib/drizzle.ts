import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';

// neonConfig.webSocketConstructor = ws;

if (!process.env.VERCEL_ENV) {
    // Set the WebSocket proxy to work with the local instance
    neonConfig.wsProxy = (host) => `${host}:5433/v1`;
    // Disable all authentication and encryption
    neonConfig.useSecureWebSocket = false;
    neonConfig.pipelineTLS = false;
    neonConfig.pipelineConnect = false;
  }
  
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool)
