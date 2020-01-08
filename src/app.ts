import express, { json, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import item from './routes/item.routes';
import notice from './routes/notice.routes';
const app = express();

interface Err extends Error {
  status: number
  data?: any
}

app.use(cors());
app.use(json());
app.use('/api/item', item);
app.use('/api/notice', notice);

app.get('/', (req: Request, res: Response) => {
  res.send('This run!');
});

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  let err = new Error('Not Found') as Err;

  err.status = 404;
  next(err);
});

// error handle
app.use((err: Err, req: Request, res: Response, next: NextFunction) => {
  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    data: err.data
  });
});

export default app;
