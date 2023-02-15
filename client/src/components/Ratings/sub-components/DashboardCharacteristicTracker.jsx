import React, { useState, useEffect } from 'react';
import CharacteristicBar from './CharacteristicBar.jsx';

export default function CharacteristicTracker({ reviewMeta }) {
  // STATE DATA //
  const [components, setComponents] = useState(false);

  // HELPER FUNCTIONS //
  const renderSlider = () => Object.keys(reviewMeta.characteristics).map((key) => {
    const keyVal = reviewMeta.characteristics[key].id;
    return (
      <div className="characteristic-parent" key={keyVal}>
        <p>{key}</p>
        <CharacteristicBar reviewMeta={reviewMeta.characteristics[key].value} charName={key} />
      </div>
    );
  });

  // INITIALIZATION //
  useEffect(() => {
    if (reviewMeta) {
      setComponents(true);
    }
  }, [reviewMeta]);

  return (
    <div className="characteristic-container">
      { components
        ? renderSlider()
        : null}
    </div>
  );
}
