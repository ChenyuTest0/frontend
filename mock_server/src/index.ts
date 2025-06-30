import express from 'express';
import { auth } from './apis/auth';
import { charts } from './apis/charts';
import { users } from './apis/users';
const app: express.Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(
  (
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  }
);

// 静的ファイルホスティング（必要な場合）
app.use(express.static('public'));

app.listen(3100, () => {
  console.log('Start on port 3100.');
});

// APIの定義
auth(app);
users(app);
charts(app);

// HACK: デプロイ資産動作確認用
// const app2: express.Express = express();
// app2.use(express.json());
// app2.use(express.urlencoded({ extended: true }));
// app2.use('/', express.static('../dist'));

// app2.listen(3200, () => {
//   console.log('Start on port 3200. (for prod resources.)');
// });

// HACK: Swagger(OpenAPI)から吐き出されたyamlを元にMock APIを作る場合はこちらを利用する
// 細かいオプションは右記を参照: https://www.npmjs.com/package/openapi-mock-express-middleware
//
// import { createMockMiddleware } from 'openapi-mock-express-middleware';
// app.use(
//   '/api', // root path for the mock server
//   createMockMiddleware({ file: '/absolute/path/to/your/openapi/spec.yml' })
// );
