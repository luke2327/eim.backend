import mysql, { RowDataPacket } from 'mysql2';
import util from 'util';
import { DB_CONFIG } from '../config/config';

export default {
  selectQuery: async (data: any): Promise<RowDataPacket> => {
    const conn = mysql.createConnection(DB_CONFIG.connection);
    let result: any;

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
