import React, { useState, useEffect } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import fetcher from '../../../fetchers';

export default function RelevanceDropdown({
  setReviews, reviews, listLength, reviewRenderer, setSortString, sortString, feature,
}) {
  // STATE DATA //
  const [display, setDisplay] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // EVENT HANDLERS //
  const handleClick = () => {
    if (showDropdown) setShowDropdown(false);
    else setShowDropdown(true);
  };

  const handleClose = (e) => {
    if (e.target.className !== 'review-close-dropdown') {
      setShowDropdown(false);
    }
  };

  // SORT HELPER FUNCTIONS //
  const handleNew = () => {
    fetcher.getReviews(feature.id, 'newest')
      .then(({ data }) => setReviews(data.results))
      .catch((err) => console.error(err));
    setShowDropdown(false);
    setSortString('newest');
  };

  const handleHelpful = () => {
    fetcher.getReviews(feature.id, 'helpful')
      .then(({ data }) => setReviews(data.results))
      .catch((err) => console.error(err));
    setShowDropdown(false);
    setSortString('helpful');
  };

  const handleRelevant = () => {
    fetcher.getReviews(feature.id, 'relevant')
      .then(({ data }) => setReviews(data.results))
      .catch((err) => console.error(err));
    setShowDropdown(false);
    setSortString('relevant');
  };

  // INITIALIZATION //
  useEffect(() => {
    if (reviews) {
      setDisplay(true);
      reviewRenderer(reviews);
    }
    document.addEventListener('click', handleClose);
  }, [reviews, listLength, sortString]);

  return (
    <div className="review-sort-dropdown-main">
      {display
        ? (
          <div className="review-sort-title">
            <h3>
              {`${reviews.length} reviews sorted by`}
            </h3>
            <p
              onClick={handleClick}
              onKeyPress={handleClick}
              tabIndex="0"
              className="review-close-dropdown"
            >
              {sortString}
              <AiOutlineDown className="review-close-icon" />
            </p>

            {showDropdown && (
            <div className="review-sort-dropdown-child">
              { sortString !== 'recency'
                ? (
                  <li
                    className="review-li"
                    onClick={() => handleNew()}
                    onKeyPress={() => handleNew()}
                    tabIndex="0"
                  >
                    recency
                  </li>
                )
                : null }
              { sortString !== 'helpfulness'
                ? (
                  <li
                    className="review-li"
                    onClick={() => handleHelpful()}
                    onKeyPress={() => handleHelpful()}
                    tabIndex="0"
                  >
                    helpfulness
                  </li>
                )
                : null }
              { sortString !== 'relevance'
                ? (
                  <li
                    className="review-li"
                    onClick={() => handleRelevant()}
                    onKeyPress={() => handleRelevant()}
                    tabIndex="0"
                  >
                    relevance
                  </li>
                )
                : null }
            </div>
            )}
          </div>
        )
        : null}
    </div>
  );
}
