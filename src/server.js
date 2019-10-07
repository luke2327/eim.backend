'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 6050;
const enhanceApi = require('config/action/enhance');
const crawledApi = require('config/action/crawled');
const mapleApi = require('middlewares/mapleApi');
const item = require('middlewares/item');

global._ = require('lodash');

app.use(cors());
app.use(express.json());
app.use('/api/maple', mapleApi);
app.use('/api/item', item);

app.post('/api/enhance/dialog/input/search', async (req, res) => {
  console.log('POST :: /api/enhance/dialog/input/search');
  const result = await enhanceApi.getEnhanceSearchItem(req.body);

  res.send(result);
});

app.post('/api/enhance/form/lucky/channel', async (req, res) => {
  const result = await enhanceApi.getEnhanceLuckyChannel();

  res.send(result);
});

app.post('/api/vod/youtube/list', async (req, res) => {
  const result = await crawledApi.getVodList(req.body);

  res.send(result);
});

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});