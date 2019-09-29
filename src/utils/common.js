const axios = require('axios');
const config = require('utils/config');

module.exports = {
  sendMaple: async (req, type = 'get') => {
    const params = req;
    const l = config.getConfigMaple(params.locale);
    const url = `http://maplestory.io/api/${l.region}/${l.version}/${req.path}`;

    console.log(url);

    delete params.path;
    delete params.locale;

    return type === 'get'
      ? axios.get(url, { params: params })
      : axios.post(url, params);
  },
};
