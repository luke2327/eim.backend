import api from '../database/connection';
import mysql from 'mysql2';
import {
  GetNoticeReq,
  GetNoticeDetailReq } from '../models/notice/notice.interface';
import svc from '../utils/common';

export default {
  getNotice: (params: GetNoticeReq) => {
    const region = svc.getMapleRegion(params.locale);

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
