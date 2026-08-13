import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AssetForm } from "@/components/AssetForm";

export default async function EditAssetPage({ params }: { params: { id: string } }) {
  const asset = await prisma.asset.findUnique({ where: { id: params.id } });
  if (!asset) notFound();

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-2xl font-medium text-ink">資産を編集</h1>
      <div className="mt-8 rounded-2xl border border-hairline bg-white p-6">
        <AssetForm asset={asset} />
      </div>
    </div>
  );
}
