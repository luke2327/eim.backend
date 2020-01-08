import api from '../database/connection';
import mysql from 'mysql2';
import {
  GetNoticeReq,
  GetNoticeDetailReq } from '../models/notice/notice.interface';

export default {
  getNotice: (params: GetNoticeReq) => {
    let region;

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

    return api.selectQuery(mysql.format(sql, [region, params.start, params.end]));
  },

  getNoticeDetail: (params: GetNoticeDetailReq) => {
    const sql = `
    SELECT * FROM notice
      WHERE notice_no = ?`;

    return api.selectQuery(mysql.format(sql, [params.noticeNo]));
  }
};
