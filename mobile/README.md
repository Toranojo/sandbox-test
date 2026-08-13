# 資産トラッカー (iPhoneアプリ / Expo)

Web版(`../`)と同じ資産トラッカーを、Expo(React Native)でiPhone上で試せるようにしたアプリです。データの保存や相場・AI提案の計算はすべてWeb版のバックエンドAPI(`/api/assets`)を利用します。DBやビジネスロジックはこのアプリの中に重複実装していません。

## 前提条件

- Web版が Vercel + Supabase にデプロイ済みで、`https://xxxx.vercel.app` のようなURLが発行されていること(手順は `../README.md` 参照)
- iPhoneに **Expo Go** アプリをApp Storeからインストール済みであること

## セットアップ

```bash
cd mobile
npm install
cp .env.example .env
# .env の EXPO_PUBLIC_API_BASE_URL を、デプロイ済みのWeb版のURLに書き換える
npx expo start --tunnel
```

ターミナルにQRコードが表示されるので、iPhoneのカメラアプリ(またはExpo Goアプリ内のスキャナ)で読み取ると、Expo Go上でアプリが起動します。

`--tunnel` はiPhoneとこの開発マシンが同じWi-Fiにいなくても接続できるモードです。同じネットワーク内であれば `npx expo start` だけでも構いません。

## できること

- ダッシュボード: 保有資産の評価額合計、カテゴリ別フィルタ、資産一覧
- 資産の登録・編集・削除
- 資産詳細: 評価額の推移(スパークライン)、AIによる売り時提案

## 今後(スコープ外)

- App Storeへの正式配信には、Apple Developerアカウント(年間$99)と `eas build` によるビルドが別途必要です
- アプリアイコン/スプラッシュ画像は未設定です(Expo Go経由の確認ではExpo Go自体のアイコンが使われるため、独自ビルド時に設定します)
