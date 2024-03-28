import { getDb } from "@/lib/drizzle";
import { sql } from "drizzle-orm";
import { unstable_noStore } from "next/cache";
import { NextResponse } from "next/server";

export const runtime=   "edge";

const getTime = async () => {
  const start = Date.now();
  await getDb().execute(sql`SELECT * FROM users;`);
  const end = Date.now();
  return end - start;
}

export async function GET() {
  unstable_noStore()
  
  const time1 = await getTime();
  const time2 = await getTime();
  const time3 = await getTime();

  return NextResponse.json({ 
    time1, 
    time2, 
    time3
  });
}