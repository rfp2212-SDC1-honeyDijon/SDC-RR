const model = require('../models').thirdParty;

module.exports = {
  uploadImage: (req, res) => {
    model.uploadImage(req.body.imgPath)
      .then((data) => res.status(200).send(data.url))
      .catch((err) => {
        console.error('err ctrl.upLoadImage: ', err);
        res.status(500).send(err);
      });
  },

  postPhotos: (req, res) => {
    model.uploadPhotos(req.files)
      .then((results) => {
        res.status(200).send(
          results
            .filter((result) => result.status === 200)
            .map(({ data }) => data.data),
        );
      })
      .catch((err) => {
        console.error('err ctrl.postPhotos: ', err);
        res.sendStatus(500);
      });
  },
};
