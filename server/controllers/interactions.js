const model = require('../models').interactions;

module.exports = {
  addInteraction: (req, res) => {
    model.addInteraction(req.body)
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.error('err ctrl.addInteraction: ', err);
        res.sendStatus(422);
      });
  },
};
