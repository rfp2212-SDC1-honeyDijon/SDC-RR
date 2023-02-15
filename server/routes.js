const router = require('express').Router();
const multer = require('multer');
const controllers = require('./controllers');

/* PRODUCTS */
router.get('/products', controllers.products.getProducts);
router.get('/products/:product_id', controllers.products.getProductById);
router.get('/products/:product_id/related', controllers.products.getRelatedProduct);
router.get('/products/:product_id/styles', controllers.products.getProductStyle);

/* REVIEWS */
router.get('/reviews', controllers.reviews.getReviews);
router.get('/reviews/meta', controllers.reviews.getReviewMeta);
router.post('/reviews', controllers.reviews.addReviews);
router.put('/reviews/:review_id/helpful', controllers.reviews.updateUseful);
router.put('/reviews/:review_id/report', controllers.reviews.updateReport);

/* QUESTIONS */
router.get('/qa/questions', controllers.questions.getQuestions);
router.get('/qa/questions/:question_id/answers', controllers.questions.getAnswers);
router.post('/qa/questions', controllers.questions.addQuestion);
router.post('/qa/questions/:question_id/answers', controllers.questions.answerQuestion);
router.put('/qa/questions/:question_id/helpful', controllers.questions.markHelpfulQuestion);
router.put('/qa/questions/:question_id/report', controllers.questions.reportQuestion);
router.put('/qa/answers/:answer_id/helpful', controllers.questions.markHelpfulAnswer);
router.put('/qa/answers/:answer_id/report', controllers.questions.reportAnswer);

/* CART */
router.get('/cart', controllers.cart.getCartItems);
router.post('/cart', controllers.cart.addCartItem);

/* INTERACTIONS */
router.post('/interactions', controllers.interactions.addInteraction);

/* THIRD PARTY */
router.post('/photos', multer().array('files', 5), controllers.thirdParty.postPhotos);
router.post('/image', controllers.thirdParty.uploadImage);

module.exports = router;
