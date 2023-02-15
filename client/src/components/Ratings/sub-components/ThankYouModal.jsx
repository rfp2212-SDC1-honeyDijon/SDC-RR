import React from 'react';
import ReactDOM from 'react-dom';
import {
  FaFacebookF, FaTwitter, FaPinterestP, FaInstagram,
} from 'react-icons/fa';

export default function ThankYouModal({ showThankyou, setShowThankyou }) {
  return ReactDOM.createPortal(
    (
      <div>
        {showThankyou && (
        <div className="thank-you-review-modal">
          <div className="thank-you-review-modal">
            <div className="thank-you-text">
              <button className="close-thank-you-modal" type="button" onClick={() => setShowThankyou(false)}>&times;</button>
              <p>Thank you for your review!</p>
              <br />
              <p>Share us on</p>
              <br />
              <div className="thank-you-modal-icons">
                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                  <FaFacebookF size="2em" className="thank-you-fb" />
                </a>
                <a href="https://www.pinterest.com/" target="_blank" rel="noreferrer">
                  <FaPinterestP size="2em" className="thank-you-pinterest" />
                </a>
                <a href="https://twitter.com/?lang=en" target="_blank" rel="noreferrer">
                  <FaTwitter size="2em" className="thank-you-twitter" />
                </a>
                <a href="https://instagram.com/" target="_blank" rel="noreferrer">
                  <FaInstagram size="2em" className="thank-you-instagram" />
                </a>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    ), document.getElementById('modal'),
  );
}
