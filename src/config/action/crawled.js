'use strict';

const dbApi = require('config/database/dbapi');

module.exports = {
  getVodList: async (params) => {
    let sql;

    if (params) {
      sql = `SELECT * FROM vod ORDER BY create_tmp DESC LIMIT ${params.max}`;
    } else {
      sql = 'SELECT * FROM vod';
    }

    const res = await dbApi.selectQuery(sql);
    const httpScheme = 'https://',
          ytImgUnit = '/hqdefault.jpg',
          ytImgUrl = 'i.ytimg.com/vi/';

    _.forEach(res, (item) => {
      item.image_link = httpScheme + ytImgUrl + item.link.split('?v=').pop() + ytImgUnit;
      item.link = httpScheme + item.link;
    });

    return res;
  }
};