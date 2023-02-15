import React, { useState, useEffect } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import axios from 'axios';
import fetcher from '../../../fetchers';
import CompareModal from './CompareModal.jsx';
import StarRating from '../../shared/StarRating/StarRating.jsx';
import ImageCarousel from './ImageCarousel.jsx';
import imgUnavailable from '../assets/imgUnavailable.png';
import './styles/related.css';

export default function RelatedProduct({
  feature, featureMeta, setFeatureProduct, relProd, index,
}) {
  const [relStyle, setRelStyle] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const [relProdMeta, setRelProdMeta] = useState(0);

  useEffect(() => {
    axios.all([
      fetcher.getProductStyle(relProd.id),
      fetcher.getReviewMeta(relProd.id),
    ])
      .then(axios.spread((...data) => {
        setRelStyle(data[0].data.results[0]);
        setRelProdMeta(data[1].data);
      }))
      .catch((err) => console.error(err));
  }, [feature.id, relProd.id]);

  if (!relStyle) {
    return <div />;
  }

  let actualPts = 0;
  let totalPts = 0;
  const metaKeyArray = Object.keys(relProdMeta.ratings);
  for (let i = 0; i < metaKeyArray.length; i += 1) {
    actualPts += Number(metaKeyArray[i]) * Number(relProdMeta.ratings[metaKeyArray[i]]);
    totalPts += 5 * Number(relProdMeta.ratings[metaKeyArray[i]]);
  }
  const ratingPercentage = Math.floor((actualPts / totalPts) * 100).toString();

  const changeProduct = () => {
    setFeatureProduct(relProd);
    window.location.href = `${window.location.origin}/?pid=${relProd.id}`;
  };

  return (
    <div id={`relatedProduct${index}`} className="rel-prod-wrapper">
      <div className="rel-item">
        <div className="rel-img-wrapper" onMouseLeave={() => setShowImg(false)}>
          {// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <img
              className="rel-img"
              src={relStyle.photos[0].url || imgUnavailable}
              alt="Not Available"
              onMouseEnter={() => setShowImg(true)}
              onKeyDown={() => changeProduct()}
              onClick={() => changeProduct()}
            />
          }
          {showImg
            && (
              <ImageCarousel
                relStyle={relStyle}
                setRelStyle={setRelStyle}
              />
            )}
        </div>
        <div className="rel-card-text">
          <h3 className="rel-category rel-text">{relProd.category}</h3>
          <h3 className="rel-name rel-text">{relProd.name}</h3>
          <div className="rel-stars">
            <StarRating ratingPercentage={`${ratingPercentage}%`} />
          </div>
          <p className="rel-orig-price rel-text">
            {`$${relStyle.original_price}`}
            {relStyle.sale_price
              ? <span className="card-sale">{`${relStyle.sale_price}`}</span>
              : null}
          </p>
          <button className="compare" onClick={() => setShowModal(true)} type="button">Compare</button>
        </div>
      </div>
      {showModal
        && (
          <div className="overlay">
            <CompareModal
              setShowModal={setShowModal}
              feature={feature}
              relProd={relProd}
              featureMeta={featureMeta}
              relProdMeta={relProdMeta}
            />
          </div>
        )}
    </div>
  );
}
