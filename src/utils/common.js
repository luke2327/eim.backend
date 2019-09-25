const axios = require('axios');
const config = require('utils/config');

module.exports = {
  sendMaple: async (req, type = 'get') => {
    const l = config.getConfigMaple(req.locale);
    const url = `http://maplestory.io/api/${l.region}/${l.version}${req.path}`;

    console.log(url);
    
    delete req.path;
    delete req.locale;

    return axios.get(url, { params: req });
  },
};
