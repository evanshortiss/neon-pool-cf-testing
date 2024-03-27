import { db } from "@/lib/drizzle";
import { sql } from "drizzle-orm";
import { unstable_noStore } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  unstable_noStore()

    const posts = await db.execute(sql`SELECT * FROM NOW()`	);
    return NextResponse.json(posts);
  }