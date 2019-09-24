const express = require('express');
const router = express.Router();
const common = require('utils/common');

router.post('/item', async (req, res) => {
  req.body.path = req.route.path;

  const result = await common.sendMaple(req.body);

  res.send(result.data);
});

router.post('/item/list', (req, res) => {
  console.log(req.body);
});

router.post('/item/category', (req, res) => {
  console.log(req.body);
});

router.post('/item/category/overall-category', (req, res) => {
  console.log(req.body);
});

router.post('/item/bulk', (req, res) => {
  console.log(req.body);
});

router.post('/item/detail', (req, res) => {
  console.log(req.body);
});

router.post('/item/icon', (req, res) => {
  console.log(req.body);
});

router.post('/item/icon-raw', (req, res) => {
  console.log(req.body);
});

router.post('/item/name', (req, res) => {
  console.log(req.body);
});

module.exports = router;