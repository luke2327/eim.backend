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

  getDefaultRandomCase: (potentialLevel, equipType, level) => {
    return defaultRandomCase.case[equipType][potentialLevel];
  },

  setPotential: (potentialLevel, equipType, data, defaultRandomCase) => {
    // console.log(defaultRandomCase);
    let resultForm = [];
    if (equipType === 'weapon') {
      switch (potentialLevel) {
        // 레어
        case 1: {
          _.forEach(data, (v) => {
            randomCase1 = Math.floor(Math.random() * 10) + 3;
            randomCase2 = (Math.floor(Math.random() * 2) + 1) * 40;
            randomCase3 = Math.floor(Math.random() * 3) + 1;
            randomCase4 = Math.floor(Math.random() * 12) + 1;

            if (_.includes([0,1,2,3,7], v.id)) {
              resultForm.push(util.format(v.title, randomCase1));
            } else if (_.includes([4,5,6], v.id)) {
              resultForm.push(util.format(v.title, randomCase2));
            } else if (_.includes([8,9,10,11,12,13,14,15,16,19,20,21], v.id)) {
              resultForm.push(util.format(v.title, randomCase3));
            } else if (_.includes([17, 18], v.id)) {
              resultForm.push(util.format(v.title, randomCase4));
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