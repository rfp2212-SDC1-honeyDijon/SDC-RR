import React, { useState } from 'react';
import ReviewModalStar from './ReviewModalStar.jsx';

export default function WriteReviewStarRating({ onChange }) {
  // STATE DATA //
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  // HELPER FUNCTIONS //
  const changeRating = (newRating) => {
    setRating(newRating);
    onChange(newRating);
  };

  return (
    <span className="rvw-modal-stars">
      {[1, 2, 3, 4, 5].map((_, index) => (
        <ReviewModalStar
          key={Math.random()}
          filled={index < (rating || hover)}
          className={index <= (hover || rating) ? 'write-on' : 'write-off'}
          onClick={() => changeRating(index + 1)}
          onMouseEnter={() => setHover(index + 1)}
          onMouseLeave={() => setHover(rating)}
        />
      ))}
      <span className="review-asterisk-stars">*</span>
    </span>
  );
}
