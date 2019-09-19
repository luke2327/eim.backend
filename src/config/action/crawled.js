const dbApi = require('config/database/dbapi');

module.exports = {
  getVodList : async (params) => {

    let sql;

    sql = `SELECT * FROM vod`;

    return await dbApi.selectQuery(sql);
  }
}
