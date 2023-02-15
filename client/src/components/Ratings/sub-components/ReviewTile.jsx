import React, { useState, useEffect } from 'react';
import { AiFillCheckSquare } from 'react-icons/ai';
import { BsFillHandThumbsUpFill } from 'react-icons/bs';
import ReviewImageModal from './ReviewImageModal.jsx';
import fetcher from '../../../fetchers';
import StarRating from '../../shared/StarRating/StarRating.jsx';
import ReviewStarRating from '../../shared/StarRating/ReviewStarRating.jsx';

export default function ReviewTile({
  review, setReviews, reviews, feature, searchTerm, sortString, setSortString,
}) {
  // STATE DATA //
  const [modalToggle, setModalToggle] = useState(false);
  const [imgString, setImgString] = useState('');
  const [showFull, setShowFull] = useState(false);
  const [helpfulClick, setHelpfulClick] = useState(false);

  // EVENT HANDLERS //
  const imgToggler = (pic) => {
    setModalToggle(!modalToggle);
    setImgString(pic);
  };

  // HELPER FUNCTIIONS //
  const getDateString = (dateString) => {
    const date = new Date(dateString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${monthName} ${day}, ${year}`;
  };

  // Creates name and Date string for each tile.
  const nameAndDate = `${getDateString(review.date)}, ${review.reviewer_name}`;

  // Highlights text that matches the searchTerm, set by ReviewSearchBar.jsx
  const highlightHandler = (text, fn) => {
    if (searchTerm.length < 3) return fn ? fn() : text;
    if (text.toLowerCase().includes(searchTerm.toLowerCase()) === false) return fn ? fn() : text;
    const regex = new RegExp(searchTerm, 'gi');
    const parts = text.match(regex);
    const beforeParts = text.slice(0, text.search(regex));
    const restOfText = text.slice(text.search(regex) + parts.join('').length);
    return (
      <span>
        {beforeParts}
        {parts.map((part, i) => (
          part.toLowerCase() === searchTerm.toLowerCase()
            ? <span className="review-search-highlight" key={`${i + 1}_${part}`}>{part}</span>
            : part
        ))}
        {restOfText}
      </span>
    );
  };

  // handles review summary
  const summaryLengthChecker = () => {
    if (review.summary.length > 60) {
      return `${review.summary.substring(0, 60)} ...`;
    }
    return review.summary;
  };

  // elipses function that works with bodyLengthChecker
  const elipsesSpan = () => (
    <span
      className="review-elipses-span"
      onClick={() => setShowFull(true)}
      onKeyPress={() => setShowFull(true)}
      role="button"
      tabIndex="0"
    >
      {showFull ? review.body : '...'}
    </span>
  );

  // Handles review body with truncation if neccessary
  const bodyLengthChecker = () => {
    if (review.body.length > 250) {
      return `${review.body.substring(0, 250)}`;
    }
    return review.body;
  };

  // Creates thumbnails with on-click functionality
  const photoHandler = () => {
    if (review.photos.length > 0) {
      const photoAltTxt = `Image for review titled ${review.summary}`;
      return review.photos.map((element) => (
        <input
          type="image"
          src={element.url}
          alt={photoAltTxt}
          key={element.id}
          className="review-tile-individual-photo"
          onClick={() => imgToggler(element.url)}
          onKeyPress={() => imgToggler(element.url)}
          tabIndex="0"
        />
      ));
    }
    return null;
  };

  // Rounds star rating to 5 intervals on a 1-100 scale
  const roundedPercentage = (rounder, num) => {
    const roundsByFive = (num + ((((rounder - num) % rounder)) % rounder));
    const result = (roundsByFive / 5) * 100;
    return result;
  };

  // HTTP REQUEST HANDLERS //
  const helpfulHandler = () => {
    fetcher.updateUseful(review.review_id)
      .then(() => fetcher.getReviews(feature.id, sortString))
      .then(({ data }) => setReviews(data.results))
      .then(() => setHelpfulClick(true))
      .catch((error) => console.error('Error updating helpful in reviewtile: ', error));
  };

  const reportHandler = () => {
    fetcher.updateReport(review.review_id)
      .then(() => fetcher.getReviews(feature.id, sortString))
      .then(({ data }) => setReviews(data.results))
      .then(() => setHelpfulClick(true))
      .catch((error) => console.error('Error updating reported in reviewtile: ', error));
  };

  // INITIALIZATION // Consider Refactor
  useEffect(() => {
    if (review.body.length < 250) {
      setShowFull(true);
    }

    roundedPercentage(0.25, review.rating);
  }, [review, review.helpfulness, reviews]);

  return (
    <div className="review-tile-main-container">
      <div className="review-tile-container-1">
        <div className="rvw-title-container">
          <p className="review-tile-summary">{highlightHandler(review.summary, summaryLengthChecker)}</p>
          <div className="review-tile-stars">
            <ReviewStarRating ratingPercentage={`${roundedPercentage(0.25, review.rating)}%`} />
          </div>
        </div>
        <p className="review-tile-nameAndDate">{highlightHandler(nameAndDate, null)}</p>
      </div>
      <p className="review-tile-recommendation">
        {review.recommend ? <AiFillCheckSquare className="rvw-chk" /> : null}
        {' '}
        {review.recommend ? <span className="review-tile-recommendation-status">I Recommend This </span> : null}
      </p>
      <p className="review-tile-body">
        {highlightHandler(review.body, bodyLengthChecker)}
        {showFull ? review.body.substring(250) : elipsesSpan()}
      </p>
      <p className="review-tile-response">
        { review.response
          ? `Response from seller: ${review.response}`
          : null }
      </p>
      <div className="review-tile-photos-container">{photoHandler()}</div>
      <div className="review-tile-container-2">
        <button
          className="review-tile-helpful"
          onClick={() => (!helpfulClick ? helpfulHandler() : null)}
          onKeyPress={() => (!helpfulClick ? helpfulHandler() : null)}
          type="button"
        >
          {
            helpfulClick ? <BsFillHandThumbsUpFill size=".9em" style={{ color: '#E60023' }} className="help-thmb" /> : null
          }
          Helpful

          {' '}
          <span className="review-helpful-span">
            {
                review.helpfulness
            }
          </span>
        </button>
        <div className="rvw-btn-brk" />
        <button
          className="review-tile-report"
          onClick={() => (!helpfulClick ? reportHandler() : null)}
          onKeyPress={() => (!helpfulClick ? reportHandler() : null)}
          type="button"
        >
          <span className="report">Report</span>
        </button>
        <ReviewImageModal
          modalToggle={modalToggle}
          imgString={imgString}
          setModalToggle={setModalToggle}
          name={review.reviewer_name}
        />
      </div>
    </div>
  );
}
