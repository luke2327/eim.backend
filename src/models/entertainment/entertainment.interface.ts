import { SUPPORTED_LANGUAGE } from '../core/supported.type';
import { GAME, SOURCE } from '../entertainment/entertainment.type';

export interface GetVodListReq {
  locale: SUPPORTED_LANGUAGE;
  period?: {
    startDate: string;
    endDate: string;
  }
}

export interface Vod {
  vodNo: number;
  title: string;
  auth: string;
  game: GAME;
  source: SOURCE;
  link: string;
  languageCd: SUPPORTED_LANGUAGE;
  duration: string;
  createTmp: Date;
  delField: boolean;
}
