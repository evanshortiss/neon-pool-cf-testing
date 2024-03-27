import { db } from "@/lib/drizzle";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    const posts = await db.execute(sql`SELECT * FROM NOW()`	);
    return NextResponse.json(posts);
  }