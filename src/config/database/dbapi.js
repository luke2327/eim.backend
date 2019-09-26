const mysql = require('mysql');
const util = require('util');
const settings = require('./settings');


module.exports = {
  selectQuery: async (data) => {
    let result;
    const conn = await mysql.createConnection(settings.connection);

    try {
      const query = await util.promisify(conn.query).bind(conn);
      result = await query(data);
    } catch (e) {
      console.log(e);
    } finally {
      conn.end();
    }
    
    return result;
  },

  insertQuery: async (...data) => {
    let result;
    const conn = await mysql.createConnection(settings.connection);

    await conn.connect((err) => {
      if (err) {
        console.log(err);
      }
    });

    console.log(data[0]);
    console.log(data[1]);
    console.log([data]);

    try {
      const query = await util.promisify(conn.query).bind(conn);
      result = await query(data[0], data[1]);
    } catch (e) {
      console.log(e);
    } finally {
      conn.end();
    }
    
    return result;
  }
}