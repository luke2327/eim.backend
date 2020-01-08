import { SUPPORTED_LANGUAGE } from '../core/supportedLanguage';
import { OVERALL_CATEGORY } from '../item/item.type';

export interface GetItemMajorWeaponReq {
  locale: SUPPORTED_LANGUAGE;
  isCash: boolean;
  overallCategory: OVERALL_CATEGORY;
}
