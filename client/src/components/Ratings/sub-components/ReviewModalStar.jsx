import React from 'react';
import { FaStar } from 'react-icons/fa';

export default function ReviewModalStar({
  filled, onClick, onMouseEnter, onMouseLeave,
}) {
  return (
    <FaStar
      color={filled ? '#E60023' : 'lightgray'}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="rvw-modal-single-star"
      size="2em"
    />
  );
}
