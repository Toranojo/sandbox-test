import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { validateAndBuildAssetData } from "@/lib/assetValidation";
import { computeCurrentValue } from "@/lib/valuation";

export async function GET() {
  const assets = await prisma.asset.findMany({ orderBy: { createdAt: "desc" } });
  const withValuation = assets.map((asset) => ({
    ...asset,
    currentValue: computeCurrentValue(asset),
  }));
  return NextResponse.json(withValuation);
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
