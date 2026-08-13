"use client";

import { useMemo, useState } from "react";
import type { Asset } from "@prisma/client";
import type { AssetCategory } from "@/lib/assetCategories";
import type { PricePoint } from "@/lib/pricing";
import { AssetCard } from "@/components/AssetCard";
import { LinkButton } from "@/components/ui/Button";

export interface AssetWithValuation {
  asset: Asset;
  currentValue: number;
  history: PricePoint[];
}

const FILTERS: { key: "ALL" | "METAL" | "ITEM"; label: string; categories: AssetCategory[] | null }[] = [
  { key: "ALL", label: "すべて", categories: null },
  { key: "METAL", label: "貴金属", categories: ["GOLD", "PLATINUM", "SILVER"] },
  { key: "ITEM", label: "ブランド品", categories: ["WATCH", "BAG", "JEWELRY", "OTHER"] },
];

export function AssetList({ items }: { items: AssetWithValuation[] }) {
  const [filter, setFilter] = useState<"ALL" | "METAL" | "ITEM">("ALL");

  const filtered = useMemo(() => {
    const active = FILTERS.find((f) => f.key === filter);
    if (!active?.categories) return items;
    return items.filter((item) => active.categories!.includes(item.asset.category as AssetCategory));
  }, [items, filter]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === f.key ? "bg-ink text-white" : "bg-white text-muted border border-hairline hover:border-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <LinkButton href="/assets/new">+ 資産を登録</LinkButton>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-hairline p-12 text-center text-muted">
          {items.length === 0
            ? "まだ資産が登録されていません。「+ 資産を登録」から追加しましょう。"
            : "このカテゴリの資産はまだありません。"}
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <AssetCard key={item.asset.id} asset={item.asset} currentValue={item.currentValue} history={item.history} />
          ))}
        </div>
      )}
    </div>
  );
}
