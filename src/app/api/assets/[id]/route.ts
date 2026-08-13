import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { validateAndBuildAssetData } from "@/lib/assetValidation";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const asset = await prisma.asset.findUnique({ where: { id: params.id } });
  if (!asset) {
    return NextResponse.json({ error: "資産が見つかりません。" }, { status: 404 });
  }
  return NextResponse.json(asset);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const existing = await prisma.asset.findUnique({ where: { id: params.id } });
  if (!existing) {
    return NextResponse.json({ error: "資産が見つかりません。" }, { status: 404 });
  }
  const body = await req.json();
  const result = validateAndBuildAssetData(body);
  if (result.error || !result.data) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  const asset = await prisma.asset.update({ where: { id: params.id }, data: result.data });
  return NextResponse.json(asset);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const existing = await prisma.asset.findUnique({ where: { id: params.id } });
  if (!existing) {
    return NextResponse.json({ error: "資産が見つかりません。" }, { status: 404 });
  }
  await prisma.asset.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
