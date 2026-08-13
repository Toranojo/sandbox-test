import { AssetForm } from "@/components/AssetForm";

export default function NewAssetPage() {
  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-2xl font-medium text-ink">資産を登録</h1>
      <p className="mt-1 text-sm text-muted">購入した資産の情報を入力してください。</p>
      <div className="mt-8 rounded-2xl border border-hairline bg-white p-6">
        <AssetForm />
      </div>
    </div>
  );
}
