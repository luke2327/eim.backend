import { SUPPORTED_LANGUAGE, SUPPORTED_REGION } from '../core/supported.type';
import { NOTICE_TYPE } from './notice.type';

export interface GetNoticeReq {
  locale: SUPPORTED_LANGUAGE,
  start: number,
  end: number
}

export interface GetNoticeDetailReq {
  noticeNo: number;
}

export interface Notice {
  noticeNo: number;
  type: NOTICE_TYPE;
  title: string;
  desc?: string;
  region: SUPPORTED_REGION;
  link: string;
  publishedDate: Date;
  createTmp: Date;
}

export interface NoticeDetail {
  desc: string;
}
