import { SUPPORTED_LANGUAGE } from '../core/supportedLanguage';

export interface GetNoticeReq {
  locale: SUPPORTED_LANGUAGE,
  start: number,
  end: number
}

export interface GetNoticeDetailReq {
  noticeNo: number;
}
