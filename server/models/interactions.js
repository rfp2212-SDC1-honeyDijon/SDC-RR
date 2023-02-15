const axios = require('axios');

const endpoint = `${process.env.BASEURL}/interactions`;
const authHeader = {
  Authorization: process.env.TOKEN,
};

module.exports = {
  addInteraction: (params) => {
    const options = {
      url: endpoint,
      method: 'post',
      headers: authHeader,
      data: params,
    };
    return axios(options);
  },
};
