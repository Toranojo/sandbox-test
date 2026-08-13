# 資産トラッカー (Asset Tracker)

金・プラチナ・ロレックスなどの資産性のあるモノを登録し、常に現在の相場評価額と含み損益を確認できる個人向け資産管理アプリ。ルールベースの簡易AIが、含み益率と価格トレンドから「売り時」の目安を日本語で提案する。

## 技術スタック

- **Next.js 14 (App Router, TypeScript)** — フロントエンドとAPIを単一コードベースで実装
- **Prisma ORM + SQLite** — 資産データの永続化(`prisma/dev.db`)
- **Tailwind CSS** — 自前のUIプリミティブ(Card/Button/Badge等)で構成した独自デザイン

## セットアップ

```bash
npm install
npx prisma migrate dev --name init   # DBスキーマを作成
npx prisma db seed                    # デモ用データを3件投入(任意)
npm run dev                           # http://localhost:3000
```

## モックデータについて

現在の相場データ(金価格・時計/バッグの相場)は、外部APIを使わず `src/lib/pricing.ts` の決定論的な疑似ランダムウォークで生成しています。同じ日であれば何度リロードしても同じ値になりますが、日をまたぐと自然に値が推移します。実際の相場APIに接続する場合は、この1ファイル内の `getCurrentPrice` / `getPriceHistory` の実装を差し替えるだけで済むように設計されています。

同様に「売り時」提案(`src/lib/advice.ts`)もルールベースのロジックで、本物のLLM呼び出しに差し替える場合も `AdviceInput → AdviceResult` の型契約は変えずに内部実装だけ置き換えられます。

## 本番DBへの移行

`prisma/schema.prisma` の `datasource` ブロックで `provider = "sqlite"` を `"postgresql"` に変更し、`DATABASE_URL` をPostgresの接続文字列に差し替えるだけでスキーマはそのまま移行できます。

## ディレクトリ構成

```
src/
  app/            # ルーティング (ダッシュボード / 資産登録 / 詳細 / 編集 / API)
  components/     # UIコンポーネント
  components/ui/  # 共通UIプリミティブ
  lib/            # 相場エンジン・評価額計算・AI提案ロジック・DBクライアント
prisma/
  schema.prisma   # Assetモデル定義
  seed.ts         # デモデータ投入スクリプト
```
