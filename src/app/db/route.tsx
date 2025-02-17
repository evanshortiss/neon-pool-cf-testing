import { db, getDb } from "@/lib/drizzle";
import { sql } from "drizzle-orm";
import { unstable_noStore } from "next/cache";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  unstable_noStore()
  
  await using connection = getDb()
  const time1 = await connection.db.execute(sql`SELECT * FROM NOW()`);

  return NextResponse.json({ 
    time1, 
  });
}