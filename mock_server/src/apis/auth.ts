/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import express from 'express';
import jwt from 'jsonwebtoken';
import { faker } from '@faker-js/faker';

let loginUser = '';

const secretKey = 'my_secret';

export const auth = (app: express.Express): void => {
  // error
  const validationError = {
    error: 'VALIDATION_ERROR',
    global: [{ message: '既に解約されています。' }],
    fields: [
      { field: 'mailAddress', message: '@@Fieldの値が不正です。' },
      { field: 'password', message: '@@Fieldの値が不正です。' }
    ]
  };

  // ログイン
  app.post('/login', (req: express.Request, res: express.Response) => {
    console.log(req.body);
    const mailAddress = req.body?.mailAddress;
    if (mailAddress === '401@example.com') {
      res.status(401);
      setTimeout(() => {
        res.json({ error: 'auth error' });
      }, 3000);
      return;
    }

    if (mailAddress === '400@example.com') {
      res.status(400);
      return res.json(validationError);
    }

    if (mailAddress === '500@example.com') {
      res.status(500);
      return res.json({ error: 'server error' });
    }

    if (mailAddress === '503@example.com') {
      res.status(503);
      return res.json({ error: 'maintenance' });
    }

    if (mailAddress === '502@example.com') {
      res.status(502);
      return res.json({ error: 'bad gateway' });
    }

    const token = jwt.sign({ username: mailAddress }, secretKey, {
      expiresIn: '1h'
    });
    loginUser = mailAddress;
    setTimeout(() => {
      res.json({
        displayName: faker.internet.username(),
        token: token,
        latestLoginDate: new Date().toISOString()
      });
    }, 1000);
  });

  // 認証有りAPI
  app.get(
    '/authCheck',
    verifyToken,
    (_req: express.Request, res: express.Response) => {
      res.send('Protected Contents');
    }
  );
};

export const verifyToken = (req: any, res: any, next: () => void) => {
  const authHeader = req.headers['authorization'];
  //HeaderにAuthorizationが定義されているか
  if (authHeader === undefined) {
    res.status(401);
    return res.json({ error: 'header error' });
  }

  //Bearerが正しく定義されているか
  if (authHeader.split(' ')[0] === 'Bearer') {
    try {
      const token = jwt.verify(authHeader.split(' ')[1], secretKey) as any;
      if (token.username === loginUser && Date.now() < token.exp * 1000) {
        console.log(token);
        next();
      } else if (token.username !== loginUser) {
        res.status(401);
        res.json({ error: 'token error' });
      } else {
        res.status(401);
        res.json({ error: 'token expired' });
      }
    } catch (e: any) {
      console.log(e.message);
      res.status(500);
      res.json({ error: e.message });
    }
  } else {
    res.status(400);
    res.json({ error: 'header format error' });
  }
};
