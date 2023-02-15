import React from 'react';
import { FaFacebookF, FaTwitter, FaPinterestP } from 'react-icons/fa';

export default function Share() {
  return (
    <div className="share">
      <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
        <FaFacebookF size="2em" className="social facebook" />
      </a>
      <a href="https://www.pinterest.com/" target="_blank" rel="noreferrer">
        <FaPinterestP size="2em" className="social pinterest" />
      </a>
      <a href="https://twitter.com/?lang=en" target="_blank" rel="noreferrer">
        <FaTwitter size="2em" className="social twitter" />
      </a>
    </div>
  );
}
