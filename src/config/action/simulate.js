const dbApi = require('config/database/dbapi');

module.exports = {
  getSimulateItemByCube : async (params) => {
    if (params.label === 'rootAbyss') {
      params.label = '파프니르';
    } else if (params.label === 'absolab') {
      params.label = '앱솔랩스';
    } else if (params.label === 'arcaneUmbra') {
      params.label = '아케인셰이드';
    }

    let sql;

    switch (params.locale) {
      case 'en': {
        sql = `SELECT id, req_level, req_jobs, name_ko, \`desc\`, category, overall_category, sub_category FROM item_weapon
                  WHERE req_level >= ${params.minItemLevel} 
                    AND req_level <= ${params.maxItemLevel} 
                    AND is_cash = ${params.isCash || 0} 
                    AND overall_category = '${params.category}' 
                    AND name_ko LIKE "%${params.label}%"`;

        break;
      } case 'ko': {
        sql = `SELECT id, req_level, req_jobs, name_ko, \`desc\`, category, overall_category, sub_category FROM item_weapon
                  WHERE req_level >= ${params.minItemLevel} 
                    AND req_level <= ${params.maxItemLevel} 
                    AND is_cash = ${params.isCash || 0} 
                    AND overall_category = '${params.category}'
                    AND name_ko LIKE "%${params.label}%"`;

        break;
      } case 'ja': {
        sql = `SELECT id, req_level, req_jobs, name_ko, \`desc\`, category, overall_category, sub_category FROM item_weapon
                  WHERE req_level >= ${params.minItemLevel} 
                    AND req_level <= ${params.maxItemLevel} 
                    AND is_cash = ${params.isCash || 0} 
                    AND overall_category = '${params.category}'
                    AND name_ko LIKE "%${params.label}%"`;

        break;
      }
    }

    return await dbApi.selectQuery(sql);
  }
}
