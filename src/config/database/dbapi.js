const mysql = require('mysql');
const util = require('util');
const settings = require('./settings');


module.exports = {
  selectQuery: async (data) => {
    let result;
    const conn = await mysql.createConnection(settings.connection);

    try{
      const query = await util.promisify(conn.query).bind(conn);
      result = await query(data);
    } catch (e) {
      throw e;
    } finally {
      conn.close();
    }
    
    return result;
  }
}