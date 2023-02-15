import React, { useState, useEffect } from 'react';
import TrackerBar from './TrackerBar.jsx';

export default function ReviewTracker({
  reviews,
  setSelectedRating,
  filter,
  setFilter,
  setListLength,
  // listIndex,
}) {
  // STATE DATA //
  const [percentages, setPercentages] = useState({});
  const [numReviews, setNumReviews] = useState({});

  // HELPER FUNCTIONS //
  const getRatingPercentages = () => {
    const ratingTotals = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    for (let i = 0; i < reviews.length; i += 1) { // logic to display breakdown of total reviews
      // !! slice(0, listIndex) will show review breakdown for displayed reviews !!
      ratingTotals[reviews[i].rating] += 1;
    }
    // !! const total = reviews.slice(0, listIndex).length; !!
    // !! logic to display breakdown of reviews relative to current number of displayed reviews !!
    const total = reviews.length; // logic to display breakdown of total reviews
    setNumReviews(ratingTotals);
    setPercentages({
      1: (ratingTotals[1] / total) * 100,
      2: (ratingTotals[2] / total) * 100,
      3: (ratingTotals[3] / total) * 100,
      4: (ratingTotals[4] / total) * 100,
      5: (ratingTotals[5] / total) * 100,
    });
  };

  // EVENT HANDLERS //
  const toggleRating = (num) => {
    // lines 42-48: Make review bars w/o reviews un-clickable.
    // const temp = [];
    // for (let i = 0; i < reviews.slice(0, listIndex).length; i += 1) {
    //   temp.push(reviews[i].rating);
    // }
    // if (temp.includes(num) === false) {
    //   return;
    // }
    //
    let newSelect = {};
    newSelect = Object.assign(newSelect, filter);
    if (!newSelect[num]) {
      newSelect[num] = true;
      setFilter(newSelect);
      setSelectedRating(newSelect);
    } else {
      delete newSelect[num];
      if (!Object.keys(newSelect).length) {
        setFilter({});
        setSelectedRating(null);
      } else {
        setFilter(newSelect);
        setSelectedRating(newSelect);
      }
    }
  };

  // INITIALIZATION //
  useEffect(() => {
    if (reviews) {
      getRatingPercentages();
      const trueKeys = (Object.keys(filter).map(Number));
      const getReviewLength = () => {
        let counter = 0;
        for (let i = 0; i < reviews.length; i += 1) {
          if (trueKeys.includes(reviews[i].rating)) {
            counter += 1;
          }
        }
        setListLength(counter);
      };
      getReviewLength();
    }
  }, [reviews, filter]);

  return (
    <div className="review-tracker-main">
      <div
        className="review-tracker-bar-container"
        onClick={() => toggleRating(5)}
        onKeyPress={() => toggleRating(5)}
        role="button"
        tabIndex="0"
      >
        <p className="rvw-txt">5 star</p>
        <TrackerBar progress={percentages[5]} />
        <p className="rvw-txt-num">{numReviews[5] ? numReviews[5] : null}</p>
      </div>
      <div
        className="review-tracker-bar-container"
        onClick={() => toggleRating(4)}
        onKeyPress={() => toggleRating(4)}
        role="button"
        tabIndex="0"
      >
        <p className="rvw-txt">4 star</p>
        <TrackerBar progress={percentages[4]} />
        <p className="rvw-txt-num">{numReviews[4] ? numReviews[4] : null}</p>
      </div>
      <div
        className="review-tracker-bar-container"
        onClick={() => toggleRating(3)}
        onKeyPress={() => toggleRating(3)}
        role="button"
        tabIndex="0"
      >
        <p className="rvw-txt">3 star</p>
        <TrackerBar progress={percentages[3]} />
        <p className="rvw-txt-num">{numReviews[3] ? numReviews[3] : null}</p>
      </div>
      <div
        className="review-tracker-bar-container"
        onClick={() => toggleRating(2)}
        onKeyPress={() => toggleRating(2)}
        role="button"
        tabIndex="0"
      >
        <p className="rvw-txt">2 star</p>
        <TrackerBar progress={percentages[2]} />
        <p className="rvw-txt-num">{numReviews[2] ? numReviews[2] : null}</p>
      </div>
      <div
        className="review-tracker-bar-container"
        onClick={() => toggleRating(1)}
        onKeyPress={() => toggleRating(1)}
        role="button"
        tabIndex="0"
      >
        <p className="rvw-txt">1 star</p>
        <TrackerBar progress={percentages[1]} />
        <p className="rvw-txt-num">{numReviews[1] ? numReviews[1] : null}</p>
      </div>
    </div>
  );
}
