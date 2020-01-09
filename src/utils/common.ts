import { SUPPORTED_LANGUAGE, SUPPORTED_REGION } from '../models/core/supported.type';

export default {
  getMapleRegion: (locale: SUPPORTED_LANGUAGE) => {
    /** default */
    let result = 'KMS' as SUPPORTED_REGION;

    if (locale === 'en') {
      result = 'GMS';
    } else if (locale === 'ja') {
      result = 'JMS';
    }

    return result;
  },

  isObjectEmpty: (object: object) => {
    return !Object.keys(object).length;
  }
};
