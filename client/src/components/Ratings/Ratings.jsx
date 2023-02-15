import React, { useState } from 'react';
import ReviewDashboard from './sub-components/ReviewDashboard.jsx';
import ReviewList from './sub-components/ReviewList.jsx';
import ThankYouModal from './sub-components/ThankYouModal.jsx';
// import './ratings.css';
import './overhaul.css';
import './preDemo.css';

export default function Ratings({
  reviews,
  setReviews,
  reviewMeta,
  feature,
  setReviewMeta,
  recordClick,
}) {
  // STATE DATA //
  const [selectedRating, setSelectedRating] = useState(null);
  const [listLength, setListLength] = useState(0);
  // const [listIndex, setListIndex] = useState(2);
  const [showThankyou, setShowThankyou] = useState(false);

  return (
    // eslint-disable-next-line -- not meant to be interactive
    <div id="ratings-widget" onClick={(e) => recordClick(e, 'Ratings & Reviews')}>
      <h2 id="review-top" className="review-header">Reviews</h2>
      <div className="ratings-parent">
        <ReviewDashboard
          reviews={reviews}
          setSelectedRating={setSelectedRating}
          selectedRating={selectedRating}
          reviewMeta={reviewMeta}
          listLength={listLength}
          setListLength={setListLength}
          // listIndex={listIndex}
          // setListIndex={setListIndex}
        />
        <div className="review-break" />
        <ReviewList
          reviews={reviews}
          selectedRating={selectedRating}
          setReviews={setReviews}
          listLength={listLength}
          setListLength={setListLength}
          // listIndex={listIndex}
          // setListIndex={setListIndex}
          feature={feature}
          reviewMeta={reviewMeta}
          setReviewMeta={setReviewMeta}
          setShowThankyou={setShowThankyou}
        />
        <ThankYouModal
          showThankyou={showThankyou}
          setShowThankyou={setShowThankyou}
        />
      </div>
    </div>
  );
}
