import React from 'react';
import { BsSearch } from 'react-icons/bs';

export default function ReviewSearchBar({
  searchTerm, setSearchTerm,
}) {
  // EVENT HANDLERS //
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const animationHandler = () => {
    document.querySelector('.search-button').classList.add('hidden');
    document.querySelector('.search-container').classList.add('active');
  };

  return (
    <form className="review-search-container" onFocus={() => document.querySelector('.search-button').classList.add('hidden')} onBlur={() => document.querySelector('.search-button').classList.remove('hidden')}>
      <div className="search-container" onFocus={() => animationHandler()} onBlur={() => document.querySelector('.search-container').classList.remove('active')}>
        <button className="search-button" type="button">
          <BsSearch />
        </button>
        <input
          className="search-input"
          type="text"
          placeholder="Search Reviews…"
          value={searchTerm}
          onChange={handleInputChange}
          onMouseEnter={() => document.querySelector('.search-button').classList.add('hidden')}
          onMouseLeave={() => document.querySelector('.search-button').classList.remove('hidden')}
          onBlur={() => document.querySelector('.search-button').classList.remove('hidden')}
        />
      </div>
    </form>
  );
}
