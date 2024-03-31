import { db, getDb } from "@/lib/drizzle";
import { sql } from "drizzle-orm";
import { unstable_noStore } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  unstable_noStore()
  
  const time1 = await db.execute(sql`SELECT * FROM NOW()`);

  return NextResponse.json({ 
    time1, 
  });
}