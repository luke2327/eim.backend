const dbApi = require('config/database/dbapi');
const _ = require('lodash');

module.exports = {
  getVodList : async (params) => {

    let sql;

    sql = `SELECT * FROM vod`;
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
}
