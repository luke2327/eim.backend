const express = require('express');
const router = express.Router();
const common = require('utils/common');

router.post('/item', async (err, req, res) => {
  req.body.path = req.route.path;

  const result = await common.sendMaple(req.body);

  res.send(result.data);
});

router.post('/item/list', async (req, res) => {
  req.body.path = req.route.path;

  const result = await common.sendMaple(req.body);

  res.send(result.data);
});

router.post('/item/category', async (req, res) => {
  req.body.path = req.route.path;

  const result = await common.sendMaple(req.body);

  res.send(result.data);
});

router.post('/item/category/overall-category', async (req, res) => {
  req.body.path = req.route.path;

  const result = await common.sendMaple(req.body);

  res.send(result.data);
});

router.post('/item/bulk', async (req, res) => {
  req.body.path = req.route.path;

  const result = await common.sendMaple(req.body);

  res.send(result.data);
});

router.post('/item/detail', async (req, res) => {
  req.body.path = req.route.path;

  const result = await common.sendMaple(req.body);

  res.send(result.data);
});

router.post('/item/icon', async (req, res) => {
  req.body.path = req.route.path;

  const result = await common.sendMaple(req.body);

  res.send(result.data);
});

router.post('/item/icon-raw', async (req, res) => {
  req.body.path = req.route.path;

  const result = await common.sendMaple(req.body);

  res.send(result.data);
});

router.post('/item/name', async (req, res) => {
  req.body.path = req.route.path;

  const result = await common.sendMaple(req.body);

  res.send(result.data);
});

module.exports = router;