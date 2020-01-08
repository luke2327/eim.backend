import { Router, Request, Response } from 'express';
import itemApi from '../controllers/item';
import ck from 'camelcase-keys';

const router = Router();

router.post('/getMajorWeapon', async (req: Request, res: Response) => {
  const result = await itemApi.getItemMajorWeapon(req.body)
    .then((re: any) => ck(re, { deep: true }));

  res.send(result);
});

router.post('/getItemAvailableCube', async (req: Request, res: Response) => {
  const result = await itemApi.getItemAvailableCube(req.body)
    .then((re: any) => ck(re, { deep: true }));

  res.send(result);
});

export default router;
