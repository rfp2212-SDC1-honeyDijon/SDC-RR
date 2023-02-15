const model = require('../models').reviews;

module.exports = {
  getReviews: (req, res) => {
    model.getReviews(req.query)
      .then(({ data }) => res.status(200).send(data))
      .catch((err) => {
        console.error('err ctrl.getReviews: ', err);
        res.status(500).send(err);
      });
  },

  getReviewMeta: (req, res) => {
    model.getReviewMeta(req.query)
      .then(({ data }) => res.status(200).send(data))
      .catch((err) => {
        console.error('err ctrl.getReviewMeta: ', err);
        res.status(500).send(err);
      });
  },

  addReviews: (req, res) => {
    model.addReviews(req.body)
      .then(({ config }) => res.status(201).send(config.data))
      .catch((err) => {
        console.error('err ctrl.addReviews: ', err);
        res.status(500).send(err);
      });
  },

  updateUseful: (req, res) => {
    model.updateUseful(req.params.review_id)
      .then(() => res.status(201).send('Useful Updated'))
      .catch((err) => {
        console.error('err ctrl.updateUseful: ', err);
        res.status(204).send(err);
      });
  },

  updateReport: (req, res) => {
    model.updateReport(req.params.review_id)
      .then(() => res.status(201).send('Report Update'))
      .catch((err) => {
        console.error('err ctrl.updateReport: ', err);
        res.status(204).send(err);
      });
  },
};
