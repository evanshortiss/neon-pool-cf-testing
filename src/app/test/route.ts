import { getDb } from "@/lib/drizzle";
import { sql } from "drizzle-orm";
import { unstable_noStore } from "next/cache";
import { NextResponse } from "next/server";

export const runtime=   "edge";

export async function GET() {
  unstable_noStore()
  const posts = await getDb().execute(sql`SELECT * FROM NOW()`	);
  return NextResponse.json(posts);
}