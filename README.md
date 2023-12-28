# NinjaApi

DEMO: https://ninja-core.vercel.app

NinjaGL のコアライブラリ
- Editor: https://github.com/foasho/NinjaGL
- Core: https://github.com/foasho/NinjaCore
- API: HERE

NinjaGLで作成したコンテンツのデータ連携
※エンドポイントはデフォルト
- マルチプレイヤー用API```/api/skyway/token```
- NPC会話API```/api/npc/conversations```

# インストール

```bash
npm install @ninjagl/api
# or
yarn add @ninjagl/api
# or
pnpm add @ninjagl/api
```

## 環境変数.envを使う場合の設定

```conf
# Chatbot
OPENAI_API_KEY=
# or ※REACT_APPでの指定は可視化されるのでテストのみで使用しましょう。
REACT_APP_OPENAI_API_KEY=


# SkywayToken
SKYWAY_APP_ID=
# or
REACT_APP_SKYWAY_APP_ID=

SKYWAY_APP_SECRET_KEY=
# or ※REACT_APPでの指定は可視化されるのでテストのみで使用しましょう。
REACT_APP_SKYWAY_APP_SECRET_KEY=
```

サンプル
```conf
OPENAI_API_KEY="sk-1..."
SKYWAY_APP_ID="<UUID>"
SKYWAY_APP_SECRET_KEY="mrkf5..."
```

## Next.js Usage(AppRouter)
```ts
// app/api/skyway/token/route.ts
import { SkywayTokenApi } from "@ninjagl/api";

export async function GET(req: Request) {
  return Response(await SkywayTokenApi());
}
```

```ts
// app/api/npc/conversations/route.ts
import { NpcApi } from "@ninjagl/api";

export async function POST(req: Request) {
  const { conversations } = await req.json();
  return Response(await NpcApi());
}
```

## Express Usage
```js
import dotenv from "dotenv";
import express from "express";
import { SkywayTokenApi, NpcApi } from "@ninjagl/api";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 5174;

app.get("/api/skyway/token", async (req, res) => {
  const response = await SkywayTokenApi();
  res.send(response);
});

app.post("/api/npc/conversations", async (req, res) => {
  const { conversations } = req.body;
  const response = await NpcApi(conversations);
  res.send(response);
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
```

## ライブラリメンテナ
```bash
// Testing
pnpm test

// NPM公開
pnpm publish
```