const axios = require('axios');

const endpoint = `${process.env.BASEURL}/qa/questions`;
const answerEndpoint = `${process.env.BASEURL}/qa/answers`;
const authHeader = {
  Authorization: process.env.TOKEN,
};

module.exports = {
  getQuestions: ({ count = 5, page = 1, product_id }) => {
    const options = {
      url: endpoint,
      method: 'get',
      headers: authHeader,
      params: { page, count, product_id },
    };
    return axios(options);
  },

  getAnswers: (id, page = 1, count = 5) => {
    const options = {
      url: `${endpoint}/${id}/answers`,
      method: 'get',
      headers: authHeader,
      params: { page, count },
    };
    return axios(options);
  },

  addQuestion: (question) => {
    const options = {
      url: endpoint,
      method: 'post',
      headers: authHeader,
      data: question,
    };
    return axios(options);
  },

  answerQuestion: (id, answer) => {
    const options = {
      url: `${endpoint}/${id}/answers`,
      method: 'post',
      headers: authHeader,
      data: answer,
    };
    return axios(options);
  },

  markHelpfulQuestion: (id) => {
    const options = {
      url: `${endpoint}/${id}/helpful`,
      method: 'put',
      headers: authHeader,
    };
    return axios(options);
  },

  reportQuestion: (id) => {
    const options = {
      url: `${endpoint}/${id}/report`,
      method: 'put',
      headers: authHeader,
    };
    return axios(options);
  },

  markHelpfulAnswer: (id) => {
    const options = {
      url: `${answerEndpoint}/${id}/helpful`,
      method: 'put',
      headers: authHeader,
    };
    return axios(options);
  },

  reportAnswer: (id) => {
    const options = {
      url: `${answerEndpoint}/${id}/report`,
      method: 'put',
      headers: authHeader,
    };
    return axios(options);
  },
};
