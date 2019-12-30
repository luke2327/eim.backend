'use strict';

const dbApi = require('config/database/dbapi');
const itemUtil = require('utils/itemUtil');

module.exports = {
  getItemMajorWeapon: async (params) => {
    const rootAbyss = '%파프니르%';
    const absolab = '%앱솔랩스%';
    const arcaneUmbra = '%아케인셰이드%';

    const sql = `
    SELECT
      iw.item_no,
      iw.req_level,
      iw.req_jobs,
      iw.name_${params.locale},
      iw.\`desc\`,
      iw.category,
      iw.overall_category,
      iw.sub_category,
      wm.*
    FROM item_weapon AS iw
    INNER JOIN weapon_meta AS wm ON iw.item_no = wm.item_no
    WHERE iw.is_cash = ${params.isCash || 0}
      AND iw.overall_category = '${params.overallCategory}'
      AND (
            iw.name_${params.locale} LIKE "${rootAbyss}" OR
            iw.name_${params.locale} LIKE "${absolab}" OR
            iw.name_${params.locale} LIKE "${arcaneUmbra}"
          )
      AND wm.trade_available IS NOT NULL
    GROUP BY iw.name_${params.locale}`;

    return await dbApi.selectQuery(sql);
  },

  getItemAvailableCube: async (params) => {
    const sql = `
    SELECT
      ic.item_no,
      ic.is_cash,
      ic.name_${params.locale},
      ic.\`desc\`,
      ic.overall_category,
      ic.category,
      ic.sub_category
    FROM item_cube AS ic
    WHERE item_no IN (${params.availableCube.join()})
    GROUP BY name_${params.locale}`;

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
    let sql;
    let result = [];

    for (const data of params) {
      if (_.includes(data.category, 'Armor')) {
        sql = `SELECT ie.item_no, ie.req_level, ie.req_jobs, ie.name_${data.locale}, ie.\`desc\`, ie.req_gender, ie.overall_category, ie.category, ie.sub_category, em.* FROM item_equip AS ie
        INNER JOIN equip_meta AS em ON ie.item_no = em.item_no
            WHERE ie.req_level >= ${data.minItemLevel}
              AND ie.req_level <= ${data.maxItemLevel}
              AND ie.category IN ('${_.isArray(data.category) ? data.category.join("','") : data.category}')
              AND em.trade_available IS NOT NULL`;
      } else if (_.includes(data.category, 'TwoHandedWeapon') || _.includes(data.category, 'OneHandedWeapon')) {
        sql = `SELECT iw.item_no, iw.req_level, iw.req_jobs, iw.name_${data.locale}, iw.\`desc\`, iw.category, iw.overall_category, iw.category, iw.sub_category, wm.* FROM item_weapon AS iw
        INNER JOIN weapon_meta AS wm ON iw.item_no = wm.item_no
            WHERE iw.req_level >= ${data.minItemLevel}
              AND iw.req_level <= ${data.maxItemLevel}
              AND iw.category IN ('${_.isArray(data.category) ? data.category.join("','") : data.category}')
              AND wm.trade_available IS NOT NULL
            GROUP BY iw.name_ko`;
      }

      result.push(await dbApi.selectQuery(sql));
    }

    result = _.flatten(result);

    return result;
  }
};
