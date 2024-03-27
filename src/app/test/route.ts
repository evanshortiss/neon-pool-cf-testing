import { pool } from "@/lib/neon";
import { NextResponse } from "next/server";

export const runtime=   "edge";

export async function GET() {
    const posts = await pool.query('SELECT * FROM NOW()');
    return NextResponse.json(posts);
  }