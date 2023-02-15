import React, { useState, useEffect } from 'react';
import StarRating from '../../shared/StarRating/StarRating.jsx';

export default function ProdInfo({ product, currStyle, reviews }) {
  // STATE DATA //
  const [price, setPrice] = useState(null);
  const [sale, setSale] = useState(null);

  // HELPER FUNCTIONS //
  const starAverager = (reviewData) => {
    let total = 0;
    reviewData.forEach((review) => {
      total += review.rating;
    });
    total /= reviews.length;
    total = (Math.round(total * 4) / 4).toFixed(2);
    return `${total * 20}%`;
  };

  const toggleStrike = () => { // refactor this later -----------------
    const target = document.getElementById('price');
    if (target) {
      if (sale) {
        if (!target.className.includes('strike')) {
          target.className = 'prod-price strike';
        }
      } else {
        target.className = 'prod-price';
      }
    }
  };

  // INITIALIZATION //
  useEffect(() => {
    toggleStrike();
  }, [sale]);

  useEffect(() => {
    if (currStyle) {
      if (currStyle.sale_price) {
        setSale(currStyle.sale_price.slice(0, currStyle.sale_price.length - 3));
      } else {
        setSale(null);
      }
      setPrice(currStyle.original_price.slice(0, currStyle.original_price.length - 3));
    }
  }, [currStyle]);

  return (
    <div id="prod-info">
      <div className="reviews-stars">
        <h3 className="stars">
          {reviews
            ? <StarRating ratingPercentage={starAverager(reviews)} className="star-icons" />
            : null}
        </h3>
        <a className="gray-text reviews-link" href="#ratings-widget">Read all reviews</a>
      </div>
      {product
        ? (
          <>
            <h3 className="gray-text category">{product.category}</h3>
            <h1 className="prod-title">{product.name}</h1>
          </>
        )
        : null}
      <div className="price-holder">
        {price
          ? (
            <h3 id="price" className="prod-price">
              $
              {price}
            </h3>
          )
          : null}
        {sale
          ? (
            <h3 className="sale-price">
              SALE:
              {' '}
              $
              {sale}
            </h3>
          )
          : null}
      </div>
    </div>
  );
}
