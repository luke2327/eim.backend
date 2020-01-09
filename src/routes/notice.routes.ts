import { Router, Request, Response, NextFunction } from 'express';
import { Notice, NoticeDetail } from '../models/notice/notice.interface';
import notice from '../controllers/notice';
import ck from 'camelcase-keys';

const router = Router();

router.post('/getNotice', async (req: Request, res: Response, next: NextFunction) => {
  const result = await notice.getNotice(req.body)
    .then((re: Notice | unknown) => ck(re as Notice, { deep: true }));

  res.send(result);
});

router.post('/getNoticeDetail', async (req: Request, res: Response) => {
  const result = await notice.getNoticeDetail(req.body)
    .then((re: NoticeDetail | unknown) => ck(re as NoticeDetail, { deep: true }));

  res.send(result);
});

export default router;
