# 投稿シーン実行例：2026-07-30「ナイトプール」（有料note）

`04-daily-prompt-workflow.md` のフローを実際に回した例。STEP①〜③の結果をそのまま記録する。

## STEP① シーン決定シート

| 項目 | 内容 |
| --- | --- |
| テーマ | 旅行・リゾート地でのひとコマ（ナイトプール） |
| 場所 | リゾートホテルのナイトプール |
| 時間帯 | 夜 |
| 気分・行動 | 友人とナイトプールに来た、というお出かけ投稿 |
| 服装カテゴリ | リゾート・水着（**有料**） |
| 公開区分 | 有料note（無料SNS側には「ナイトプール行ってきた」というテキストのみ投稿し、写真は有料note誘導） |

## STEP② 必要枚数

有料note 1記事想定 → **6枚**生成（採用目標4枚、却下分を見込んで多めに生成）。

## STEP③ GPTに貼る完成プロンプト（6本・v2）

> **v2改訂メモ**：v1は「simple one-piece swimsuit」とだけ指定した結果、生成結果が全てスク水のような見た目になってしまったため修正。①水着を「stylish two-piece bikini, resort swimwear」＋「not a school/athletic swimsuit」で明示、②`characters/001-mio.md`のユーザー提供参照画像に基づく顔・体つきの記述（伏し目がちな目元、唇の下やや右寄りのほくろ、スレンダーグラマー体型など）を全プロンプト共通で追加、の2点を反映済み。

`characters/001-mio.md` の固定要素（26歳、黒髪ロング・センターパート、伏し目がちな目元、唇の下やや右寄りのほくろ、ツヤ・グラス肌、スレンダーグラマー体型）を全プロンプト共通とし、場所・ポーズ・表情・撮影距離のみ変化させている。全て `characters/001-mio.md` の「有料コンテンツの範囲」ルール（水着まで／ヌード・性的行為を想起させる構図は禁止）に沿った tasteful な構図にしている。

---

**① プールサイド・全身**
- 行動・表情：プールサイドに立ち、confidentな自然な表情でこちらを見る
- 光・時間帯：夜、ライトアップされたプールの反射光
- 撮られ方：全身、tasteful resort travel editorial photography

```
A 26-year-old adult Japanese woman, soft oval face with downturned
almond eyes, straight nose, glossy nude-pink full lips, one small
natural beauty mark just below her lower lip slightly off-center,
long black hair with a center part and a few loose face-framing
strands, dewy glass-skin complexion, slender yet glamorous figure
with a defined waist, standing confidently poolside at a resort night
pool, wearing a stylish two-piece bikini in a solid neutral color,
resort swimwear, not a school/athletic swimsuit, full-body shot,
tasteful resort travel editorial photography, softly lit by the
pool's ambient night lighting, natural relaxed expression, no nudity,
no sexual content
```

**② デッキチェア・ウエストアップ**
- 行動・表情：デッキチェアでくつろぎ、飲み物を持って自然に微笑む
- 光・時間帯：夜、間接照明の暖色光
- 撮られ方：ウエストアップ、resort lifestyle editorial photography

```
A 26-year-old adult Japanese woman, soft oval face with downturned
almond eyes, glossy nude-pink lips, one small natural beauty mark just
below her lower lip slightly off-center, long black hair with a center
part, dewy glass-skin complexion, slender yet glamorous figure,
relaxing on a poolside deck chair at a resort at night, holding a
drink, wearing a stylish two-piece bikini in a solid neutral color
with a light cover-up draped on her shoulders, resort swimwear, not a
school/athletic swimsuit, waist-up shot, natural relaxed smile, warm
ambient lighting, resort lifestyle editorial photography, no nudity,
no sexual content
```

**③ プール際・後ろ姿**
- 行動・表情：プールに足だけ浸けて夜景を眺める後ろ姿
- 光・時間帯：夜、水面の反射光
- 撮られ方：全身の後ろ姿、travel editorial photography

