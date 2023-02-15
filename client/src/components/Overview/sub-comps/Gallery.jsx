import React, { useState } from 'react';
import { AiOutlineDoubleRight, AiOutlineExpand } from 'react-icons/ai';
import GalleryThumbnails from './GalleryThumbnails.jsx';
import HeroModal from './HeroModal.jsx';

export default function Gallery({
  images,
  heroImage,
  setHero,
  rightBtn,
  leftBtn,
  btnRenderCheck,
}) {
  // STATE DATA //
  const [heroModal, setHeroModal] = useState(false);

  // HELPER FUNCTION //
  const toggleThumbSelect = (event) => {
    let { id } = event.target;
    id = id.slice(0, id.length - 1);
    const oldSelect = document.getElementsByClassName('selected')[0];
    const newSelect = document.getElementById(`${id}a`).parentNode;
    oldSelect.className = 'slide';
    newSelect.className = 'selected';
    newSelect.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    btnRenderCheck();
  };

  // EVENT HANDLERS //
  const toggleHero = (event) => {
    const index = Number(event.target.id.slice(0, 1));
    setHero({
      url: images[index].url,
      index,
    });
  };

  const toggleHeroLeft = () => {
    const index = Number(heroImage.index);
    if (index > 0) {
      setHero({
        url: images[index - 1].url,
        index: index - 1,
      });
    }
    const oldSelect = document.getElementsByClassName('selected')[0];
    const prevThumb = oldSelect.previousSibling;
    if (prevThumb) {
      oldSelect.className = 'slide';
      prevThumb.className = 'selected';
      btnRenderCheck();
    }
    prevThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const toggleHeroRight = () => {
    const index = Number(heroImage.index);
    if (index < images.length - 1) {
      setHero({
        url: images[index + 1].url,
        index: index + 1,
      });
    }
    const oldSelect = document.getElementsByClassName('selected')[0];
    const nextThumb = oldSelect.nextSibling;
    if (nextThumb) {
      oldSelect.className = 'slide';
      nextThumb.className = 'selected';
      btnRenderCheck();
    }
    nextThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  return (
    <div id="gallery">
      <GalleryThumbnails
        images={images}
        toggleHero={toggleHero}
        toggleThumbSelect={toggleThumbSelect}
      />
      <div className="hero-image-container">
        <button
          className={`scroll-hero-left ${!leftBtn ? 'btn-hidden' : ''}`}
          type="button"
          onClick={toggleHeroLeft}
        >
          <AiOutlineDoubleRight size="2em" />
        </button>
        {heroImage.url
          ? (
            /* eslint-disable */ // Reason: Image is meant to be interactive.
            <img
              className="hero-image"
              src={heroImage.url}
              onClick={() => setHeroModal(true)}
              onKeyPress={() => setHeroModal(true)}
              alt="product hero"
              tabIndex={0}
            />
            /* eslint-enable */
          )
          : null}
        <button
          className="expand-hero"
          type="button"
        >
          <AiOutlineExpand size="1.5em" onClick={() => setHeroModal(true)} />
        </button>
        <button
          onClick={toggleHeroRight}
          className={`scroll-hero-right ${!rightBtn ? 'btn-hidden' : ''}`}
          type="button"
        >

          <AiOutlineDoubleRight size="2em" />
        </button>
      </div>
      <HeroModal
        heroModal={heroModal}
        setHeroModal={setHeroModal}
        heroImage={heroImage}
        setHero={setHero}
        images={images}
        leftBtn={leftBtn}
        rightBtn={rightBtn}
        toggleHeroLeft={toggleHeroLeft}
        toggleHeroRight={toggleHeroRight}
        toggleThumbSelect={toggleThumbSelect}
        toggleHero={toggleHero}
      />
    </div>
  );
}
