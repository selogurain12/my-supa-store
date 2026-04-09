import { NextResponse } from "next/server";

export async function GET() {
  // Return a server-only environment variable to demonstrate the difference
  const siteName = process.env.SITE_NAME ?? null;
  return NextResponse.json({ siteName });
}
