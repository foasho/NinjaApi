# NinjaApi

NinjaGLで作成したコンテンツのデータ連携
※エンドポイントはデフォルト
- NPC会話API```/api/npc/conversations```
- マルチプレイヤー用API```/api/skyway/token```

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
SKYWAY_APP_ID="2772279d-2e55-109e-189d-9db64dc4d427"
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
import dotenv from 'dotenv';
import express from 'express';
import { SkywayTokenApi, NpcApi } from "@ninjagl/api";

dotenv.config();

const app = express();
const port = 5174;

app.get('/api/skyway/token', async (req, res) => {
  const response = await SkywayTokenApi();
  res.send(response.data);
});

app.post('/api/npc', async (req, res) => {
  const { conversations } = req.body;
  const response = await NpcApi(conversations);
  res.send(response.data);
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
```

## ライブラリメンテナ
```bash
// testcase
pnpm test
// publish
pnpm publish
```