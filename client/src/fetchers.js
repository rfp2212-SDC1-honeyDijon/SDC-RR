/* global env */
import axios from 'axios';

const SERVER_BASEURL = `${env.LOCAL_URL}:${env.PORT}/api`;
const BASEURL_QUESTIONS = `${SERVER_BASEURL}/qa/questions`;
const BASEURL_ANSWERS = `${SERVER_BASEURL}/qa/answers`;

export default {
  getProductById: (id) => {
    const options = {
      url: `${SERVER_BASEURL}/products/${id}`,
      method: 'get',
    };

    return axios(options);
  },

  getProductStyle: (id) => {
    const options = {
      url: `${SERVER_BASEURL}/products/${id}/styles`,
      method: 'get',
    };

    return axios(options);
  },

  getRelatedProduct: (id) => {
    const options = {
      url: `${SERVER_BASEURL}/products/${id}/related`,
      method: 'get',
    };

    return axios(options);
  },

  getReviews: (id, string) => {
    const options = {
      url: `${SERVER_BASEURL}/reviews`,
      method: 'get',
      params: {
        product_id: id,
        count: 200,
        sort: string || 'relevant',
      },
    };

    return axios(options);
  },

  getReviewMeta: (id) => {
    const options = {
      url: `${SERVER_BASEURL}/reviews/meta`,
      method: 'get',
      params: {
        product_id: id,
      },
    };

    return axios(options);
  },

  addReviews: (review) => {
    const options = {
      url: `${SERVER_BASEURL}/reviews`,
      method: 'post',
      data: review,
    };

    return axios(options);
  },

  updateUseful: (id) => {
    const options = {
      url: `${SERVER_BASEURL}/reviews/${id}/helpful`,
      method: 'put',
    };

    return axios(options);
  },

  updateReport: (id) => {
    const options = {
      url: `${SERVER_BASEURL}/reviews/${id}/report`,
      method: 'put',
    };

    return axios(options);
  },

  getQuestionsById: (product_id, page = 1, count = 100) => {
    const options = {
      url: BASEURL_QUESTIONS,
      method: 'get',
      params: { product_id, page, count },
    };

    return axios(options);
  },

  postQuestion: (data) => {
    const options = {
      url: BASEURL_QUESTIONS,
      method: 'post',
      data,
    };

    return axios(options);
  },

  postAnswer: (data, question_id) => {
    const options = {
      url: `${BASEURL_QUESTIONS}/${question_id}/answers`,
      method: 'post',
      data,
    };

    return axios(options);
  },

  markHelpfulQuestion: (question_id) => {
    const options = {
      url: `${BASEURL_QUESTIONS}/${question_id}/helpful`,
      method: 'put',
    };

    return axios(options);
  },

  markHelpfulAnswer: (answer_id) => {
    const options = {
      url: `${BASEURL_ANSWERS}/${answer_id}/helpful`,
      method: 'put',
    };

    return axios(options);
  },

  reportAnswer: (answer_id) => {
    const options = {
      url: `${BASEURL_ANSWERS}/${answer_id}/report`,
      method: 'put',
    };

    return axios(options);
  },

  fetchPhotos: (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    const options = {
      url: `${SERVER_BASEURL}/photos`,
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    };
    return axios(options).then(({ data }) => (data.map((result) => result.url)));
  },

  postInteraction: (data) => {
    const options = {
      url: `${SERVER_BASEURL}/interactions`,
      method: 'post',
      data,
    };
    return axios(options)
      .catch((err) => console.error('postInteraction - ', err));
  },

  addToCart: (sku_id) => {
    const options = {
      url: `${SERVER_BASEURL}/cart`,
      method: 'post',
      data: { sku_id },
    };
    return axios(options);
  },
};
