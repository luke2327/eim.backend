import api from '../database/connection';
import mysql from 'mysql2';
import { GetVodListReq } from '../models/entertainment/entertainment.interface';

export default {
  getVodList: async (params: GetVodListReq) => {
    const queryString = `
      SELECT * FROM vod WHERE language_cd = ? ORDER BY create_tmp DESC
    `;

    return await api.selectQuery(mysql.format(queryString, [params.locale]));
  }
};
