const mysql = require('mysql');
const util = require('util');
const settings = require('./settings');


module.exports = {
  selectQuery: async (data) => {
    const conn = await mysql.createConnection(settings.connection);
    const query = await util.promisify(conn.query).bind(conn);
    return await query(data);
  }
}