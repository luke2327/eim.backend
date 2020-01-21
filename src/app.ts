import express, { json, Request, Response, NextFunction } from 'express';
import { CommonErr } from './models/core/error.interface';
import cors from 'cors';
import item from './routes/item.routes';
import notice from './routes/notice.routes';
import entertainment from './routes/entertainment.routes';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('This run!');
});

app.use(cors());
app.use(json());

/** add middlewares */
app.use('/api/item', item);
app.use('/api/notice', notice);
app.use('/api/entertainment', entertainment);

/** catch 404 and forward to error handler */
app.use((req: Request, res: Response, next: NextFunction) => {
  let err = new Error('API Address Not Found') as CommonErr;

  err.status = 404;
  next(err);
});

/** error handle */
app.use((err: CommonErr, req: Request, res: Response, next: NextFunction) => {
  /** render the error page */
  res.status(err.status || 500);
  res.json({
    message: err.message,
    data: err.data
  });
});

export default app;
