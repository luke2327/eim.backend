import app from './app';
import { PORT } from './config/config';

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
