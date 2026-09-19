import { NextResponse } from "next/server";
import { subscribeNewsletter } from "@/lib/actions/newsletter";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    const res = await subscribeNewsletter(email);
    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to subscribe." },
      { status: 500 }
    );
  }
}
