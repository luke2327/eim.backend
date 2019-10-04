const util = require('util');
const _ = require('lodash');
const potential = require('assets/potentialList');
const defaultRandomCase = require('assets/potentialRandom');

exports.simulate = {
  getEquipType: (category) => {
    if (_.includes(category.toLowerCase(), 'weapon')) {
      return 'weapon';
    }
  },

  transformPotentialLevel: (potentialLevel) => {
    if (Math.random() * 100 < 7 && potentialLevel < 2) {
      potentialLevel = 2;

      console.log('에픽으로 등급 업 성공!');
    } else if (Math.random() * 100 < 5 && potentialLevel >= 2 && potentialLevel < 3) {
      potentialLevel = 3;

      console.log('유니크로 등급 업 성공!');
    } else if (Math.random() * 100 < 2 && potentialLevel >= 3 && potentialLevel < 4) {
      potentialLevel = 4;

      console.log('레전드리로 등급 업 성공!');
    } else {
      potentialLevel = potentialLevel === 0 ? 1 : potentialLevel;

      console.log('등급 업 실패 ! 기존 유지');
    }

    return potentialLevel;
  },

  potentialOptionMatch: (potentialLevel, equipType, equipLevel) => {
    const potentialListSize = 3;
    const addPotentialListSize = 3;
    let potentialIncrease = 0;
    let setForm = [];

    if (equipType === 'weapon') {
      const potentialList = potential.potentialList.weaponPotentialList[potentialLevel];
      const currentPotentialSize = Object.keys(potentialList).length

      while (potentialIncrease < potentialListSize) {
        const randomPick = Math.floor(Math.random() * currentPotentialSize) + 1;
        if (potentialList[randomPick].reqLevel <= equipLevel) {
          setForm.push({ id: randomPick, title: potentialList[randomPick].title });
          potentialIncrease++;
        }
      }
    }

    return setForm;
  },

  getDefaultRandomCase: (potentialLevel, equipType, equipLevel) => {
    console.log('level : ', equipLevel);

    const result = defaultRandomCase.case[equipType][potentialLevel];

    switch (potentialLevel) {
      case 1: {
        let rareCase = {};
        if (equipLevel <= 200) {
          rareCase[1] = 6;
          rareCase[2] = 12;
          rareCase[3] = 3;
          rareCase[4] = 1;
          rareCase[5] = 5;
          rareCase[6] = [3, 3.2];
          rareCase[7] = [1, 12];
          rareCase[8] = [0.5, 2];
          rareCase[9] = [1, 6];
          rareCase[10] = [1, 2];
          rareCase[11] = [1, 2];
          rareCase[12] = [1, 3];
          rareCase[13] = [1, 3];
          rareCase[14] = [1, 3];
          rareCase[15] = 1;
        }
        _.map(result, (c, cKey) => {
          c.calcValue = rareCase[cKey];
        });
      }
    }

    return result;
  },

  setPotential: (potentialLevel, equipType, data, defaultRandomCase) => {
    let resultForm = [];
    if (equipType === 'weapon') {
      switch (potentialLevel) {
        // 레어
        case 1: {
          _.forEach(data, (v) => {
            if (_.includes([1, 2, 3, 4, 7, 8], v.id)) {
              resultForm.push(util.format(v.title, defaultRandomCase[1].calc() * defaultRandomCase[1].calcValue));
            } else if (_.includes([5,6], v.id)) {
              resultForm.push(util.format(v.title, defaultRandomCase[2].calc() * defaultRandomCase[2].calcValue));
            } else if (_.includes([9, 10, 11, 12, 13, 14, 16], v.id)) {
              resultForm.push(util.format(v.title, defaultRandomCase[3].calc * defaultRandomCase[3].calcValue));
            } else if (_.includes([15], v.id)) {
              resultForm.push(util.format(v.title, defaultRandomCase[4].calc * defaultRandomCase[4].calcValue));
            } else if (_.includes([17], v.id)) {
              resultForm.push(util.format(v.title, defaultRandomCase[5].calc * defaultRandomCase[5].calcValue));
            } else if (_.includes([18, 20], v.id)) {
              resultForm.push(util.format(v.title, defaultRandomCase[6].calc[0] * defaultRandomCase[6].calcValue[0], defaultRandomCase[6].calc[1] * defaultRandomCase[6].calcValue[1]));
            } else if (_.includes([19, 21], v.id)) {
              resultForm.push(util.format(v.title, defaultRandomCase[7].calc[0] * defaultRandomCase[7].calcValue[0], defaultRandomCase[7].calc[1] * defaultRandomCase[7].calcValue[1]));
            } else if (_.includes([22], v.id)) {
              resultForm.push(util.format(v.title, defaultRandomCase[8].calc[0] * defaultRandomCase[8].calcValue[0], defaultRandomCase[8].calc[1] * defaultRandomCase[8].calcValue[1]));
            } else if (_.includes([23], v.id)) {
              resultForm.push(util.format(v.title, defaultRandomCase[9].calc[0] * defaultRandomCase[9].calcValue[0], defaultRandomCase[9].calc[1] * defaultRandomCase[9].calcValue[1]));
            } else if (_.includes([24, 30, 32], v.id)) {
              resultForm.push(util.format(v.title, defaultRandomCase[10].calc[0] * defaultRandomCase[10].calcValue[0], defaultRandomCase[10].calc[1] * defaultRandomCase[10].calcValue[1]));
            } else if (_.includes([25, 26, 27, 31, 33], v.id)) {
              resultForm.push(util.format(v.title, defaultRandomCase[11].calc[0] * defaultRandomCase[11].calcValue[0], defaultRandomCase[11].calc[1] * defaultRandomCase[11].calcValue[1]));
            } else if (_.includes([28], v.id)) {
              resultForm.push(util.format(v.title, defaultRandomCase[13].calc[0] * defaultRandomCase[13].calcValue[0], defaultRandomCase[13].calc[1] * defaultRandomCase[13].calcValue[1]));
            } else if (_.includes([29], v.id)) {
              resultForm.push(util.format(v.title, defaultRandomCase[14].calc[0] * defaultRandomCase[14].calcValue[0], defaultRandomCase[14].calc[1] * defaultRandomCase[14].calcValue[1]));
            } else if (_.includes([34], v.id)) {
              resultForm.push(util.format(v.title, defaultRandomCase[15].calc * defaultRandomCase[15].calcValue));
            } 
          });
        }
        // 에픽
        case 2: {
          _.forEach(data, (v => {
  
          }));
        }
      }
    }

    return resultForm
  },
}