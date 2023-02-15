const model = require('../models').products;

module.exports = {
  getProducts: (req, res) => {
    model.getProducts(req.query.page, req.query.count)
      .then(({ data }) => res.status(200).send(data))
      .catch((err) => {
        console.error('err ctrl.getProducts: ', err);
        res.status(500).send(err);
      });
  },

  getProductById: (req, res) => {
    model.getProductById(req.params.product_id)
      .then(({ data }) => res.status(200).send(data))
      .catch((err) => {
        console.error('err ctrl.getProductById: ', err);
        res.status(500).send(err);
      });
  },

  getRelatedProduct: (req, res) => {
    model.getRelatedProduct(req.params.product_id)
      .then(({ data }) => res.status(200).send(data))
      .catch((err) => {
        console.error('err ctrl.getRelatedProduct: ', err);
        res.status(500).send(err);
      });
  },

  getProductStyle: (req, res) => {
    model.getProductStyle(req.params.product_id)
      .then(({ data }) => res.status(200).send(data))
      .catch((err) => {
        console.error('err ctrl.getProductStyle: ', err);
        res.status(500).send(err);
      });
  },
};
