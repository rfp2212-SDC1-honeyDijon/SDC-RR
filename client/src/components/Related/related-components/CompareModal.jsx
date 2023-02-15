/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import StarRating from '../../shared/StarRating/StarRating.jsx';
import './styles/related.css';

export default function CompareModal({
  setShowModal, featureMeta, relProdMeta, feature, relProd,
}) {
  if (featureMeta && relProdMeta) {
    const feaChars = Object.keys(featureMeta.characteristics);
    const relChars = Object.keys(relProdMeta.characteristics);
    const allChars = Array.from(new Set(feaChars.concat(relChars)));

    const closeModal = () => {
      document.querySelector('.compare-modal').classList.add('hide-modal');
      setTimeout(() => {
        setShowModal(false);
      }, 200);
    };

    return (
      <div className="compare-modal">
        <button className="compare-close" type="button" onClick={closeModal}>
          <AiOutlineClose size="1.5em" />
        </button>
        <div className="modal-title">
          <div className="modal-top-left">
            <h1 className="compare-th">{feature.name}</h1>
          </div>
          <div className="modal-mid" />
          <div className="modal-top-right">
            <h1 className="compare-th">{relProd.name}</h1>
          </div>
        </div>
        <div id="compare-body">
          {allChars.map((char, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className={index === allChars.length - 1 ? 'last' : 'compare-row'} key={index}>
              {featureMeta.characteristics[char]
                ? (
                  <div className="left-stars">
                    <StarRating
                      ratingPercentage={
                        `${(Math.floor(Number(featureMeta.characteristics[char].value) * 100) / 5)
                          .toString()}%`
                      }
                    />
                  </div>
                )
                : <div className="placeholder" />}
              <p className="compare-stat">{char}</p>
              {relProdMeta.characteristics[char]
                ? (
                  <div className="right-stars">
                    <StarRating
                      ratingPercentage={
                        `${(Math.floor(Number(relProdMeta.characteristics[char].value) * 100) / 5)
                          .toString()}%`

                      }
                    />
                  </div>
                )
                : <div className="placeholder" />}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
