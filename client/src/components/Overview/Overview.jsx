import React, { useState, useEffect } from 'react';
import './overview.css';

// SUB-COMPONENETS //
import Search from './sub-comps/Search.jsx';
import Gallery from './sub-comps/Gallery.jsx';
import ProdInfo from './sub-comps/ProdInfo.jsx';
import StyleSelect from './sub-comps/StyleSelect.jsx';
import Cart from './sub-comps/Cart.jsx';
import Description from './sub-comps/Description.jsx';
import SessionInfo from './sub-comps/SessionInfo.jsx';
import logo from '../../../dist/assets/logo.png';

export default function Overview({
  product, styles, reviews, recordClick,
}) {
  // STATE DATA //
  const [currStyle, setCurrStyle] = useState(null);
  const [heroImage, setHero] = useState({ url: null, index: 0 });
  const [images, setImages] = useState([]);
  const [rightBtn, setRightBtn] = useState(true);
  const [leftBtn, setLeftBtn] = useState(false);
  const [showSku, setShowSku] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState({});

  // HELPER FUNCTIONS //
  const btnRenderCheck = () => {
    const selected = document.getElementsByClassName('selected')[0];
    const prevSib = selected.previousSibling;
    const nextSib = selected.nextSibling;
    if (!prevSib) {
      setLeftBtn(false);
    } else {
      setLeftBtn(true);
    }
    if (!nextSib) {
      setRightBtn(false);
    } else {
      setRightBtn(true);
    }
  };

  // STATE CHANGE WATCHER //
  useEffect(() => {
    if (currStyle) {
      setImages(currStyle.photos.map((photo, index) => ({
        url: photo.url,
        key: index,
      })));
      if ((!rightBtn && !leftBtn) && currStyle.photos.length > 1) {
        setRightBtn(true);
      }
    }
  }, [currStyle]);

  // INITIALIZATION //
  useEffect(() => {
    if (styles) {
      const target = styles.results[0];
      setCurrStyle(target);
      setHero({
        url: target.photos[0].url,
        index: 0,
      });
    }
  }, [styles]);

  return (
    // eslint-disable-next-line -- not meant to be interactive
    <div onClick={(e) => recordClick(e, 'Overview')}>
      <nav id="header">
        {/* <h1 className="temp-logo">Superior</h1> */}
        <img src={logo} className="logo" alt="site-logo" />
        <div id="header-right">
          <SessionInfo
            cart={cart}
            wishlist={wishlist}
          />
          <Search />
        </div>
      </nav>
      <div id="overview">
        <div className="left-main">
          <Gallery
            product={product}
            heroImage={heroImage}
            setHero={setHero}
            images={images}
            rightBtn={rightBtn}
            leftBtn={leftBtn}
            currStyle={currStyle}
            btnRenderCheck={btnRenderCheck}
          />
        </div>
        <div className="right-main">
          <ProdInfo
            product={product}
            currStyle={currStyle}
            reviews={reviews}
          />
          <StyleSelect
            styles={styles}
            currStyle={currStyle}
            setCurrStyle={setCurrStyle}
            setHero={setHero}
            btnRenderCheck={btnRenderCheck}
            setLeftBtn={setLeftBtn}
            setRightBtn={setRightBtn}
            setShowSku={setShowSku}
            setQuantity={setQuantity}
          />
          <Cart
            showSku={showSku}
            setShowSku={setShowSku}
            currStyle={currStyle}
            quantity={quantity}
            setQuantity={setQuantity}
            cart={cart}
            addToCart={setCart}
            wishlist={wishlist}
            setWishlist={setWishlist}
          />
        </div>
        <div className="bottom-main">
          <Description
            product={product}
          />
        </div>
      </div>
    </div>
  );
}
