import React, { useState, useRef, useEffect } from 'react';
import { GoTriangleRight } from 'react-icons/go';
import RelatedProduct from './RelatedProduct.jsx';
import fetcher from '../../../fetchers';
import './styles/related.css';

export default function RelatedList({ feature, relatedInfoList, setFeatureProduct }) {
  const ref = useRef(null);
  const [posIndex, setPosIndex] = useState(3);
  const [featureMeta, setFeatureMeta] = useState(0);

  const endOfRelatedList = relatedInfoList.length ? relatedInfoList.length : 0;

  const scrollLeft = () => {
    if (posIndex > -1) {
      document.querySelector(`#relatedProduct${posIndex - 4}`)
        .scrollIntoView({ behvaior: 'smooth', block: 'nearest' });
      setPosIndex(posIndex - 1);
    }
  };

  const scrollRight = () => {
    if (posIndex < endOfRelatedList - 1) {
      document.querySelector(`#relatedProduct${posIndex + 1}`)
        .scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setPosIndex(posIndex + 1);
    }
  };

  useEffect(() => {
    fetcher.getReviewMeta(feature.id)
      .then(({ data }) => setFeatureMeta(data))
      .catch((err) => console.error(err));
  }, [feature.id]);

  return (
    <div className="related-carousel-outside">
      <div
        className="scroll-btns-left"
        onClick={scrollLeft}
        style={{ backgroundColor: posIndex === 3 ? '#EEEEEE00' : null }}
      >
        <GoTriangleRight
          size="3em"
          className="rel-scroll scrll-left"
          style={{ opacity: posIndex === 3 ? 0 : 1 }}
          onClick={scrollLeft}
        />
      </div>
      <div className="related-carousel-inside" ref={ref}>
        {relatedInfoList.map((relProd, index) => (
          <RelatedProduct
            key={relProd.id}
            feature={feature}
            featureMeta={featureMeta}
            setFeatureProduct={setFeatureProduct}
            relProd={relProd}
            index={index}
          />
        ))}
      </div>
      <div
        className="scroll-btns-right"
        onClick={scrollRight}
        style={{ backgroundColor: (posIndex === endOfRelatedList - 1 || endOfRelatedList <= 0) ? '#EEEEEE00' : null }}
      >
        <GoTriangleRight
          className="rel-scroll"
          size="3em"
          style={{
            opacity:
            (posIndex === endOfRelatedList - 1 || endOfRelatedList <= 0) ? 0 : 1,
          }}
          onClick={scrollRight}
        />
      </div>
    </div>
  );
}
