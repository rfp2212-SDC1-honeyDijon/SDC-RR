import React, { useState, useEffect } from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';

export default function StyleThumbnails({ styles, toggleStyle }) {
  // STATE DATA //
  const [thumbRows, setThumbRows] = useState([]);

  // HELPER FUNCTIONS //
  const thumbRowSorter = (styleInfo) => {
    const rows = [[]];
    let index = 0;
    styleInfo.forEach((style) => {
      if (rows[index].length === 4) {
        index += 1;
        rows[index] = [];
        rows[index].push(style);
      } else {
        rows[index].push(style);
      }
    });
    setThumbRows(rows);
  };

  const thumbRowMapper = (thumbs, rowIdx) => (
    <div className="thumb-row" key={thumbs[0].name}>
      {thumbs.map((thumb, index) => {
        const src = thumb.photos[0].thumbnail_url;
        return (
          <div className={!rowIdx && !index ? 'checked' : 'check-wrapper'} key={thumb.style_id}>
            <BsFillCheckCircleFill className="check-mark" size="1.25em" />
            <img
              id={thumb.style_id}
              className="style-thumbnail"
              src={src}
              onClick={toggleStyle}
              onKeyPress={toggleStyle}
              alt={`${thumb.name} style thumbnail.`}
              tabIndex={0}
            />
          </div>
        );
      })}
    </div>
  );

  // INITIALIZATION //
  useEffect(() => {
    if (styles) {
      thumbRowSorter(styles.results);
    }
  }, [styles]);

  return (
    <div className="thumbs-container">
      {thumbRows.length
        ? thumbRows.map((row, index) => thumbRowMapper(row, index))
        : null}
    </div>
  );
}
