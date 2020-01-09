import { SUPPORTED_LANGUAGE, SUPPORTED_REGION } from '../core/supported.type';
import {
  OVERALL_CATEGORY,
  AVAILABLE_CUBE,
  SUB_CATEGORY,
  CATEGORY,
  REQ_JOBS,
  REQ_JOBS_CODE,
  REQ_GENDER,
  IS_CASH } from '../item/item.type';

export interface GetItemMajorWeaponReq {
  locale: SUPPORTED_LANGUAGE;
  isCash: boolean;
  overallCategory: OVERALL_CATEGORY;
}

export interface GetItemAvailableCubeReq {
  locale: SUPPORTED_LANGUAGE;
  availableCube: Array<AVAILABLE_CUBE>;
}

export interface Item {
  itemNo: number;             // 아이템 primary key
  isCash: IS_CASH;            // 캐시 아이템 여부
  nameEn?: string;            // 영어
  nameKo?: string;            // 한국어
  nameJa?: string;            // 일본어
  desc: string;               // 설명
  overallCategory: OVERALL_CATEGORY; // 대분류
  subCategory: SUB_CATEGORY;  // 소분류
  category: CATEGORY;         // 분류
}

export interface EquipBase extends Item {
  reqLevel: number;           // 요구 레벨
  reqJobs: REQ_JOBS;          // 요구 직업
  reqJob: REQ_JOBS_CODE;      // 요구 직업 (코드)
  reqGender: REQ_GENDER;      // 요구 성별
  only: boolean;              // ?? 뭘까
  cash: boolean;              // 캐시 가격일 것으로 추정
  reqStr: number;             // 요구 힘 스탯
  reqDex: number;             // 요구 민첩 스탯
  reqInt: number;             // 요구 지력 스탯
  reqLuk: number;             // 요구 행운 스탯
  reqSpecJob: null;           // 요구 특정 직업
  reqLevelEquip: number;      // 뭘까??
  incStr: number;             // 증가 힘 스탯
  incDex: number;             // 증가 민첩 스탯
  incInt: number;             // 증가 지력 스탯
  incLuk: number;             // 증가 행운 스탯
  incPad: number;             // 증가 공격력
  incMad: number;             // 증가 마력
  charmExp: number;           // 매력 증가 수치
  slotMax: number;            // 뭘까?
  bdR: number;                // 보공
  imdR: number;               // 방무
  incSpeed: null | number;    // 증가 이동속도
  incPdd: number;             // 증가 물리 방어력
  incMdd: number;             // 증가 마법 방어력
  incMhp: number;             // 증가 MAX HP
  incMmp: number;             // 증가 MAX MP
  incAcc: number;             // 증가 명중률
  incEva: number;             // 증가 회피율
  tradeAvailable: null | 2;   // 교환 가능 여부
  tuc: number;                // 업그레이드 가능 횟수
}

export interface ItemEquip extends EquipBase {
  superiorEqp: null | 1;      // 슈페리얼 장비
  incJump: number;            // 증가 점프력
}

export interface ItemWeapon extends EquipBase {
  attackSpeed: number;        // 공격속도
}
