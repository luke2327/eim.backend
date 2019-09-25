const dbApi = require('config/database/dbapi');

module.exports = {
  getSimulateItemByCube : async (params) => {

    console.log(params);

    let sql;

    switch(params.locale) {
      case 'en': {
        sql = `SELECT id, req_level, req_jobs, name_ko, \`desc\`, category, overall_category, sub_category FROM item_dict
                  WHERE req_level >= ${params.minItemLevel} AND req_level <= ${params.maxItemLevel} AND is_cash = ${params.isCash || 0} AND category = '${params.category}'`;

        break;
      } case 'ko': {
        sql = `SELECT id, req_level, req_jobs, name_ko, \`desc\`, category, overall_category, sub_category FROM item_dict
                  WHERE req_level >= ${params.minItemLevel} AND req_level <= ${params.maxItemLevel} AND is_cash = ${params.isCash || 0} AND category = '${params.category}'`;

        break;
      } case 'ja': {
        sql = `SELECT id, req_level, req_jobs, name_ko, \`desc\`, category, overall_category, sub_category FROM item_dict
                  WHERE req_level >= ${params.minItemLevel} AND req_level <= ${params.maxItemLevel} AND is_cash = ${params.isCash || 0} AND category = '${params.category}'`;

        break;
      }
    }

    return await dbApi.selectQuery(sql);
  }
}
