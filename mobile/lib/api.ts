import type { Asset, AssetDetail, AssetFormPayload, AssetListItem } from "./types";

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export class ApiError extends Error {}

function requireBaseUrl(): string {
  if (!BASE_URL) {
    throw new ApiError(
      "APIの接続先が設定されていません。mobile/.env の EXPO_PUBLIC_API_BASE_URL を確認してください。"
    );
  }
  return BASE_URL.replace(/\/$/, "");
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const base = requireBaseUrl();
  let res: Response;
  try {
    res = await fetch(`${base}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    });
  } catch {
    throw new ApiError("サーバーに接続できませんでした。通信環境をご確認ください。");
  }

  let body: any = null;
  try {
    body = await res.json();
  } catch {
    // no body
  }

  if (!res.ok) {
    throw new ApiError(body?.error ?? "通信エラーが発生しました。もう一度お試しください。");
  }
  return body as T;
}

export function getAssets(): Promise<AssetListItem[]> {
  return request<AssetListItem[]>("/api/assets");
}

export function getAsset(id: string): Promise<AssetDetail> {
  return request<AssetDetail>(`/api/assets/${id}`);
}

export function createAsset(payload: AssetFormPayload): Promise<Asset> {
  return request<Asset>("/api/assets", { method: "POST", body: JSON.stringify(payload) });
}

export function updateAsset(id: string, payload: AssetFormPayload): Promise<Asset> {
  return request<Asset>(`/api/assets/${id}`, { method: "PATCH", body: JSON.stringify(payload) });
}

export function deleteAsset(id: string): Promise<{ ok: true }> {
  return request<{ ok: true }>(`/api/assets/${id}`, { method: "DELETE" });
}
