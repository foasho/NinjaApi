# NinjaApi

NinjaGLで作成したコンテンツのデータ連携
- ChatGPTを扱うNPCの会話API
- マルチプレイヤー用Skywayのデータコンテンツ

# インストール

```
npm install @ninjagl/api
// or
yarn add @ninjagl/api
// or
pnpm add @ninjagl/api
```

## 環境変数.envを使う場合の設定

```
// Chatbot
OPENAI_API_KEY
// or ※REACT_APPでの指定は可視化されるのでテストのみで使用しましょう。
REACT_APP_OPENAI_API_KEY


// SkywayToken
SKYWAY_APP_ID
// or
REACT_APP_SKYWAY_APP_ID

SKYWAY_APP_SECRET_KEY
// or ※REACT_APPでの指定は可視化されるのでテストのみで使用しましょう。
REACT_APP_SKYWAY_APP_SECRET_KEY
```

サンプル
```env
OPENAI_API_KEY="sk-1..."
SKYWAY_APP_ID="2772279d-2e55-109e-189d-9db64dc4d427"
SKYWAY_APP_SECRET_KEY="mrkf5..."
```

## ライブラリメンテナ
```
pnpm test
```