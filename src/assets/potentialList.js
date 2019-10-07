'use strict';

exports.potentialList = {
  weaponPotentialList: {
    1: {
      1: { title: 'STR : +%d', reqLevel: 0, useCase: 1 },
      2: { title: 'DEX : +%d', reqLevel: 0, useCase: 1 },
      3: { title: 'INT : +%d', reqLevel: 0, useCase: 1 },
      4: { title: 'LUK : +%d', reqLevel: 0, useCase: 1 },
      5: { title: 'MaxHP : +%d', reqLevel: 0, useCase: 2 },
      6: { title: 'MaxMP : +%d', reqLevel: 0, useCase: 2 },
      7: { title: '공격력 : +%d', reqLevel: 0, useCase: 1 },
      8: { title: '마력 : +%d', reqLevel: 0, useCase: 1 },
      9: { title: 'STR : +%d%%', reqLevel: 0, useCase: 3 },
      10: { title: 'DEX : +%d%%', reqLevel: 0, useCase: 3 },
      11: { title: 'INT : +%d%%', reqLevel: 0, useCase: 3 },
      12: { title: 'LUK : +%d%%', reqLevel: 0, useCase: 3 },
      13: { title: '공격력 : +%d%%', reqLevel: 0, useCase: 3 },
      14: { title: '마력 : +%d%%', reqLevel: 0, useCase: 3 },
      15: { title: '크리티컬 확률 : +%d%%', reqLevel: 0, useCase: 4 },
      16: { title: '데미지 : +%d%%', reqLevel: 0, useCase: 3 },
      17: { title: '올스탯 : +%d', reqLevel: 0, useCase: 5 },
      18: { title: '공격 시 %d%% 확률로 HP의 %d 회복', reqLevel: 0, useCase: 6 },
      19: { title: '공격 시 %d%% 확률로 HP의 %d 회복', reqLevel: 0, useCase: 7 },
      20: { title: '공격 시 %d%% 확률로 MP의 %d 회복', reqLevel: 0, useCase: 6 },
      21: { title: '공격 시 %d%% 확률로 MP의 %d 회복', reqLevel: 0, useCase: 7 },
      22: { title: '공격 시 %d%% 확률로 %d레벨 중독효과 적용', reqLevel: 10, useCase: 8 },
      23: { title: '공격 시 %d%% 확률로 %d레벨 중독효과 적용', reqLevel: 10, useCase: 9 },
      24: { title: '공격 시 %d%% 확률로 %d레벨 기절효과 적용', reqLevel: 10, useCase: 10 },
      25: { title: '공격 시 %d%% 확률로 %d레벨 기절효과 적용', reqLevel: 10, useCase: 11 },
      26: { title: '공격 시 %d%% 확률로 %d레벨 슬로우효과 적용', reqLevel: 10, useCase: 11 },
      27: { title: '공격 시 %d%% 확률로 %d레벨 슬로우효과 적용', reqLevel: 10, useCase: 11 },
      28: { title: '공격 시 %d%% 확률로 %d레벨 암흑효과 적용', reqLevel: 10, useCase: 13 },
      29: { title: '공격 시 %d%% 확률로 %d레벨 암흑효과 적용', reqLevel: 10, useCase: 14 },
      30: { title: '공격 시 %d%% 확률로 %d레벨 빙결효과 적용', reqLevel: 10, useCase: 10 },
      31: { title: '공격 시 %d%% 확률로 %d레벨 빙결효과 적용', reqLevel: 10, useCase: 11 },
      32: { title: '공격 시 %d%% 확률로 %d레벨 봉인효과 적용', reqLevel: 10, useCase: 10 },
      33: { title: '공격 시 %d%% 확률로 %d레벨 봉인효과 적용', reqLevel: 10, useCase: 11 },
      34: { title: '몬스터 방어율 무시 : %d%%', reqLevel: 30, useCase: 15 },
    },
    2: {
      1: { title: 'STR', reqLevel: 10 },
    },
    3: {
      1: { title: '보스 몬스터 공격 시 데미지', reqLevel: 10 },
      2: { title: 'HP 회복아이템 및 회복 스킬 효율', reqLevel: 10 },
    },
    4: {
      1: { title: 'STR', reqLevel: 10 },
    }
  },
}