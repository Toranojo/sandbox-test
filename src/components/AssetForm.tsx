"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Asset } from "@prisma/client";
import { CATEGORY_LABELS, PURITY_OPTIONS, WEIGHT_CATEGORIES, type AssetCategory } from "@/lib/assetCategories";
import { formatDateInput } from "@/lib/format";
import { Button } from "@/components/ui/Button";

const CATEGORY_GROUPS: { label: string; categories: AssetCategory[] }[] = [
  { label: "貴金属", categories: ["GOLD", "PLATINUM", "SILVER"] },
  { label: "ブランド品", categories: ["WATCH", "BAG", "JEWELRY", "OTHER"] },
];

function isWeightCategory(category: AssetCategory) {
  return (WEIGHT_CATEGORIES as string[]).includes(category);
}

export function AssetForm({ asset }: { asset?: Asset }) {
  const router = useRouter();
  const isEdit = Boolean(asset);

  const [category, setCategory] = useState<AssetCategory>((asset?.category as AssetCategory) ?? "GOLD");
  const [name, setName] = useState(asset?.name ?? "");
  const [brand, setBrand] = useState(asset?.brand ?? "");
  const [model, setModel] = useState(asset?.model ?? "");
  const [weightGrams, setWeightGrams] = useState(asset?.weightGrams?.toString() ?? "");
  const [purity, setPurity] = useState(asset?.purity ?? "");
  const [quantity, setQuantity] = useState(asset?.quantity?.toString() ?? "1");
  const [purchasePrice, setPurchasePrice] = useState(asset?.purchasePrice?.toString() ?? "");
  const [purchaseDate, setPurchaseDate] = useState(
    asset ? formatDateInput(asset.purchaseDate) : formatDateInput(new Date())
  );
  const [notes, setNotes] = useState(asset?.notes ?? "");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const weightMode = isWeightCategory(category);
  const purityChoices = weightMode ? PURITY_OPTIONS[category as "GOLD" | "PLATINUM" | "SILVER"] : [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("資産名を入力してください。");
      return;
    }
    if (!purchasePrice || Number(purchasePrice) <= 0) {
      setError("購入価格を正しく入力してください。");
      return;
    }
    if (!purchaseDate) {
      setError("購入日を正しく入力してください。");
      return;
    }
    if (weightMode) {
      if (!weightGrams || Number(weightGrams) <= 0) {
        setError("重量(グラム)を正しく入力してください。");
        return;
      }
    } else if (!quantity || Number(quantity) <= 0) {
      setError("数量を正しく入力してください。");
      return;
    }

    setSubmitting(true);

    const payload: Record<string, unknown> = {
      category,
      name,
      purchasePrice: Number(purchasePrice),
      purchaseDate,
      notes: notes || null,
    };
    if (weightMode) {
      payload.weightGrams = Number(weightGrams);
      payload.purity = purity || null;
    } else {
      payload.brand = brand || null;
      payload.model = model || null;
      payload.quantity = Number(quantity) || 1;
    }

    try {
      const res = await fetch(isEdit ? `/api/assets/${asset!.id}` : "/api/assets", {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "登録に失敗しました。");
        setSubmitting(false);
        return;
      }
      router.push(`/assets/${data.id}`);
      router.refresh();
    } catch {
      setError("通信エラーが発生しました。もう一度お試しください。");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {error && (
        <div className="rounded-xl border border-loss/30 bg-loss/5 px-4 py-3 text-sm text-loss">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium text-ink">カテゴリ</label>
        <div className="mt-2 space-y-3">
          {CATEGORY_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="text-xs text-muted">{group.label}</p>
              <div className="mt-1 flex flex-wrap gap-2">
                {group.categories.map((c) => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                      category === c
                        ? "bg-ink text-white"
                        : "bg-white text-muted border border-hairline hover:border-ink"
                    }`}
                  >
                    {CATEGORY_LABELS[c]}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink">
          資産名
        </label>
        <input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="例: ロレックス サブマリーナ"
          className="mt-1 w-full rounded-xl border border-hairline px-4 py-2.5 text-sm outline-none focus:border-ink"
        />
      </div>

      {weightMode ? (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="weightGrams" className="block text-sm font-medium text-ink">
              重量 (g)
            </label>
            <input
              id="weightGrams"
              required
              type="number"
              step="0.01"
              min="0"
              value={weightGrams}
              onChange={(e) => setWeightGrams(e.target.value)}
              className="mt-1 w-full rounded-xl border border-hairline px-4 py-2.5 text-sm outline-none focus:border-ink"
            />
          </div>
          <div>
            <label htmlFor="purity" className="block text-sm font-medium text-ink">
              純度
            </label>
            <select
              id="purity"
              value={purity}
              onChange={(e) => setPurity(e.target.value)}
              className="mt-1 w-full rounded-xl border border-hairline px-4 py-2.5 text-sm outline-none focus:border-ink"
            >
              <option value="">選択してください</option>
              {purityChoices.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-ink">
              ブランド
            </label>
            <input
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="例: Rolex"
              className="mt-1 w-full rounded-xl border border-hairline px-4 py-2.5 text-sm outline-none focus:border-ink"
            />
          </div>
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-ink">
              モデル名
            </label>
            <input
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="例: Submariner 116610LN"
              className="mt-1 w-full rounded-xl border border-hairline px-4 py-2.5 text-sm outline-none focus:border-ink"
            />
          </div>
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-ink">
              数量
            </label>
            <input
              id="quantity"
              required
              type="number"
              min="1"
              step="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-1 w-full rounded-xl border border-hairline px-4 py-2.5 text-sm outline-none focus:border-ink"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="purchasePrice" className="block text-sm font-medium text-ink">
            購入価格 (円)
          </label>
          <input
            id="purchasePrice"
            required
            type="number"
            min="0"
            step="1"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            className="mt-1 w-full rounded-xl border border-hairline px-4 py-2.5 text-sm outline-none focus:border-ink"
          />
        </div>
        <div>
          <label htmlFor="purchaseDate" className="block text-sm font-medium text-ink">
            購入日
          </label>
          <input
            id="purchaseDate"
            required
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            className="mt-1 w-full rounded-xl border border-hairline px-4 py-2.5 text-sm outline-none focus:border-ink"
          />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-ink">
          メモ (任意)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-xl border border-hairline px-4 py-2.5 text-sm outline-none focus:border-ink"
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting ? "保存中..." : isEdit ? "変更を保存" : "資産を登録"}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          キャンセル
        </Button>
      </div>
    </form>
  );
}
