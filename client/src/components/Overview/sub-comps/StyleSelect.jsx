import React from 'react';
import StyleThumbnails from './StyleThumbnails.jsx';

export default function StyleSelect({
  styles,
  currStyle,
  setCurrStyle,
  setHero,
  setRightBtn,
  setLeftBtn,
  setShowSku,
  setQuantity,
}) {
  // HELPER FUNCTIONS //
  const updateGalleryBtns = (index, images) => {
    const leftBtn = document.getElementsByClassName('scroll-hero-left')[0];
    const rightBtn = document.getElementsByClassName('scroll-hero-right')[0];
    if (index === images.length - 1) {
      setRightBtn(false);
      rightBtn.className = 'scroll-hero-right btn-hidden';
    }
    if (!index) {
      setLeftBtn(false);
      leftBtn.className = 'scroll-hero-left btn-hidden';
    }
  };

  const toggleCheck = (newCheckId) => {
    const oldCheckWrap = document.getElementById(currStyle.style_id).parentElement;
    const newCheckWrap = document.getElementById(newCheckId).parentElement;
    oldCheckWrap.className = 'check-wrapper';
    newCheckWrap.className = 'checked';
  };

  const heroImageChanger = (images) => {
    const selected = document.getElementsByClassName('selected')[0];
    if (selected) {
      let index = Number(selected.childNodes[0].id.slice(0, 1));
      if (index >= images.length) {
        index = images.length - 1;
        const newSelect = document.getElementById(`${index}a`).parentNode;
        newSelect.className = 'selected';
      }
      setHero({
        url: images[index].url,
        index,
      });
      updateGalleryBtns(index, images);
    }
  };

  // EVENT HANDLERS //
  const toggleStyle = (event) => {
    const { id } = event.target;
    if (currStyle.style_id === Number(id)) {
      return;
    }
    toggleCheck(id);
    styles.results.forEach((style) => {
      if (style.style_id === Number(id)) {
        setCurrStyle(style);
        heroImageChanger(style.photos);
      }
    });
    setShowSku('');
    setQuantity('');
  };

  return (
    <div id="style-select">
      <h3 className="style-pointer">
        STYLE &gt;
        {' '}
        {currStyle
          ? <span className="selected-style">{currStyle.name}</span>
          : null}
      </h3>
      <StyleThumbnails styles={styles} toggleStyle={toggleStyle} />
    </div>
  );
}
