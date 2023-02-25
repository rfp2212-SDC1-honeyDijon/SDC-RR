const { redis } = require('../db/redis');
const model = require('../models').reviews;

module.exports = {
  getReviews: async (req, res) => {
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    const sort = req.query.sort || 'relevant';

    let cacheEntry = await redis.get(`reviews: ${req.query.product_id}${page}${count}${sort}`);
    // console.log('reviews', cacheEntry);
    if (cacheEntry) {
      cacheEntry = JSON.parse(cacheEntry);
      res.status(200).send(cacheEntry);
    } else {
      model.getReviews(req.query)
        .then((data) => {
          // console.log('get Reivews', data);
          redis.set(`reviews: ${req.query.product_id}${page}${count}${sort}`, JSON.stringify(data), 'EX', process.env.REDISTTL);
          res.status(200).send(data);
        })
        .catch((err) => {
          console.error('err ctrl.getReviews: ', err);
          res.status(404).send(err);
        });
    }
  },

  getReviewMeta: async (req, res) => {
    let cacheEntry = await redis.get(`reviews meta: ${req.query.product_id}`);
    // console.log('meta', cacheEntry);
    if (cacheEntry) {
      cacheEntry = JSON.parse(cacheEntry);
      res.status(200).send(cacheEntry);
    } else {
      model.getReviewMeta(req.query)
        .then((data) => {
          redis.set(`reviews meta: ${req.query.product_id}`, JSON.stringify(data), 'EX', process.env.REDISTTL);
          res.status(200).send(data);
        })
        .catch((err) => {
          console.error('err ctrl.getReviewMeta: ', err);
          res.status(500).send(err);
        });
    }
  },

  addReviews: (req, res) => {
    // console.log('controller addreview',req.body);
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
      .then((data) => {
        //console.log('helpful', data.rows);
        res.status(201).send('Useful Updated');
      })
      .catch((err) => {
        console.error('err ctrl.updateUseful: ', err);
        res.status(204).send(err);
      });
  },

  updateReport: (req, res) => {
    model.updateReport(req.params.review_id)
      .then((data) => {
        // console.log('report', data.rows);
        res.status(201).send('Report Update');
      })
      .catch((err) => {
        console.error('err ctrl.updateReport: ', err);
        res.status(204).send(err);
      });
  },
};
