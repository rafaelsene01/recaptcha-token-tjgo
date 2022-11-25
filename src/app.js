import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import Youch from 'youch';
import 'express-async-errors';
import routes from './routes';

class App {
  constructor() {
    this.app = express();
    this.middlawares();
    this.routes();
    this.exceptionHandler();
  }

  middlawares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(routes);
  }

  exceptionHandler() {
    this.app.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const error = await new Youch(err, req).toJSON();
        return res.status(500).json(error);
      }
      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().app;
