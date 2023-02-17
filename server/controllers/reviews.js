const model = require('../models').reviews;

module.exports = {
  getReviews: (req, res) => {
    model.getReviews(req.query)
      .then((data) => {
        console.log('get Reivews', data)
        res.status(200).send(data.rows);
      })
      .catch((err) => {
        console.error('err ctrl.getReviews: ', err);
        res.status(404).send(err);
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
    //console.log('controller addreview',req.body);
    model.addReviews(req.body)
      .then((results) => {
        // console.log(results.rows);
        res.status(201).send('post success');
      })
      .catch((err) => {
        console.error('err ctrl.addReviews: ', err);
        res.status(404).send(err);
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
