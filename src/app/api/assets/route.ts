import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { validateAndBuildAssetData } from "@/lib/assetValidation";

export async function GET() {
  const assets = await prisma.asset.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(assets);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = validateAndBuildAssetData(body);
  if (result.error || !result.data) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  const asset = await prisma.asset.create({ data: result.data });
  return NextResponse.json(asset, { status: 201 });
}
