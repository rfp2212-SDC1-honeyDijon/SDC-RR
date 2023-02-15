import React, { useState, useEffect } from 'react';
import { GoTriangleDown } from 'react-icons/go';

export default function CharacteristicBar({ reviewMeta, charName }) {
  // STATE DATA //
  const [chars, setChars] = useState({});
  const [sliderText, setSliderText] = useState({ small: '', perf: '', big: '' });

  // HELPER FUNCTIONS //
  function ratingDescription() {
    if (charName === 'Size') {
      setSliderText({ small: 'tight', perf: 'perfect!', big: 'baggy' });
    } else if (charName === 'Width') {
      setSliderText({ small: 'small', perf: 'perfect!', big: 'loose' });
    } else if (charName === 'Comfort') {
      setSliderText({ small: 'can\'t breathe', perf: 'perfect!', big: 'like a tent' });
    } else if (charName === 'Quality') {
      setSliderText({ small: 'cheap', perf: 'perfect!', big: 'delicate' });
    } else if (charName === 'Fit') {
      setSliderText({ small: 'small', perf: 'perfect!', big: 'large' });
    } else if (charName === 'Length') {
      setSliderText({ small: 'too long', perf: 'perfect!', big: 'too short' });
    }
  }

  // INITIALIZATION //
  useEffect(() => {
    setChars(reviewMeta);
    ratingDescription();
  }, [reviewMeta]);

  return (
    <div className="review-slide-container">
      <div className="review-slider">
        <div style={{ width: chars ? `${(((chars - 1) / 4) * 100).toString()}%` : '0%' }} className="progress">
          <GoTriangleDown size="2em" className="rvw-pointer" />
        </div>
      </div>
      <div className="reivew-slider-label-container">
        <p className="review-slider-label-1">{sliderText.small}</p>
        <p className="review-slider-label-2">{sliderText.perf}</p>
        <p className="review-slider-label-3">{sliderText.big}</p>
      </div>
    </div>
  );
}
