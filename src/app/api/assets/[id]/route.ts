import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { validateAndBuildAssetData } from "@/lib/assetValidation";
import { computeCurrentValue, computeAssetPriceHistory } from "@/lib/valuation";
import { generateAdvice } from "@/lib/advice";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const asset = await prisma.asset.findUnique({ where: { id: params.id } });
  if (!asset) {
    return NextResponse.json({ error: "資産が見つかりません。" }, { status: 404 });
  }
  const currentValue = computeCurrentValue(asset);
  const history = computeAssetPriceHistory(asset);
  const advice = generateAdvice({
    purchasePrice: asset.purchasePrice,
    currentValue,
    purchaseDate: asset.purchaseDate,
    priceHistory: history,
  });
  return NextResponse.json({ ...asset, currentValue, history, advice });
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
