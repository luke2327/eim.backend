'use strict';

const dbApi = require('config/database/dbapi');
const mysql = require('mysql2');

module.exports = {
  getNotice: (params) => {
    let region;

    console.log(params);

    if (params.locale === 'ko') {
      region = 'KMS';
    } else if (params.locale === 'en') {
      region = 'GMS';
    } else if (params.locale === 'ja') {
      region = 'JMS';
    }

    const sql = `
    SELECT notice_no, type, title, region, link, published_date, create_tmp FROM notice
      WHERE region = ?
      ORDER BY published_date DESC
    LIMIT ?, ?`;

    return dbApi.selectQuery(mysql.format(sql, [region, params.start, params.end]));
  },

  getNoticeDetail: (params) => {

    console.log(params);

    const sql = `
    SELECT * FROM notice
      WHERE notice_no = ?`;

    return dbApi.selectQuery(mysql.format(sql, [params.noticeNo]));
  },
};
