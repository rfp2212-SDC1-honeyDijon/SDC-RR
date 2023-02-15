import React, { useState, useEffect } from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';

export default function GalleryThumbnails({
  images,
  toggleHero,
  toggleThumbSelect,
}) {
  // HELPER FUNCTIONS //
  const imageMapper = (img, index) => (
    <div className={!index ? 'selected' : 'slide'} key={img.key} onClick={toggleHero}>
      <img
        id={`${index}a`}
        src={img.url}
        alt="a thumbnail"
        className="side-thumb"
        onClick={(e) => toggleThumbSelect(e)}
      />
    </div>
  );

  return (
    <div id="slider">
      {images
        ? images.map((image, index) => imageMapper(image, index))
        : null}
    </div>
  );
}
