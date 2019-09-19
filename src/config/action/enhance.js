const dbApi = require('config/database/dbapi');

module.exports = {
  getEnhanceSearchItem : async (params) => {

    let sql;

    if (params.cate === 'all') {
        sql = params.name === '' ? `SELECT * FROM item` : `SELECT * FROM item WHERE name LIKE '%${params.name}%'`;
    } else {
        sql = (params.name === '' ? `SELECT * FROM item WHERE ` : `SELECT * FROM item WHERE name LIKE '%${params.name}%' AND `) + `cate = '${params.cate}'`;
    }

    return await dbApi.selectQuery(sql);
  }
}
