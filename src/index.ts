import express from 'express';
import { PORT } from './config/config';

const app = express();

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('this run!');
});

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
})