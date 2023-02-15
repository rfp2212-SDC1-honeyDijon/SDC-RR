import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillCloseSquare } from 'react-icons/ai';
import fetcher from '../../../fetchers';
import StarRating from '../../shared/StarRating/StarRating.jsx';
import imgUnavailable from '../assets/imgUnavailable.png';
import './styles/outfitList.css';

export default function OutfitProduct({
  outfitId, outfitIdList, setOutfitIdList, setFeatureProduct, index,
}) {
  const [outfitProd, setOutfitProd] = useState();
  const [outfitStyle, setOutfitStyle] = useState();
  const [outfitMeta, setOutfitMeta] = useState();

  const handleDelete = () => {
    setOutfitIdList([...outfitIdList].filter((id) => id !== outfitId));
  };

  useEffect(() => {
    axios.all([
      fetcher.getProductStyle(outfitId),
      fetcher.getProductById(outfitId),
      fetcher.getReviewMeta(outfitId),
    ])
      .then(axios.spread((...data) => {
        setOutfitStyle(data[0].data.results[0]);
        setOutfitProd(data[1].data);
        setOutfitMeta(data[2].data);
      }))
      .catch((err) => console.error(err));
  }, [outfitId]);

  if (!outfitStyle) {
    return <div />;
  }

  let actualPts = 0;
  let totalPts = 0;
  const metaKeyArray = Object.keys(outfitMeta.ratings);
  for (let i = 0; i < metaKeyArray.length; i += 1) {
    actualPts += Number(metaKeyArray[i]) * Number(outfitMeta.ratings[metaKeyArray[i]]);
    totalPts += 5 * Number(outfitMeta.ratings[metaKeyArray[i]]);
  }
  const ratingPercentage = Math.floor((actualPts / totalPts) * 100).toString();

  return (
    <div id={`outfitProduct${index}`} className="outfit-item">
      <div className="rel-item">
        <div className="outfit-img-wrapper">
          {// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <img
              className="outfit-img"
              src={outfitStyle.photos[0].thumbnail_url || imgUnavailable}
              alt={outfitProd.description}
              onKeyDown={() => setFeatureProduct(outfitProd)}
              onClick={() => setFeatureProduct(outfitProd)}
            />
          }
        </div>
        <div className="outfit-card-text">
          <h3 className="outfit-category rel-text">{outfitProd.category}</h3>
          <h3 className="outfit-name rel-text">{outfitProd.name}</h3>
          <div className="rel-stars">
            <StarRating ratingPercentage={`${ratingPercentage}%`} />
          </div>
          <p className="outfit-orig-price rel-text">
            {`$${outfitStyle.original_price}`}
            {outfitStyle.sale_price
              ? <span className="outfit-sale-price">{`${outfitStyle.sale_price}`}</span>
              : null}
          </p>
          <button className="remove-card" onClick={handleDelete} type="button">Remove</button>
        </div>
      </div>
    </div>
  );
}
