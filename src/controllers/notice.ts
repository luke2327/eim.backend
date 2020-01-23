import api from '../database/connection';
import mysql from 'mysql2';
import {
  GetNoticeReq,
  GetNoticeDetailReq } from '../models/notice/notice.interface';
import svc from '../utils/common';

export default {
  getNotice: (params: GetNoticeReq) => {
    const region = svc.getMapleRegion(params.locale);
    const { start, end } = params;
    const sql = `
      SELECT notice_no, type, title, region, link, published_date, create_tmp FROM notice
        WHERE region = ?
        ORDER BY published_date DESC
      LIMIT ?, ?`;

    return api.selectQuery(mysql.format(sql, [region, start, end]));
  },

  getNoticeDetail: (params: GetNoticeDetailReq) => {
    const { noticeNo } = params;
    const sql = `
      SELECT * FROM notice
        WHERE notice_no = ?`;

    return api.selectQuery(mysql.format(sql, [noticeNo]));
  }
};
