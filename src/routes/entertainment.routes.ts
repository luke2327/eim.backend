import { Router, Request, Response } from 'express';
import { Vod } from '../models/entertainment/entertainment.interface';
import entertainmentApi from '../controllers/entertainment';
import ck from 'camelcase-keys';

const router = Router();

router.post('/getVodList', async (req: Request, res: Response) => {
  const result = await entertainmentApi.getVodList(req.body)
    .then((re: Vod | unknown) => ck(re as Vod, { deep: true }));

  res.send(result);
});

export default router;
