const model = require('../models').cart;

module.exports = {
  getCartItems: (req, res) => {
    model.getCartItems()
      .then(({ data }) => res.status(200).send(data))
      .catch((err) => {
        console.error('err ctrl.getCartItems: ', err);
        res.sendStatus(500);
      });
  },

  addCartItem: (req, res) => {
    model.addCartItem(req.body)
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.error('err ctrl.addCartItem: ', err);
        res.sendStatus(500);
      });
  },
};
