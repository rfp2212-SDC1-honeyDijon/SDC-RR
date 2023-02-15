import React from 'react';

export default function TrackerBar({ progress }) {
  return (
    <div className="review-tracker-bar-parent">
      <div className="review-tracker-bar-child" style={{ width: `${progress}%` }} />
    </div>

  );
}
