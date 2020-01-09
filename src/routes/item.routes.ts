import { Router, Request, Response } from 'express';
import { ItemWeapon } from '../models/item/item.interface';
import itemApi from '../controllers/item';
import ck from 'camelcase-keys';

const router = Router();

router.post('/getMajorWeapon', async (req: Request, res: Response) => {
  const result = await itemApi.getItemMajorWeapon(req.body)
    .then((re: ItemWeapon | unknown) => ck(re as ItemWeapon, { deep: true }));

  res.send(result);
});

export default router;
