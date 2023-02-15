import React from 'react';
import { AiOutlineStar, AiTwotoneStar } from 'react-icons/ai';
import './StarRating.css';

export default function StarRating({ ratingPercentage }) {
  return (
    <div className="outer-star">
      <AiOutlineStar />
      <AiOutlineStar />
      <AiOutlineStar />
      <AiOutlineStar />
      <AiOutlineStar />
      <div className="inner-star" style={{ width: ratingPercentage }}>
        <AiTwotoneStar />
        <AiTwotoneStar />
        <AiTwotoneStar />
        <AiTwotoneStar />
        <AiTwotoneStar />
      </div>
    </div>
  );
}
