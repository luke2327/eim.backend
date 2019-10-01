const util = require('util');
const _ = require('lodash');
const potential = require('assets/potentialList');

exports.simulate = {
  getEquipType: (category) => {
    if (_.includes(category.toLowerCase(), 'weapon')) {
      return 'weapon';
    }
  },

  transformPotentialLevel: (potentialLevel) => {
    console.log(potentialLevel);

    if (Math.random() * 100 < 7) {
      potentialLevel = 2;

      console.log('에픽으로 등급 업 성공!');
    } else if (Math.random * 100 < 5 && potentialLevel >= 2) {
      potentialLevel = 3;

      console.log('유니크로 등급 업 성공!');
    } else if (Math.random * 100 < 2 && potentialLevel >= 3) {
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
    let setForm = [];

    if (equipType === 'weapon') {
      const potentialList = potential.weaponPotentialList[potentialLevel];
      const currentPotentialSize = Object.keys(potentialList).length
  
      // 옵션 매칭
      for (let i = 0; i < potentialListSize; i++) {
        randomPick = Math.floor(Math.random() * currentPotentialSize);
        setForm.push({id: randomPick, title: potentialList[randomPick]});
      }
    }

    return setForm;
  },

  setPotential: (potentialLevel, equipType, data) => {
    let resultForm = [];
    if (equipType === 'weapon') {
      default1 = Math.floor(Math.random() * 2) + 1;
      default2 = (Math.floor(Math.random() * 2) + 1) * 5;
      default3 = 1;
      default4 = 4;

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
              case 3: resultForm.push(util.format(v.title, randomCase1)); break;
              case 4:
              case 5:
              case 6: resultForm.push(util.format(v.title, randomCase2)); break;
              case 7: resultForm.push(util.format(v.title, randomCase1)); break;
              case 8:
              case 9:
              case 10:
              case 11:
              case 12:
              case 13:
              case 14:
              case 15: resultForm.push(util.format(v.title, randomCase3)); break;
              case 16: resultForm.push(util.format(v.title, randomCase3)); break;
              case 17:
              case 18: resultForm.push(util.format(v.title, randomCase4)); break;
              case 19:
              case 20:
              case 21: resultForm.push(util.format(v.title, randomCase3)); break;
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