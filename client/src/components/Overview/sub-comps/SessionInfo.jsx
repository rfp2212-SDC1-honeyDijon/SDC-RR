import React, { useState, useEffect } from 'react';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { TbHeart } from 'react-icons/tb';

export default function SessionInfo({
  cart,
  wishlist,
}) {
  const [numCart, setNumCart] = useState(0);
  const [numWish, setNumWish] = useState(0);

  useEffect(() => {
    setNumCart(
      Object.values(cart).reduce((acc, sku) => acc + sku.quantity, 0),
    );
  }, [cart]);

  useEffect(() => {
    setNumWish(Object.values(wishlist).length);
  }, [wishlist]);

  return (
    <div id="session-info">
      <div className="session-btn-container">
        <TbHeart
          id="wishlist-icon"
          className="session-icon"
        />
        {numWish ? (
          <div className="btn-qty">
            {numWish}
          </div>
        ) : null}
      </div>
      <div className="session-btn-container">
        <HiOutlineShoppingBag
          className="session-icon"
        />
        {numCart ? (
          <div className="btn-qty">
            {numCart}
          </div>
        ) : null}
      </div>
    </div>
  );
}
