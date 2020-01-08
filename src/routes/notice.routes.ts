import { Router, Request, Response } from 'express';
import notice from '../controllers/notice';
import ck from 'camelcase-keys';

const router = Router();

router.post('/getNotice', async (req, res) => {
  const result = await notice.getNotice(req.body)
    .then((re: any) => ck(re, { deep: true }));

  res.send(result);
});

router.post('/getNoticeDetail', async (req, res) => {
  const result = await notice.getNoticeDetail(req.body)
    .then((re: any) => ck(re, { deep: true }));

  res.send(result);
});

export default router;
