import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import './StarRating.css';

export default function ReviewStarRating({ ratingPercentage }) {
  return (
    <div className="outer-star">
      <FaRegStar />
      <FaRegStar />
      <FaRegStar />
      <FaRegStar />
      <FaRegStar />
      <div className="inner-star" style={{ width: ratingPercentage }}>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>
    </div>
  );
}
