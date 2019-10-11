'use strict';

const dbApi = require('config/database/dbapi');
const itemUtil = require('utils/itemUtil');

module.exports = {
  getSimulateItemByCube: async (params) => {
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
        sql = `SELECT iw.item_no, iw.req_level, iw.req_jobs, iw.name_ko, iw.\`desc\`, iw.category, iw.overall_category, iw.sub_category, wm.* FROM item_weapon AS iw
              INNER JOIN weapon_meta AS wm ON iw.item_no = wm.item_no
                  WHERE iw.req_level >= ${params.minItemLevel} 
                    AND iw.req_level <= ${params.maxItemLevel} 
                    AND iw.is_cash = ${params.isCash || 0} 
                    AND iw.overall_category = '${params.category}' 
                    AND iw.name_ko LIKE "%${params.label}%"
                    AND wm.trade_available IS NOT NULL
                  GROUP BY iw.name_ko`;

        break;
      } case 'ko': {
        sql = `SELECT iw.item_no, iw.req_level, iw.req_jobs, iw.name_ko, iw.\`desc\`, iw.category, iw.overall_category, iw.sub_category, wm.* FROM item_weapon AS iw
              INNER JOIN weapon_meta AS wm ON iw.item_no = wm.item_no
                  WHERE iw.req_level >= ${params.minItemLevel} 
                    AND iw.req_level <= ${params.maxItemLevel} 
                    AND iw.is_cash = ${params.isCash || 0} 
                    AND iw.overall_category = '${params.category}'
                    AND iw.name_ko LIKE "%${params.label}%"
                    AND wm.trade_available IS NOT NULL
                  GROUP BY iw.name_ko`;

        break;
      } case 'ja': {
        sql = `SELECT iw.item_no, iw.req_level, iw.req_jobs, iw.name_ko, iw.\`desc\`, iw.category, iw.overall_category, iw.sub_category, wm.* FROM item_weapon AS iw
              INNER JOIN weapon_meta AS wm ON iw.item_no = wm.item_no
                  WHERE iw.req_level >= ${params.minItemLevel} 
                    AND iw.req_level <= ${params.maxItemLevel} 
                    AND iw.is_cash = ${params.isCash || 0} 
                    AND iw.overall_category = '${params.category}'
                    AND iw.name_ko LIKE "%${params.label}%"
                    AND iw.wm.trade_available IS NOT NULL
                  GROUP BY iw.name_ko`;

        break;
      }
    }

    return await dbApi.selectQuery(sql);
  },

  getSimulateAvailableCubeByCube: async (params) => {
    let sql;

    switch (params.locale) {
      case 'en': {
        sql = `SELECT item_no, name_ko, \`desc\`, overall_category, category, sub_category FROM item_cube
                  WHERE item_no IN (${params.item_no})
                  GROUP BY name_ko`;

        break;
      } case 'ko': {
        sql = `SELECT item_no, name_ko, \`desc\`, overall_category, category, sub_category FROM item_cube
                  WHERE item_no IN (${params.item_no})
                  GROUP BY name_ko`;

        break;
      } case 'ja': {
        sql = `SELECT item_no, name_ko, \`desc\`, overall_category, category, sub_category FROM item_cube
                  WHERE item_no IN (${params.item_no})
                  GROUP BY name_ko`;

        break;
      }
    }

    return await dbApi.selectQuery(sql);
  },

  getSimulateSetPotential: async (params) => {
    const equipType = itemUtil.simulate.getEquipType(params.category);

    switch (params.cube) {
      // 레드 큐브, 블랙 큐브
      case 5062009:
      case 5062010: {
        // 큐브 레벨 상승
        console.log(params);
        const potentialLevel = params.potentialLevel === 0 ? 1 : itemUtil.simulate.transformPotentialLevel(params.potentialLevel);
        const setForm = itemUtil.simulate.potentialOptionMatch(potentialLevel, equipType, params.reqLevel);
        const defaultRandomCase = itemUtil.simulate.getDefaultRandomCase(potentialLevel, equipType, params.reqLevel);
        const result = itemUtil.simulate.setPotential(potentialLevel, equipType, setForm, defaultRandomCase);

        console.log(result);

        return { potentialLevel: potentialLevel, potential: result };
      } case 5062500: {
        // 에디셔널 큐브
      }
    }
  },

  getEquipmentItem: async (params) => {
    const sql = `SELECT ie.name_${params.locale}, ie.req_jobs, ie.\`desc\`, ie.req_gender, ie.overall_category, ie.category, ie.sub_category, em.* FROM item_equip AS ie
                INNER JOIN equip_meta AS em ON ie.item_no = em.item_no
                    WHERE ie.req_level >= ${params.minItemLevel}
                      AND ie.req_level <= ${params.maxItemLevel}
                      AND ie.category = '${params.category}'
                      AND em.trade_available IS NOT NULL`;

    return await dbApi.selectQuery(sql);
  }
};
