import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';

export default function Decsription({ product }) {
  // HELPER FUNCTIONS //
  const featureRenderer = () => product.features.map((feat, index) => {
    const id = index;
    return (
      <li className="feature" key={id}>
        <AiOutlineCheck className="check" />
        {feat.feature}
        :
        {' '}
        {feat.value}
      </li>
    );
  });

  return (
    <div id="description">
      <div className="desc-left">
        { product.slogan
          ? <h3 className="slogan">{product.slogan}</h3>
          : null }
        { product.description
          ? <p className="description-pars">{product.description}</p>
          : null }
      </div>
      <div className="line-break" />
      <div className="desc-right">
        <div className="features">
          { product.features
            ? featureRenderer()
            : null }
        </div>
      </div>
    </div>
  );
}
