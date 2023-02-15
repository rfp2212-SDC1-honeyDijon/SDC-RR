const imgbbUploader = require('imgbb-uploader');
const FormData = require('form-data');
const axios = require('axios');

const endpoint = 'https://api.imgbb.com/1/upload';

module.exports = {
  uploadImage: (imgPath) => (
    imgbbUploader({ apiKey: process.env.IMGBB_KEY, base64string: imgPath })
  ),

  uploadPhotos: (files) => {
    const options = files.map((file) => {
      const formData = new FormData();
      formData.append('image', file.buffer.toString('base64'));
      return {
        url: endpoint,
        method: 'post',
        headers: { 'content-type': 'multipart/form-data' },
        params: { key: process.env.IMGBB_KEY },
        data: formData,
      };
    });
    return axios.all(options.map((config) => axios(config)));
  },
};
