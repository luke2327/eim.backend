import mysql from 'mysql2';
import util from 'util';
import { DB_CONFIG } from '../config/config';

export default {
  selectQuery: async (data: any) => {
    let result;
    const conn = mysql.createConnection(DB_CONFIG.connection);

    try {
      const query = util.promisify(conn.query).bind(conn);

      result = await query(data);
    } catch (e) {
      console.log(e);
    } finally {
      conn.end();
    }

    return result;
  }
};
