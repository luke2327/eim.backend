import api from '../database/connection';
import { GetItemMajorWeaponReq, GetItemAvailableCubeReq } from '../models/item/item.interface';

export default {
  getItemMajorWeapon: async (params: GetItemMajorWeaponReq) => {
    const rootAbyss = '%파프니르%';
    const absolab = '%앱솔랩스%';
    const arcaneUmbra = '%아케인셰이드%';

    const queryString = `
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

    return await api.selectQuery(queryString);
  },

  getItemAvailableCube: async (params: GetItemAvailableCubeReq) => {
    const queryString = `
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

    return await api.selectQuery(queryString);
  }
};
