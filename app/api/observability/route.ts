import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // Log on the server for analysis. In production you'd persist this to a DB or monitoring service.
    // eslint-disable-next-line no-console
    console.log("[observability]", JSON.stringify(data));
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[observability] error", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
