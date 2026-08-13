"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function DeleteAssetButton({ assetId }: { assetId: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("この資産を削除しますか？この操作は取り消せません。")) return;
    setDeleting(true);
    const res = await fetch(`/api/assets/${assetId}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      setDeleting(false);
      alert("削除に失敗しました。");
    }
  }

  return (
    <Button variant="danger" onClick={handleDelete} disabled={deleting}>
      {deleting ? "削除中..." : "削除"}
    </Button>
  );
}
