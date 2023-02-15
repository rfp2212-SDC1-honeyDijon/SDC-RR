import React from 'react';

export default function ModalCharRadioBtns({
  reviewMeta, setChars, characteristics, handleRequiredChars,
}) {
  // EVENT HANDLERS //
  const setCharacteristicHandler = (char, val) => {
    const key = reviewMeta.characteristics[char].id;
    const newChar = {};
    Object.assign(newChar, characteristics);
    newChar[key] = val;
    setChars(newChar);
    document.querySelector(`.review-asterisk-radiobtns-${char}`).classList.remove('red');
  };

  // HELPER FUNCTIONS //
  const characteristicMapper = (x) => {
    if (x === 'Size') {
      return ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too big'];
    }
    if (x === 'Width') {
      return ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'];
    }
    if (x === 'Fit') {
      return ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs too long'];
    }
    if (x === 'Length') {
      return ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'];
    }
    if (x === 'Comfort') {
      return ['Uncomfortable', 'Slightly uncomfortable', 'OK', 'Comfortable', 'Perfect'];
    }
    if (x === 'Quality') {
      return ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'];
    }
    return null;
  };

  const RadioButtonRow = () => Object.keys(reviewMeta.characteristics).map((characteristic) => (
    <div className="modal-char-col" key={`${characteristic}a`}>
      <p className="radio-row-title">
        {characteristic}
        <span className={`review-asterisk-radiobtns-${characteristic}`}>*</span>
      </p>
      <div className="modal-char-row" onBlur={() => handleRequiredChars(characteristic)}>
        {[1, 2, 3, 4, 5].map((number) => (
          <div className="review-characteristics-modal-container" key={`${number}a`}>
            <input
              type="radio"
              name={characteristic}
              value={number}
              onChange={() => setCharacteristicHandler(characteristic, number)}
              id={number + characteristic}
              className="modal-char-radio"
            />
            <label className="write-review-modal-label" htmlFor={number + characteristic}>
              {characteristicMapper(characteristic)[number - 1]}
            </label>
          </div>
        ))}
      </div>
    </div>
  ));

  return (
    <div className="modal-chars">
      {RadioButtonRow()}
    </div>
  );
}
