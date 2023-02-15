const axios = require('axios');

const endpoint = `${process.env.BASEURL}/reviews`;
const authHeader = {
  Authorization: process.env.TOKEN,
};

module.exports = {
  getReviews: ({
    page = 1,
    count = 5,
    sort = 'relevant',
    product_id,
  }) => {
    const options = {
      url: endpoint,
      method: 'get',
      headers: authHeader,
      params: {
        page,
        count,
        sort,
        product_id,
      },
    };
    return axios(options);
  },

  getReviewMeta: ({ product_id }) => {
    const options = {
      url: `${endpoint}/meta`,
      method: 'get',
      headers: authHeader,
      params: { product_id },
    };
    return axios(options);
  },

  addReviews: (review) => {
    const options = {
      url: endpoint,
      method: 'post',
      headers: authHeader,
      data: review,
    };
    return axios(options);
  },

  updateUseful: (id) => {
    const options = {
      url: `${endpoint}/${id}/helpful`,
      method: 'put',
      headers: authHeader,
    };
    return axios(options);
  },

  updateReport: (id) => {
    const options = {
      url: `${endpoint}/${id}/report`,
      method: 'put',
      headers: authHeader,
    };
    return axios(options);
  },
};
