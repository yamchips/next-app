import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import { prisma } from "@/prisma/client";

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const newId = parseInt(id);

  if (isNaN(newId)) {
    return NextResponse.json({ error: "Invalid endpoint" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: newId },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user);
}

export async function PUT(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const newId = parseInt(id);
  // validate request body
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  // if the user with given id doesn't exist
  if (isNaN(newId) || newId > 10) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  // fetch and update the user
  return NextResponse.json({ id: 1, name: body.name });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const newId = parseInt(id);
  if (isNaN(newId) || newId > 10) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  // delete the user, not implement here
  return NextResponse.json({});
}
