import { prisma } from "@/lib/db";
import { computeCurrentValue, computeAssetPriceHistory } from "@/lib/valuation";
import { PortfolioSummary } from "@/components/PortfolioSummary";
import { AssetList } from "@/components/AssetList";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const assets = await prisma.asset.findMany({ orderBy: { createdAt: "desc" } });

  const items = assets.map((asset) => ({
    asset,
    currentValue: computeCurrentValue(asset),
    history: computeAssetPriceHistory(asset),
  }));

  const totalCurrentValue = items.reduce((sum, i) => sum + i.currentValue, 0);
  const totalPurchasePrice = assets.reduce((sum, a) => sum + a.purchasePrice, 0);

  return (
    <div className="space-y-8">
      <PortfolioSummary
        totalCurrentValue={totalCurrentValue}
        totalPurchasePrice={totalPurchasePrice}
        assetCount={assets.length}
      />
      <AssetList items={items} />
    </div>
  );
}
