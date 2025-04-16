import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { key, value } = await req.json();
  const response = NextResponse.json({ message: "Cookie set successfully" });

  response.cookies.set(key, value, { path: "/", httpOnly: true });

  return response;
}

export async function DELETE(req: Request) {
  const { key } = await req.json();
  const response = NextResponse.json({ message: "Cookie deleted" });

  response.cookies.set(key, "", { path: "/", expires: new Date(0) });

  return response;
}
