import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const newId = parseInt(id);
  if (isNaN(newId) || newId > 10) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json({ id: 1, name: "milk", price: 2.5 });
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
  if (isNaN(newId) || newId > 10) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json({ id: 1, name: body.name, price: body.price });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const newId = parseInt(id);
  if (isNaN(newId) || newId > 10) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json({});
}
