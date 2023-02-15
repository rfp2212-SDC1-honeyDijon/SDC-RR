const model = require('../models').questions;

module.exports = {
  getQuestions: (req, res) => {
    model.getQuestions(req.query)
      .then(({ data }) => res.status(200).send(data))
      .catch((err) => {
        console.error('err ctrl.getQuestions: ', err);
        res.sendStatus(500);
      });
  },

  getAnswers: (req, res) => {
    model.getAnswers(req.params.question_id, req.query.page, req.query.count)
      .then(({ data }) => res.status(200).send(data))
      .catch((err) => {
        console.error('err ctrl.getAnswers: ', err);
        res.sendStatus(500);
      });
  },

  addQuestion: (req, res) => {
    model.addQuestion(req.body)
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.error('err ctrl.addQuestion: ', err);
        res.sendStatus(500);
      });
  },

  answerQuestion: (req, res) => {
    model.answerQuestion(req.params.question_id, req.body)
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.error('err ctrl.answerQuestion: ', err);
        res.sendStatus(500);
      });
  },

  markHelpfulQuestion: (req, res) => {
    model.markHelpfulQuestion(req.params.question_id)
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.error('err ctrl.markHelpfulQuestion: ', err);
        res.sendStatus(500);
      });
  },

  reportQuestion: (req, res) => {
    model.reportQuestion(req.params.question_id)
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.error('err ctrl.reportQuestion: ', err);
        res.sendStatus(500);
      });
  },

  markHelpfulAnswer: (req, res) => {
    model.markHelpfulAnswer(req.params.answer_id)
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.error('err ctrl.markHelpfulAnswer: ', err);
        res.sendStatus(500);
      });
  },

  reportAnswer: (req, res) => {
    model.reportAnswer(req.params.answer_id)
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.error('err ctrl.reportAnswer: ', err);
        res.sendStatus(500);
      });
  },
};
