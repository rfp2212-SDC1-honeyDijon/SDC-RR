import React, { useState, useEffect } from 'react';
import ReviewTracker from './ReviewTracker.jsx';
import CharacteristicTracker from './DashboardCharacteristicTracker.jsx';
import ActiveFilters from './ActiveFilters.jsx';
import StarImg from '../../../../dist/assets/star.png';
import StarRating from '../../shared/StarRating/StarRating.jsx';
import ReviewStarRating from '../../shared/StarRating/ReviewStarRating.jsx';

export default function ReviewDashboard({
  reviews,
  setSelectedRating,
  selectedRating,
  reviewMeta,
  listLength,
  setListLength,
  // listIndex,
  // setListIndex,
}) {
  // STATE DATA //
  const [avgRating, setAvgRating] = useState(0);
  const [stars, setStars] = useState([]);
  const [recommended, setRecommended] = useState(0);
  const [filter, setFilter] = useState({});

  // HELPER FUNCTIONS //
  const starRating = function dynamicStarRater(x) {
    const tempStars = [];
    let rating = x;
    while (tempStars.length < 5) {
      if (rating > 1) {
        tempStars.push(1);
      } else if (rating > 0) {
        const empty = Math.abs(0 - rating);
        const quart = Math.abs(0.25 - rating);
        const half = Math.abs(0.5 - rating);
        const three = Math.abs(0.75 - rating);
        const full = Math.abs(1 - rating);
        const closest = Math.min(empty, quart, half, three, full);
        switch (closest) {
          case (empty):
            tempStars.push(0);
            break;
          case (quart):
            tempStars.push(0.28);
            break;
          case (half):
            tempStars.push(0.5);
            break;
          case (three):
            tempStars.push(0.72);
            break;
          case (full):
            tempStars.push(1.0);
            break;
          default:
            tempStars.push(0);
            break;
        }
      } else {
        tempStars.push(0);
      }
      rating -= 1;
      setStars(tempStars);
    }
  };

  const ratingSetter = () => {
    if (reviews.length) {
      let total = 0;
      reviews.forEach((review) => {
        total += review.rating;
      });
      setAvgRating((total / reviews.length).toFixed(1));
      starRating(total / reviews.length);
    }
  };

  const recommendedSetter = () => {
    if (reviews.length) {
      let totalRecs = 0;
      reviews.forEach((review) => {
        if (review.recommend) {
          totalRecs += 1;
        }
      });
      const percent = `${Math.round((totalRecs / reviews.length) * 100)}%`;
      setRecommended(percent);
    }
  };

  const starAverager = (reviewData) => {
    let total = 0;
    reviewData.forEach((review) => {
      total += review.rating;
    });
    total /= reviews.length;
    total = (Math.round(total * 4) / 4).toFixed(2);
    return `${total * 20}%`;
  };

  // INITIALIZATION //
  useEffect(() => {
    if (reviews) {
      ratingSetter();
      recommendedSetter();
    }
  }, [reviews]);

  return (
    <>
      <div className="review-main-star-container">
        <p className="review-avg-rating">{avgRating}</p>
        <div className="review-stars-main">
          {reviews
            ? <StarRating ratingPercentage={starAverager(reviews)} className="star-icons" />
            : null}
        </div>
      </div>
      <div className="review-dash-main">
        <div className="review-dash-left">
          {/* <h3 className="review-rating-breakdown-title">Review Breakdown</h3> */}
          <ActiveFilters
            reviews={reviews}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            filter={filter}
            setFilter={setFilter}
          />
          <p className="people-recommended-reviews-par">{`${recommended} of reviewers recommend this product.`}</p>
          <ReviewTracker
            reviews={reviews}
            setSelectedRating={setSelectedRating}
            filter={filter}
            setFilter={setFilter}
            listLength={listLength}
            setListLength={setListLength}
            // listIndex={listIndex}
            // setListIndex={setListIndex}
          />
        </div>
        <div className="review-dash-right">
          <h3 className="prod-chars-title">Product Characteristics</h3>
          <CharacteristicTracker reviewMeta={reviewMeta} />
        </div>
      </div>
    </>
  );
}
