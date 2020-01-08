'use strict';

const dbApi = require('config/database/dbapi');

module.exports = {
  getEnhanceSearchItem: async (params) => {
    let queryString;

    if (params.cate === 'all') {
      queryString = params.name === '' ? 'SELECT * FROM item' : `SELECT * FROM item WHERE name LIKE '%${params.name}%'`;
    } else {
      queryString = `${(params.name === '' ? 'SELECT * FROM item WHERE ' : `SELECT * FROM item WHERE name LIKE '%${params.name}%' AND `)}` + `cate = '${params.cate}'`;
    }

    return await dbApi.selectQuery(queryString);
  },

  getEnhanceLuckyChannel: async () => {
    const data = await dbApi.selectQuery('SELECT * FROM lucky_channel');

    return data[0];
  }
};
