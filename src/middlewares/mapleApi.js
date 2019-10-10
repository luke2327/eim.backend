'use strict';

const express = require('express');
const router = express.Router();
const common = require('utils/common');
const mysql = require('mysql');
const dbApi = require('config/database/dbapi');
const axios = require('axios');
const axiosRetry = require('axios-retry');

axiosRetry(axios, { retries: 3 });

router.post('/item', async (req, res) => {
  req.body.path = req.url;

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

router.post('/input/item', async (req, res) => {
  req.body.path = req.url.replace('/input/', '');

  const result = await common.sendMaple(req.body);
  console.log(result.data);
  let query_data = [];
  const dataset = [];

  req.body.locale = 'ko';

  _.forEach(result.data, (data) => {
    _.map(data, (value, key) => {
      if (Array.isArray(value)) {
        query_data.push(JSON.stringify(value.join(' ')));
      }
      else if (typeof value === 'object') {
        _.map(value, (sub_value, sub_key) => {
          query_data.push(typeof sub_value === 'string' ? `"${sub_value}"` : sub_value);
        });
      } else if (typeof value === 'boolean') {
        query_data.push(value === false ? 0 : 1);
      }
      else {
        query_data.push(typeof value === 'string' ? `"${value}"` : value);
      }
    });
    dataset.push(query_data);
    query_data = [];
  });

  _.forEach(dataset, async (query) => {
    if (req.body.subCategoryFilter === 'Miracle Cube') {
      await dbApi.selectQuery(`INSERT IGNORE INTO item_cube (is_cash, name_ko, \`desc\`, item_no, overall_category, category, sub_category, low_item_id, high_item_id) 
      VALUES (${query.join()})`);
    } else if (req.body.categoryFilter === 'Armor') {
      await dbApi.selectQuery(`INSERT IGNORE INTO item_equip (req_jobs, req_level, is_cash, name_ko, \`desc\`, item_no, req_gender, overall_category, category, sub_category, low_item_id, high_item_id) 
      VALUES (${query.join()})`);
    }
  });

  res.send('success');
});

router.post('/input/item-meta', async (req, res) => {
  const mapleReq = {};
  let insertData = {};

  if (req.body.overallCategory === 'Equip' && (_.includes(req.body.category, 'One-Handed Weapon')) || _.includes(req.body.category, 'One-Handed Weapon')) {
    const sql = `SELECT item_no FROM item_weapon WHERE
      req_level >= ${req.body.minLevelFilter}
      AND req_level <= ${req.body.maxLevelFilter}
      AND overall_category = '${req.body.overallCategory}'
      AND category IN ('${req.body.category[0]}', '${req.body.category[1]}')`;

    const result = JSON.parse(JSON.stringify(await dbApi.selectQuery(sql)));

    _.forEach(result, async (v) => {
      mapleReq.path = `item/${v.item_no}`;
      mapleReq.locale = req.body.locale;
      const mapleRes = await common.sendMaple(mapleReq);

      if (mapleRes) {
        _.map(mapleRes.data.metaInfo, (value, key) => {
          insertData[key] = value;
        });

        // 필요한 키만 추출
        delete insertData.mob;
        delete insertData.iconRaw;
        delete insertData.icon;
        delete insertData.iconOrigin;
        delete insertData.iconRawOrigin;
        delete insertData.price;
        delete insertData.tradeBlock;
        delete insertData.exItem;
        delete insertData.bossReward;
        delete insertData.consumeSpec;
        delete insertData.setCompleteCount;
        delete insertData.vslots;
        delete insertData.islots;
        delete insertData.equipTradeBlock;
        delete insertData.notSale;
        delete insertData.attack;
        delete insertData.isIot;
        delete insertData.vsIot;

        const noTransform = ['reqSTR', 'reqDEX', 'reqINT', 'reqLUK', 'incSTR', 'incDEX', 'incINT', 'incLUK', 'incPAD', 'incMAD', 'charmEXP', 'incPDD', 'incMHP', 'incMMP', 'incMDD', 'incACC', 'incEVA'];

        _.map(insertData, (value, key) => {
          if (noTransform.includes(key)) {
            const new_key = key.replace(/([A-Z]+)/, '_$1').toLowerCase();

            delete Object.assign(insertData, { [new_key]: insertData[key] })[key];
          } else {
            // 키를 snake_case 로 교체
            const new_key = key.split(/(?=[A-Z])/).join('_').toLowerCase();

            delete Object.assign(insertData, { [new_key]: insertData[key] })[key];
          }
        });

        insertData.item_no = v.item_no;
        console.log(insertData);
        const insert_sql = mysql.format('INSERT IGNORE INTO weapon_meta SET ?', insertData);

        console.log(insert_sql);
        await dbApi.selectQuery(insert_sql);
      }
    });
  } else if (req.body.overallCategory === 'Equip' && req.body.category === 'Armor') {
    const sql = `SELECT item_no FROM item_equip WHERE
      req_level >= ${req.body.minLevelFilter}
      AND req_level <= ${req.body.maxLevelFilter}
      AND overall_category = '${req.body.overallCategory}'
      AND category = '${req.body.category}'`;

    const result = JSON.parse(JSON.stringify(await dbApi.selectQuery(sql)));

    console.log(result);

    _.forEach(result, async (v) => {
      mapleReq.path = `item/${v.item_no}`;
      mapleReq.locale = req.body.locale;
      const mapleRes = await common.sendMaple(mapleReq);
      // axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay});
      insertData = {};

      if (mapleRes.data.metaInfo || mapleRes.metaInfo) {
        _.map(mapleRes.data.metaInfo, (value, key) => {
          insertData[key] = value;
        });

        // 필요한 키만 추출
        delete insertData.mob;
        delete insertData.iconRaw;
        delete insertData.icon;
        delete insertData.iconOrigin;
        delete insertData.iconRawOrigin;
        delete insertData.price;
        delete insertData.exItem;
        delete insertData.bossReward;
        delete insertData.consumeSpec;
        delete insertData.setCompleteCount;
        delete insertData.vslots;
        delete insertData.islots;
        delete insertData.equipTradeBlock;
        delete insertData.isIot;
        delete insertData.islot;
        delete insertData.vsIot;
        delete insertData.vslot;
        delete insertData.tradeBlock;
        delete insertData.notSale;

        const noTransform = ['reqSTR', 'reqDEX', 'reqINT', 'reqLUK', 'incSTR', 'incDEX', 'incINT', 'incLUK', 'incPAD', 'incMAD', 'charmEXP', 'incPDD', 'incMHP', 'incMMP', 'incMDD', 'incACC', 'incEVA'];

        _.map(insertData, (value, key) => {
          if (noTransform.includes(key)) {
            const new_key = key.replace(/([A-Z]+)/, '_$1').toLowerCase();

            delete Object.assign(insertData, { [new_key]: insertData[key] })[key];
          } else if (key.match(/(?=[A-Z])/)) {
            // 키를 snake_case 로 교체
            const new_key = key.split(/(?=[A-Z])/).join('_').toLowerCase();

            delete Object.assign(insertData, { [new_key]: insertData[key] })[key];
          }
        });

        insertData.item_no = v.item_no;
        const insert_sql = mysql.format('INSERT IGNORE INTO equip_meta SET ?', insertData);

        console.log(insert_sql);
        await dbApi.selectQuery(insert_sql);
      }
    });
  }

});

module.exports = router;