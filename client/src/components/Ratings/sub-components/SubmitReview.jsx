import React, { useState } from 'react';
import fetcher from '../../../fetchers';

export default function SubmitReview({
  newReview,
  chars,
  setChars,
  setNewReview,
  setReviewModal,
  feature,
  setReviews,
  setReviewMeta,
  handleRequiredRecommend,
  handleRequiredStars,
  handleRequiredName,
  handleRequiredEmail,
  handleRequiredBody,
  reviewMeta,
  handleRequiredChars,
  setShowThankyou,

}) {
  // STATE DATA //
  const [validReview, setValidReview] = useState(true);

  // HELPER FUNCTIONS //

  const handleRequiredCharsHelper = () => {
    Object.keys(reviewMeta.characteristics).forEach((characteristic) => {
      handleRequiredChars(characteristic);
    });
  };

  const invalidReview = () => {
    setValidReview(false);
    document.querySelector('.write-review-modal').classList.add('denial');
    handleRequiredRecommend();
    handleRequiredStars();
    handleRequiredName();
    handleRequiredEmail();
    handleRequiredBody();
    handleRequiredCharsHelper();
  };

  // EVENT HANDLERS //

  const addReview = () => {
    const finalReview = {};
    Object.assign(finalReview, newReview);
    finalReview.characteristics = chars;
    console.log(finalReview);
    fetcher.addReviews(finalReview)
      .then(() => {
        setNewReview({ product_id: newReview.product_id, photos: [] });
        setChars({});
        setReviewModal(false);
        setValidReview(true);
        setShowThankyou(true);
      })
      .catch(() => invalidReview());
    fetcher.getReviewMeta(feature.id)
      .then(({ data }) => setReviewMeta(data))
      .catch((err) => console.error('Error getting Review Meta after submit: ', err));
    fetcher.getReviews(feature.id)
      .then(({ data }) => setReviews(data.results))
      .catch((err) => console.error('Error getting Reviews after submit: ', err));
    // setShowThankyou(true);
  };

  return (
    <div className="submit-review-btn-container">
      {validReview ? null : (
        <p className="submit-bad-review">
          Please Complete All
          <span className="submit-asterik">
            {'  '}
            REQUIRED*
          </span>
          {'  '}
          Fields
        </p>
      )}
      <button className="submit-review-btn" type="button" onClick={() => addReview()}>Submit Review</button>
    </div>
  );
}
