const express = require('express');
const router = express.Router();
const common = require('utils/common');
const dbApi = require('config/database/dbapi');
const _ = require('lodash');
const mysql = require('mysql')

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

router.post('/item/input', async (req, res) => {
  console.log(req.body);
  req.body.path = req.url.replace('/input', '');

  const result = await common.sendMaple(req.body);
  let query_data = [];
  const real_query = []

  req.body.locale = 'ko';

  _.forEach(result.data, data => {
    _.map(data, (value, key) => {
      if (Array.isArray(value)) {
        query_data.push(value.join(' '));
      } 
      else if (typeof value === 'object') {
        _.map(value, (sub_value, sub_key) => {
          query_data.push(sub_value);
        });
      } else if (typeof value === 'boolean') {
        query_data.push(value === false ? 0 : 1);
      }
      else {
        query_data.push(value);
      }
    });
    real_query.push(query_data);
    query_data = [];
  });
  _.forEach(real_query, async query => {
    if (req.body.subCategoryFilter === 'Miracle Cube') {
      // console.log(`INSERT IGNORE INTO item_cube (is_cash, name_ko, \`desc\`, id, overall_category, category, sub_category low_item_id, high_item_id) VALUES (
      //   ${query[0]}, '${query[1]}', '${query[2]}', ${query[3]}, '${query[4]}', '${query[5]}', ${query[6]}, ${query[7]} , ${query[8]}
      // )`);
      
      // await dbApi.insertQuery(`INSERT IGNORE INTO item_cube (is_cash, name_ko, \`desc\`, item_no, overall_category, category, sub_category low_item_id, high_item_id) 
      // VALUES (??)`, query);

      const ss = mysql.format(`INSERT IGNORE INTO item_cube (is_cash, name_ko, \`desc\`, item_no, overall_category, category, sub_category low_item_id, high_item_id) 
      VALUES (?)`, query);

      console.log(query);

      console.log(ss);


    }
    // console.log(`INSERT IGNORE INTO \`item_dict\` (req_jobs, req_level, is_cash, name_ko, \`desc\`, id, req_gender, category, overall_category, sub_category, lowItemId, highItemId) VALUES (
    //   '${query[0]}', ${query[1]}, ${query[2]}, '${query[3]}', '${query[4]}', ${query[5]}, ${query[6]}, '${query[7]}', '${query[8]}', '${query[9]}', ${query[10]}, ${query[11]}
    // ) `);

    // 아이템 INSERT 할 때 사용하세요
    // await dbApi.insertQuery(`INSERT IGNORE INTO \`item_dict\` (req_jobs, req_level, is_cash, name_ko, \`desc\`, id, req_gender, category, overall_category, sub_category, lowItemId, highItemId) VALUES (
    //   '${query[0]}', ${query[1]}, ${query[2]}, '${query[3]}', '${query[4]}', ${query[5]}, ${query[6]}, '${query[7]}', '${query[8]}', '${query[9]}', ${query[10]}, ${query[11]}
    // ) `);
  })

  res.send('success');
});

module.exports = router;