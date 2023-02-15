import React, { useState, useEffect } from 'react';

export default function ActiveFilters({ filter, setSelectedRating, setFilter }) {
  // STATE DATA //
  const [filterStrings, setFilterStrings] = useState();

  // HELPER FUNCTIONS //
  function filterJoiner(string) {
    return string.join('').slice(2);
  }

  function handleFilterStrings() {
    const newFilterStrings = [];
    Object.keys(filter).forEach((key) => {
      newFilterStrings.push(`, ${key} star`);
    });
    setFilterStrings(filterJoiner(newFilterStrings));
  }

  // EVENT HANDLERS //
  function filterReset() {
    setFilter({});
    setFilterStrings([]);
    setSelectedRating(null);
    setFilterStrings(null);
  }

  // INITIALIZATION //
  useEffect(() => {
    if (filter) {
      handleFilterStrings();
    }
  }, [filter]);

  return (
    <div className="review-active-filter-container">
      <p className="filter-par-strings">
        { filterStrings
          ? `Filtered By: ${filterStrings}`
          : null }

      </p>
      { Object.keys(filter).length
        ? <button type="button" className="filter-btn" onClick={() => filterReset()}>Reset Filters</button>
        : null }
    </div>
  );
}
