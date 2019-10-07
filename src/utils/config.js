'use strict';

module.exports = {
  getConfigMaple: (locale) => {
    const result = {};

    if (locale === 'en') {
      result.region = 'gms';
      result.version = '205';
    } else if (locale === 'ko') {
      result.region = 'kms';
      result.version = '323';
    } else if (locale === 'ja') {
      result.region = 'jms';
      result.version = '380';
    }

    return result;
  },
};