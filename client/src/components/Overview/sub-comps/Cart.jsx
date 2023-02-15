import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineStar, AiOutlinePlus } from 'react-icons/ai';
import { TbHeart, TbHeartPlus, TbHeartMinus } from 'react-icons/tb';
import axios from 'axios';
import Share from './Share.jsx';
import fetcher from '../../../fetchers';

export default function Cart({
  showSku, setShowSku, currStyle, quantity, setQuantity, cart, addToCart, wishlist, setWishlist,
}) {
  // STATE DATA //
  const [wishToggle, setWishToggle] = useState(false);
  const [wishHover, setWishHover] = useState(false);

  // EVENT HANDLERS //
  const handleSizeSelect = (event) => {
    setShowSku(event.target.value);
  };

  const handleAddCart = (item) => {
    if (!cart[showSku]) {
      addToCart({ ...cart, [showSku]: item });
      return;
    }
    const newQty = item.quantity + cart[showSku].quantity;
    if (newQty > currStyle.skus[showSku].quantity) {
      alert('Not enough items in stock, please choose a smaller quantity.');
      return;
    }
    const toAdd = { ...item, quantity: newQty };
    addToCart({ ...cart, [showSku]: toAdd });
  };

  const handleWish = () => {
    if (!wishlist[currStyle.style_id] && !wishToggle) {
      setWishlist({ ...wishlist, [currStyle.style_id]: currStyle });
      setWishToggle(true);
    } else {
      const copy = { ...wishlist };
      delete copy[currStyle.style_id];
      setWishlist(copy);
      setWishToggle(false);
    }
  };

  const handleClick = () => {
    if (showSku) {
      [...Array(Number(quantity)).keys()].forEach(() => {
        fetcher.addToCart(showSku)
          .then(() => { })
          .catch((err) => console.error(err));
      });
      handleAddCart({ quantity, currStyle });
    }
  };

  useEffect(() => {
    if (!wishlist[currStyle?.style_id]) setWishToggle(false);
    else setWishToggle(true);
  }, [currStyle, wishlist]);

  return (
    <div id="add-to-cart">
      <select
        className="cart-border size-selector"
        value={showSku}
        onChange={(e) => handleSizeSelect(e)}
      >
        <option value="" key="nullSize">SELECT SIZE</option>
        {currStyle
          ? Object.keys(currStyle.skus)
            .filter((sku) => currStyle.skus[sku].quantity > 0)
            .map((sku) => (
              <option
                value={sku}
                key={`${currStyle.skus[sku].size}${sku}`}
              >
                {currStyle.skus[sku].size}
              </option>
            ))
          : null}
      </select>
      <select
        className="cart-border quantity-selector"
        value={quantity}
        onChange={(e) => setQuantity(Number.parseInt(e.target.value, 10))}
      >
        <option value="" key="nullQuantity">-</option>
        {currStyle && Object.keys(currStyle.skus).includes(showSku)
          ? [...Array(currStyle.skus[showSku].quantity > 15
            ? 15 : currStyle.skus[showSku].quantity).keys()]
            .map((num) => (
              <option value={num + 1} key={`${showSku}${num}`}>
                {`${num + 1}`}
              </option>
            ))
          : null}
      </select>
      <button
        className="cart-border add-to-cart-btn"
        type="button"
        onClick={handleClick}
      >
        ADD TO BAG
        <AiOutlinePlus />
      </button>
      {wishToggle ? (
        <button
          className="cart-border star-cart-btn active"
          type="button"
          onClick={handleWish}
          onPointerEnter={() => setWishHover(true)}
          onPointerLeave={() => setWishHover(false)}
        >
          {wishHover
            ? <TbHeartMinus size="1.5em" />
            : <TbHeart size="1.5em" />}
        </button>
      ) : (
        <button
          className="cart-border star-cart-btn"
          type="button"
          onClick={handleWish}
        >
          <TbHeartPlus size="1.5em" />
        </button>
      )}
      <Share />
    </div>
  );
}