```
A 26-year-old adult Japanese woman with long black hair with a center
part, slender yet glamorous figure with a defined waist, seen from
behind, sitting at the pool's edge with her feet in the water at a
resort night pool, wearing a stylish two-piece bikini in a solid
neutral color, resort swimwear, not a school/athletic swimsuit,
looking out at the night view, full-body back view, reflected light
on the water surface, travel editorial photography, no nudity, no
sexual content
```

**④ プールバー・横顔**
- 行動・表情：プールバーでドリンクを受け取りながら横を向いて自然な表情
- 光・時間帯：夜、バーカウンターの暖色照明
- 撮られ方：ウエストアップの横顔、catalog photography

```
A 26-year-old adult Japanese woman, soft oval face with downturned
almond eyes, glossy nude-pink lips, one small natural beauty mark just
below her lower lip slightly off-center, long black hair with a center
part, dewy glass-skin complexion, at a resort pool bar at night,
turning slightly to the side with a natural calm expression while
receiving a drink, wearing a stylish two-piece bikini in a solid
neutral color with a light cover-up, resort swimwear, not a
school/athletic swimsuit, waist-up side profile, warm bar lighting,
catalog photography, no nudity, no sexual content
```

**⑤ 遠景・ライトアップされたプール全体**
- 行動・表情：ライトアップされた広いプールを背景に自然に佇む
- 光・時間帯：夜、プール全体のライトアップ
- 撮られ方：やや引きの全身、artistic travel editorial photography

```
A 26-year-old adult Japanese woman with long black hair with a center
part, slender yet glamorous figure, standing naturally at the edge of
a beautifully lit resort night pool, wide shot showing the illuminated
pool and surrounding architecture, full-body, wearing a stylish
two-piece bikini in a solid neutral color with a light cover-up,
resort swimwear, not a school/athletic swimsuit, calm natural pose,
artistic travel editorial photography, no nudity, no sexual content
```

**⑥ 友人と談笑・自然なスナップ**
- 行動・表情：友人と談笑している自然な瞬間（カメラ目線でない）
- 光・時間帯：夜、プールサイドの柔らかな光
- 撮られ方：上半身、natural snapshot風

```
A 26-year-old adult Japanese woman, soft oval face with downturned
almond eyes, glossy nude-pink lips, one small natural beauty mark just
below her lower lip slightly off-center, long black hair with a center
part, dewy glass-skin complexion, laughing candidly while chatting
with a friend at a resort night pool, not looking at the camera,
upper-body shot, wearing a stylish two-piece bikini in a solid neutral
color with a light cover-up, resort swimwear, not a school/athletic
swimsuit, soft poolside lighting at night, natural candid snapshot
photography, no nudity, no sexual content
```

---

## STEP④ 生成前チェック（実施済み）

- [x] 実在の有名人・特定個人を想起させる表現なし
- [x] 「26-year-old adult」を全プロンプトに明記
- [x] 扇情的な形容詞（sexy/seductive等）不使用、confident/natural/relaxed/calmで統一
- [x] 撮影ジャンル語（editorial / lifestyle / catalog / snapshot photography）を全プロンプトに明記
- [x] 水着カットは全て "tasteful" + travel/resort editorial の文脈語つき、クローズアップなし（全身・ウエストアップ・後ろ姿のみ）
- [x] "no nudity, no sexual content" を明示
- [x] ブランドロゴ・商標名なし
- [x] 1プロンプト1シーン

## 次の作業（ユーザー側）

1. 上記6本をGPTの画像生成にそのまま貼って生成
2. 生成結果を画像QA担当のチェック（`02-team-structure.md`：手指・目線・歯・耳・背景・反射＋同一人物としての一貫性）にかけ、採用4枚を選定
3. 採用画像が決まったら、コピーライター工程（ストーリー＋質問付きキャプション）へ
