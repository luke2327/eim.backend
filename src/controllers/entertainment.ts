import api from '../database/connection';
import mysql from 'mysql2';
import { GetVodListReq } from '../models/entertainment/entertainment.interface';

export default {
  getVodList: async (params: GetVodListReq) => {
    const { locale, period } = params;
    let queryString: string;

    if (period) {
      queryString = mysql.format(`
        SELECT * FROM vod WHERE language_cd = ?
          AND create_tmp BETWEEN ? AND ? ORDER BY create_tmp DESC
      `, [locale, period.startDate, period.endDate]);
    } else {
      queryString = mysql.format(`
        SELECT * FROM vod WHERE language_cd = ? ORDER BY create_tmp DESC
      `, [locale]);
    }

    return await api.selectQuery(queryString);
  }
};
