import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const newId = parseInt(id);
  if (newId > 10) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ id: 1, name: "mosh" });
}

export async function PUT(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const newId = parseInt(id);
  // validate request body
  const body = await request.json();
  if (!body.name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  // if the user with given id doesn't exist
  if (newId > 10) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  // fetch and update the user
  return NextResponse.json({ id: 1, name: body.name });
}
