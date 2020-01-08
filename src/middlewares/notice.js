'use strict';

const express = require('express');
const router = express.Router();
const notice = require('config/action/notice');
const ck = require('camelcase-keys');

router.post('/getNotice', async (req, res) => {
  console.time('start');
  const result = await notice.getNotice(req.body)
    .then(re => ck(re, { deep: true }));

  res.send(result);
  console.timeEnd('start');
});

router.post('/getNoticeDetail', async (req, res) => {
  console.time('start');
  const result = await notice.getNoticeDetail(req.body)
    .then(re => ck(re, { deep: true }));

  res.send(result);
  console.log(result);
  console.timeEnd('start');
});

module.exports = router;