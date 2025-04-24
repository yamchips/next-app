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
  // check the validity of endpoint
  if (isNaN(newId)) {
    return NextResponse.json({ error: "Invalid endpoint" }, { status: 400 });
  }
  // fetch and update the user
  const user = await prisma.user.findUnique({
    where: { id: newId },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: body.name,
      email: body.email,
    },
  });
  return NextResponse.json(updatedUser);
}

export async function DELETE(request: NextRequest, { params }: Props) {
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
  const deletedUser = await prisma.user.delete({
    where: { id: user.id },
  });
  return NextResponse.json(deletedUser);
}
