const dbApi = require('config/database/dbapi');
const potential = require('assets/potentialList');
const _ = require('lodash');

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
        sql = `SELECT item_no, req_level, req_jobs, name_ko, \`desc\`, category, overall_category, sub_category FROM item_weapon
                  WHERE req_level >= ${params.minItemLevel} 
                    AND req_level <= ${params.maxItemLevel} 
                    AND is_cash = ${params.isCash || 0} 
                    AND overall_category = '${params.category}' 
                    AND name_ko LIKE "%${params.label}%"
                  GROUP BY name_ko`;

        break;
      } case 'ko': {
        sql = `SELECT item_no, req_level, req_jobs, name_ko, \`desc\`, category, overall_category, sub_category FROM item_weapon
                  WHERE req_level >= ${params.minItemLevel} 
                    AND req_level <= ${params.maxItemLevel} 
                    AND is_cash = ${params.isCash || 0} 
                    AND overall_category = '${params.category}'
                    AND name_ko LIKE "%${params.label}%"
                  GROUP BY name_ko`;

        break;
      } case 'ja': {
        sql = `SELECT item_no, req_level, req_jobs, name_ko, \`desc\`, category, overall_category, sub_category FROM item_weapon
                  WHERE req_level >= ${params.minItemLevel} 
                    AND req_level <= ${params.maxItemLevel} 
                    AND is_cash = ${params.isCash || 0} 
                    AND overall_category = '${params.category}'
                    AND name_ko LIKE "%${params.label}%"`;

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
                  WHERE overall_category = '${params.overallCategory}'
                    AND category = '${params.category}'
                    AND sub_category = '${params.subCategory}'
                    AND name_ko = '${params.cubeName}'
                  GROUP BY name_ko`;

        break;
      } case 'ko': {
        sql = `SELECT item_no, name_ko, \`desc\`, overall_category, category, sub_category FROM item_cube
                  WHERE overall_category = '${params.overallCategory}'
                    AND category = '${params.category}'
                    AND sub_category = '${params.subCategory}'
                    AND name_ko = '${params.cubeName}'
                  GROUP BY name_ko`;

        break;
      } case 'ja': {
        sql = `SELECT item_no, name_ko, \`desc\`, overall_category, category, sub_category FROM item_cube
                  WHERE overall_category = '${params.overallCategory}'
                    AND category = '${params.category}'
                    AND sub_category = '${params.subCategory}'
                    AND name_ko = '${params.cubeName}'
                  GROUP BY name_ko`;

        break;
      }
    }

    return await dbApi.selectQuery(sql);
  },

  getSimulateSetPotential: async (params) => {
    const determinePotential = (potentialLevel, data) => {
      let resultForm = [];
      switch (potentialLevel) {
        // 레어
        case 1: {
          _.forEach(data, (v) => {
            randomCase1 = Math.floor(Math.random() * 10) + 3;
            randomCase2 = (Math.floor(Math.random() * 2) + 1) * 40;
            randomCase3 = Math.floor(Math.random() * 3) + 1;
            randomCase4 = Math.floor(Math.random() * 12) + 1;
            switch (v.id) {
              case 0:
              case 1:
              case 2:
              case 3: resultForm.push(`${v.title} : ${randomCase1}`); break;
              case 4:
              case 5:
              case 6: resultForm.push(`${v.title} : ${randomCase2}`); break;
              case 7: resultForm.push(`${v.title} : ${randomCase1}`); break;
              case 8:
              case 9:
              case 10:
              case 11:
              case 12:
              case 13:
              case 14:
              case 15: resultForm.push(`${v.title} : ${randomCase3}%`); break;
              case 16: resultForm.push(`공격시 ${randomCase3}% ${v.title}`); break;
              case 17:
              case 18: resultForm.push(`${v.title} : ${randomCase4}`); break;
              case 19:
              case 20:
              case 21: resultForm.push(`${v.title} : ${randomCase3}%`); break;
            }
          });
        }
        case 2: {
          _.forEach(data, (v => {

          }))
        }
      }

      return resultForm
    }
    
    switch (params.cube) {
      case 5062009: {
        // 큐브 레벨 상승
        // 현재는 레벨 업 구현이 안되어 있으므로 주석 처리
        let potentialLevel
        // if (Math.random() * 100 < 7) {
        //   potentialLevel = 2;
        // } else if (Math.random * 100 < 5 && params.potentialLevel >= 2) {
        //   potentialLevel = 3;
        // } else if (Math.random * 100 < 2 && params.potentialLevel >= 3) {
        //   potentialLevel = 4;
        // } else {
        //   potentialLevel = params.potentialLevel === 0 ? 1 : params.potentialLevel;
        // }

        potentialLevel = params.potentialLevel === 0 ? 1 : params.potentialLevel;

        const currentPotentialSize = Object.keys(potential.module.weaponPotentialList[potentialLevel]).length
        const potentialList = potential.module.weaponPotentialList[potentialLevel];

        // 옵션 매칭
        const setForm = [];
        for (let i = 0; i < 3; i++) {
          randomPick = Math.floor(Math.random() * currentPotentialSize);
          setForm.push({id: randomPick, title: potentialList[randomPick]});
        }

        const result = determinePotential(potentialLevel, setForm);

        return {potentialLevel: 1, 1: result[0], 2: result[1], 3: result[2]};
        // 레드 큐브

      } case 5062010: {
        // 블랙 큐브

      } case 5062500: {
        // 에디셔널 큐브
      }
    }
  }
}
