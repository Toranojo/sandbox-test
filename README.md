# 資産トラッカー (Asset Tracker)

金・プラチナ・ロレックスなどの資産性のあるモノを登録し、常に現在の相場評価額と含み損益を確認できる個人向け資産管理アプリ。ルールベースの簡易AIが、含み益率と価格トレンドから「売り時」の目安を日本語で提案する。

## 技術スタック

- **Next.js 14 (App Router, TypeScript)** — フロントエンドとAPIを単一コードベースで実装
- **Prisma ORM + PostgreSQL(Supabase)** — 資産データの永続化
- **Tailwind CSS** — 自前のUIプリミティブ(Card/Button/Badge等)で構成した独自デザイン

## ローカルセットアップ

1. [Supabase](https://supabase.com) で無料プロジェクトを作成し、`DATABASE_URL` / `DIRECT_URL` を取得する(詳細は下記「Supabaseプロジェクトの作成」参照)
2. `.env.example` を `.env` にコピーし、取得した接続文字列を貼り付ける
3. 以下を実行:

```bash
npm install
npm run db:push    # Supabase側にテーブルを作成 (prisma db push)
npm run db:seed    # デモ用データを3件投入(任意)
npm run dev         # http://localhost:3000
```

## デプロイ(Vercel + Supabase、無料枠)

### 1. Supabaseプロジェクトの作成

1. https://supabase.com でアカウント作成(GitHubログイン可)→ 「New Project」で無料プロジェクトを作成(リージョンは日本からのアクセスなら Northeast Asia (Tokyo) が近くて速い。DBパスワードはこの時決めて控えておく)
2. プロジェクト作成後、「Project Settings → Database → Connection string」で以下2つをコピーし、`[YOUR-PASSWORD]` 部分を実際のDBパスワードに置き換える:
   - **Transaction** モード(ポート6543) → `DATABASE_URL` として使う
   - **Session** / 直接接続(ポート5432) → `DIRECT_URL` として使う

### 2. Vercelへのデプロイ

1. https://vercel.com にログイン(GitHubアカウントでOK)→ 「Add New... → Project」→ このリポジトリをImport
2. Branch を `claude/asset-price-tracking-app-oqg0vz` に指定(Next.jsは自動検出されるのでビルド設定は変更不要)
3. 「Environment Variables」に `DATABASE_URL` と `DIRECT_URL` をSupabaseからコピーした値でそれぞれ追加
4. 「Deploy」を押す(ビルド時に `prisma db push` が自動実行され、Supabase側にテーブルが作成される)
5. デプロイ完了後に発行されるURL(`https://xxxx.vercel.app`)にアクセスして動作確認
6. (任意)デモデータを入れたい場合は、ローカルの `.env` に同じ `DATABASE_URL` / `DIRECT_URL` を設定して `npm run db:seed` を実行すると、本番のSupabaseに3件の初期データが投入される

## モックデータについて

現在の相場データ(金価格・時計/バッグの相場)は、外部APIを使わず `src/lib/pricing.ts` の決定論的な疑似ランダムウォークで生成しています。同じ日であれば何度リロードしても同じ値になりますが、日をまたぐと自然に値が推移します。実際の相場APIに接続する場合は、この1ファイル内の `getCurrentPrice` / `getPriceHistory` の実装を差し替えるだけで済むように設計されています。

同様に「売り時」提案(`src/lib/advice.ts`)もルールベースのロジックで、本物のLLM呼び出しに差し替える場合も `AdviceInput → AdviceResult` の型契約は変えずに内部実装だけ置き換えられます。

## iPhoneアプリ版

`mobile/` に Expo(React Native)版のクライアントがあります。DBやロジックは持たず、ここで説明したWeb版のAPIをそのまま利用します。セットアップと動作確認の手順は `mobile/README.md` を参照してください。

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
mobile/           # Expo(React Native)版iPhoneアプリ(Web版のAPIを利用するクライアント)
```
