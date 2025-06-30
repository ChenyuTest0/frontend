import express from 'express';

export const users = (app: express.Express): void => {
  type User = {
    id: number;
    name: string;
    email: string;
    detail: string;
    birthday: string | null;
    validStartDate: string | null;
    validEndDate: string | null;
  };

  const users: User[] = [
    {
      id: 1,
      name: 'User1',
      email: 'user1@test.local',
      detail: 'User1 detail information',
      birthday: '1993-03-03',
      validStartDate: '2021-03-03',
      validEndDate: '2021-09-03'
    },
    {
      id: 2,
      name: 'User2',
      email: 'user2@test.local',
      detail: 'User2 detail information',
      birthday: null,
      validStartDate: null,
      validEndDate: null
    },
    {
      id: 3,
      name: 'User3',
      email: 'user3@test.local',
      detail: 'User3 detail information',
      birthday: null,
      validStartDate: null,
      validEndDate: null
    }
  ];

  const internalError = {
    error: 'internal server error',
    global: [{ message: '該当データが存在しません。' }]
  };

  const badRequestError = {
    error: 'bad request',
    global: [{ message: 'システムエラー。リクエストが正しくありません。' }]
  };

  //一覧取得
  app.get('/users', (req: express.Request, res: express.Response) => {
    res.json(users);
  });

  // 詳細取得
  app.get('/user/:id', (req: express.Request, res: express.Response) => {
    if (req.params.id) {
      const detail = users.find(user => user.id === Number(req.params.id));
      if (detail) {
        res.json(detail);
      } else {
        res.status(500);
        return res.json(internalError);
      }
    } else {
      res.status(400);
      return res.json(badRequestError);
    }
  });

  // 詳細編集
  app.put('/user/:id', (req: express.Request, res: express.Response) => {
    console.log('/user/:id :: ', req.params);
    console.log('req.body :: ', req.body);
    if (req.params.id) {
      const index = users.findIndex(user => user.id === Number(req.params.id));
      if (index >= 0) {
        users[index].name = req.body?.name;
        users[index].email = req.body?.email;
        users[index].detail = req.body?.detail;
        users[index].birthday = req.body?.birthday;
        users[index].validStartDate = req.body?.validStartDate;
        users[index].validEndDate = req.body?.validEndDate;

        res.json({ result: 'OK' });
      } else {
        res.status(500);
        return res.json(internalError);
      }
    } else {
      res.status(400);
      return res.json(badRequestError);
    }
  });

  // ユーザ削除
  app.delete('/user/:id', (req: express.Request, res: express.Response) => {
    if (req.params.id) {
      const index = users.findIndex(user => user.id === Number(req.params.id));
      if (index >= 0) {
        users.splice(index, 1);
        const timer = setInterval(() => {
          res.json({ result: 'OK' });
          clearInterval(timer);
        }, 700);
      } else {
        res.status(500);
        return res.json(internalError);
      }
    } else {
      res.status(400);
      return res.json(badRequestError);
    }
  });

  // ユーザ追加
  app.post('/user', (req: express.Request, res: express.Response) => {
    if (req.body) {
      const usersCopy = users.concat();
      const newId =
        usersCopy.length > 0
          ? usersCopy.reduce((a, b) => (a.id > b.id ? a : b)).id + 1
          : 1;
      users.push({
        id: newId,
        name: req.body.name,
        email: req.body.email,
        detail: req.body.detail,
        birthday: req.body.birthday,
        validStartDate: req.body.validStartDate,
        validEndDate: req.body.validEndDate
      });
      res.json({ id: newId });
    } else {
      res.status(400);
      return res.json(badRequestError);
    }
  });
};
