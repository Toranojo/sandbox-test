# 投稿シーン実行例：2026-07-31「自己紹介（初投稿）」（無料post）

`04-daily-prompt-workflow.md` のフローを実際に回した例。`05-content-calendar.md` に沿って、初投稿として自己紹介回を実施する。

## STEP① シーン決定シート

| 項目 | 内容 |
| --- | --- |
| テーマ | 自己紹介（初投稿） |
| 場所 | 自宅の窓際 |
| 時間帯 | 朝〜昼の柔らかい光の時間帯 |
| 気分・行動 | 初めましての挨拶、自己紹介 |
| 服装カテゴリ | 日常（モノトーン私服・シグネチャールック） |
| 公開区分 | 無料post |

## STEP② 必要枚数

無料post 1本想定 → **4枚**生成（採用目標3枚）。

## STEP③ GPTに貼る完成プロンプト（4本）

`characters/001-rio.md` の固定要素（26歳、黒髪ロング・センターパート、伏し目がちな目元、唇の下やや右寄りのほくろ、ツヤ・グラス肌、スレンダーグラマー体型、シルバーアクセサリー、モノトーン私服）を全プロンプト共通とし、構図・撮影距離のみ変化させている。初投稿のため、水着等の有料要素は一切なし。

---

**① 窓際・顔がわかるアップ**
- 行動・表情：窓際で自然に微笑みながらこちらを見る
- 光・時間帯：朝の柔らかい自然光
- 撮られ方：顔がわかるアップ、縦向き、natural snapshot photography

```
A 26-year-old adult Japanese woman, soft oval face with downturned almond eyes, straight nose, glossy nude-pink full lips, one small natural beauty mark just below her lower lip slightly off-center, long black hair with a center part and a few loose face-framing strands, dewy glass-skin complexion, wearing a thin silver chain necklace and small silver hoop earrings, sitting by a window at home, soft morning natural light, wearing a simple monotone outfit (a plain white or black top), smiling naturally at the camera, close-up portrait shot, natural candid snapshot photography, no nudity, no sexual content, vertical portrait orientation, 3:4 aspect ratio
```

**② 自然な上半身・部屋の背景**
- 行動・表情：マグカップを持ち、リラックスした自然な表情
- 光・時間帯：朝〜昼の柔らかい光
- 撮られ方：上半身、縦向き、lifestyle editorial photography

```
A 26-year-old adult Japanese woman, soft oval face with downturned almond eyes, glossy nude-pink lips, one small natural beauty mark just below her lower lip slightly off-center, long black hair with a center part, dewy glass-skin complexion, wearing a thin silver chain necklace and small silver hoop earrings, slender yet glamorous figure, sitting at home holding a mug of coffee, a softly lit minimal living room in the background, wearing a simple monotone outfit in neutral tones, relaxed natural expression, upper-body shot, soft daytime natural light, lifestyle editorial photography, no nudity, no sexual content, vertical portrait orientation, 3:4 aspect ratio
```

**③ 全身コーデ**
- 行動・表情：部屋の中で自然に立ち、コーデを見せる
- 光・時間帯：昼の柔らかい自然光
- 撮られ方：全身、縦向き、catalog lifestyle photography

```
A 26-year-old adult Japanese woman, long black hair with a center part, dewy glass-skin complexion, wearing a thin silver chain necklace and small silver hoop earrings, slender yet glamorous figure, standing naturally in a minimal, softly lit living room at home, wearing a simple monotone outfit (neutral-colored top and bottoms) in her signature clean, minimal style, full-body shot, natural relaxed pose, soft daytime natural light, catalog lifestyle photography, no nudity, no sexual content, vertical portrait orientation, 3:4 aspect ratio
```

**④ 横顔・自然なスナップ**
- 行動・表情：窓の外を眺める横顔、カメラ目線でない
- 光・時間帯：昼の柔らかい光
- 撮られ方：ウエストアップの横顔、縦向き、natural snapshot風

```
A 26-year-old adult Japanese woman, soft oval face with downturned almond eyes, glossy nude-pink lips, one small natural beauty mark just below her lower lip slightly off-center, long black hair with a center part, dewy glass-skin complexion, wearing a thin silver chain necklace and small silver hoop earrings, looking out of a window in profile, not looking at the camera, calm natural expression, waist-up side profile shot, soft daytime natural light, natural candid snapshot photography, no nudity, no sexual content, vertical portrait orientation, 3:4 aspect ratio
```

---

## STEP④ 生成前チェック

- [x] 実在の有名人・特定個人を想起させる表現なし
- [x] 「26-year-old adult」を全プロンプトに明記
- [x] 扇情的な形容詞不使用、natural/relaxed/calmで統一
- [x] 撮影ジャンル語（snapshot / editorial / catalog photography）を明記
- [x] 水着・有料要素なし（初投稿のため全て日常私服）
- [x] シルバーネックレス＋フープピアスのシグネチャーアクセサリーを明記
- [x] "no nudity, no sexual content" を明示
- [x] 縦向きで統一（人物中心の寄りのため）
- [x] ブランドロゴ・商標名なし
- [x] 1プロンプト1シーン

## 自己紹介キャプション（日記本文）

```
はじめまして、りおです🤍

26歳、都内で働きながらのんびり過ごしてます。

前からSNS始めてみたいなーとは思ってたんですけど、
いきなり顔出しでバーッと投稿するのはさすがに恥ずかしくて、
とりあえずnoteで日記みたいに書いてみることにしました、笑

・仕事終わりのカフェとか休日のお出かけ
・気に入ってるスキンケアやコスメ
・お部屋でだらだらしてる日常

みたいな、特に何でもない毎日を綴っていく予定です。
気が向いたら旅先での特別な一枚とかも載せるかも。

続けられるか正直分からないけど笑、
少しずつでも見てもらえたら嬉しいし、
フォローしてもらえたらすごく励みになります🌿

みなさんは休日何して過ごすことが多いですか？
```

投稿内容の分類（`01-operation-guide.md` STEP⑤の4分類）：日常（自己紹介・note開設の経緯）＋フォロワーへの質問＋応援・フォロー訴求。

> 確認事項：アカウントのプロフィール欄には、成人の架空キャラクター／AI生成であることが分かる表記を別途入れておくこと（`characters/001-rio.md`・`README.md`のコンプライアンス項目）。日記本文自体には入れず、プロフィール欄での明記でよい。

## 次の作業（ユーザー側）

1. 上記4本をGPTの画像生成にそのまま貼って生成
2. 画像QA（`02-team-structure.md`）で採用3枚を選定
3. 採用画像＋上記キャプションで明日（7/31）投稿
4. `05-content-calendar.md` の投稿ログに1行追記（例：`2026-07-31 | 自己紹介（初投稿） | 無料 | -`）
