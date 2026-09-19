import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // UploadThing router endpoint scaffold
  return NextResponse.json({
    message: "UploadThing endpoint ready for client direct uploads.",
  });
}

export async function GET() {
  return NextResponse.json({ status: "ok" });
}
