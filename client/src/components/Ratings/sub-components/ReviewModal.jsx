import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineClose, AiFillCheckSquare } from 'react-icons/ai';
import ReviewModalStars from './ReviewModalStars.jsx';
import ModalCharRadioBtns from './ModalCharRadioBtns.jsx';
import SubmitReview from './SubmitReview.jsx';
import UploadAndDisplayImage from './UploadImageModal.jsx';

export default function ReviewModal({
  setReviewModal,
  feature,
  reviewMeta,
  setReviewMeta,
  setReviews,
  setShowThankyou,
}) {
  // STATE DATA
  const [starRatingText, setStarRatingText] = useState('');
  const [summaryCount, setSummaryCount] = useState(0);
  const [bodyCount, setBodyCount] = useState(0);
  const [characteristics, setChars] = useState({});
  const [newReview, setNewReview] = useState({ product_id: feature.id, photos: [] });
  const nodeRef = useRef(null);

  // image modal state - currently out of order
  const [imageUploadModal, setImageUploadModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const [imgProgress, setImgProgress] = useState({
    0: false, 1: false, 2: false, 3: false, 4: false,
  });

  // EVENT HANDLERS // Needs better functionality to exit Modal w/o Mouse - REFACTOR LATER
  const closeModalKeyPress = (e) => {
    if (e.key === 'Escape') {
      setReviewModal(false);
    }
  };

  const closeModal = () => {
    document.querySelector('.write-review-modal').classList.remove('denial');
    document.querySelector('.write-review-modal-container').classList.add('hide-modal');
    setTimeout(() => {
      setReviewModal(false);
    }, 200);
  };
  // Handler Series sets newReview with value of input fields //
  const starRatingTextHandler = (value) => {
    if (value === 1) {
      setStarRatingText('Poor');
      setNewReview({ ...newReview, rating: value });
      document.querySelector('.review-asterisk-stars').classList.remove('red');
    }
    if (value === 2) {
      setStarRatingText('Fair');
      setNewReview({ ...newReview, rating: value });
      document.querySelector('.review-asterisk-stars').classList.remove('red');
    }
    if (value === 3) {
      setStarRatingText('Average');
      setNewReview({ ...newReview, rating: value });
      document.querySelector('.review-asterisk-stars').classList.remove('red');
    }
    if (value === 4) {
      setStarRatingText('Good');
      setNewReview({ ...newReview, rating: value });
      document.querySelector('.review-asterisk-stars').classList.remove('red');
    }
    if (value === 5) {
      setStarRatingText('Great');
      setNewReview({ ...newReview, rating: value });
      document.querySelector('.review-asterisk-stars').classList.remove('red');
    }
  };

  const handleSummaryChange = (e) => {
    setSummaryCount(e.target.value.length);
    setNewReview({ ...newReview, summary: e.target.value });
  };

  const handleBodyChange = (e) => {
    setBodyCount(e.target.value.length);
    setNewReview({ ...newReview, body: e.target.value });
    if (e.target.value.length > 50) {
      document.querySelector('.review-asterisk-body').classList.remove('red');
    }
  };

  const handleRecommendation = (e) => {
    const { value } = e.target;
    setNewReview({ ...newReview, recommend: value === 'yes' });
    document.querySelector('.review-asterisk-recommend').classList.remove('red');
  };

  const handleNameChange = (e) => {
    setNewReview({ ...newReview, name: e.target.value });
    if (e.target.value.length) {
      document.querySelector('.review-asterisk-name').classList.remove('red');
    }
  };

  const handleEmailChange = (e) => {
    setNewReview({ ...newReview, email: e.target.value });
    if (e.target.value.match((/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/))) {
      document.querySelector('.review-asterisk-email').classList.remove('red');
    }
  };

  // Required series manages red asterisk for required fields //

  const handleRequiredName = () => {
    if (!newReview.name) {
      document.querySelector('.review-asterisk-name').classList.add('red');
    } else {
      document.querySelector('.review-asterisk-name').classList.remove('red');
    }
  };

  const handleRequiredEmail = () => {
    if (!newReview.email || !newReview.email.match((/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/))) {
      document.querySelector('.review-asterisk-email').classList.add('red');
    } else {
      document.querySelector('.review-asterisk-email').classList.remove('red');
    }
  };

  const handleRequiredBody = () => {
    if (!newReview.body || newReview.body.length <= 50) {
      document.querySelector('.review-asterisk-body').classList.add('red');
    } else {
      document.querySelector('.review-asterisk-body').classList.remove('red');
    }
  };

  const handleRequiredRecommend = () => {
    if (newReview.recommend === undefined) {
      document.querySelector('.review-asterisk-recommend').classList.add('red');
    } else {
      document.querySelector('.review-asterisk-recommend').classList.remove('red');
    }
  };

  const handleRequiredStars = () => {
    if (!newReview.rating) {
      document.querySelector('.review-asterisk-stars').classList.add('red');
    } else {
      document.querySelector('.review-asterisk-stars').classList.remove('red');
    }
  };

  const handleRequiredChars = (characteristic) => {
    const asterisk = document.querySelector(`.review-asterisk-radiobtns-${characteristic}`);
    const radioBtns = document.querySelectorAll('.write-review-characteristics-modal');
    let isChecked = false;
    radioBtns.forEach((radioBtn) => {
      if (radioBtn.checked) {
        isChecked = true;
      }
    });
    if (!isChecked) {
      asterisk.classList.add('red');
    } else {
      asterisk.classList.remove('red');
    }
  };

  return ReactDOM.createPortal((
    <div className="write-review-modal-container">
      <div className="write-review-modal">
        <button className="close-review-modal" type="button" onClick={() => closeModal()}>
          <AiOutlineClose size="1.5em" />
        </button>
        <div className="rvw-modal-title">
          <p className="write-review-modal-title">
            Leaving A Review For:
            {' '}
            <span className="rvw-prod">
              {feature.name}
            </span>
          </p>
          <div className="modal-top">
            <div className="review-modal-star-container" onBlur={() => handleRequiredStars()}>
              <p className="leave-stars">Rating:</p>
              {' '}
              {/* Rename and Refactor */}
              <ReviewModalStars
                onChange={starRatingTextHandler}
              />
              <p className="star-rting">{starRatingText}</p>
            </div>
            <div className="review-modal-recommendation-container" onBlur={() => handleRequiredRecommend()}>
              <p className="rvw-modal-rccmnd">
                Recommended:
                {' '}
                <span className="review-asterisk-recommend">*</span>
              </p>
              <label className="reco-label" htmlFor="recommendation-yes">
                <input id="yes-id" type="radio" name="recommendation" value="yes" onChange={handleRecommendation} />
                <label htmlFor="yes-id">Yes</label>
                {/* Yes */}
              </label>
              <label className="reco-label" htmlFor="recommendation-no">
                <input id="no-id" type="radio" name="recommendation" value="no" onChange={handleRecommendation} />
                <label htmlFor="no-id">No</label>
                {/* No */}
              </label>
            </div>
          </div>
        </div>
        <div className="modal-chars-container">
          <p className="review-modal-characteristics-title">Fit Characteristics:</p>
          {reviewMeta
            ? (
              <ModalCharRadioBtns
                reviewMeta={reviewMeta}
                characteristics={characteristics}
                setChars={setChars}
                handleRequiredChars={handleRequiredChars}
              />
            ) : null}
        </div>
        <div className="rvw-text-container">
          <div className="review-summ-container">
            <p className="review-summ-label">Review Summary:</p>
            <textarea type="input" className="rvw-summ" placeholder="Example: Best purchase ever!" name="summary" id="summary" maxLength="60" onChange={handleSummaryChange} ref={useRef()} required />
            {/* <p className="write-review-character-count">
              60 Character Max:
              {' '}
              {summaryCount}
            </p> */}
          </div>
          <div className="review-body-container">
            <p className="review-body-title">
              Write Your Review:
              <span className="review-asterisk-body">*</span>
            </p>
            <div className="rvw-body-container" onBlur={(e) => handleRequiredBody(e)}>
              <textarea type="input" className="rvw-body" placeholder="Why did you like the product or not?" name="body" id="body" maxLength="1000" onChange={handleBodyChange} ref={useRef()} required />
              <p className="write-review-character-count">
                {bodyCount > 50
                  ? (
                    <span className="review-body-minimum-reached">
                      <span className="min-check"><AiFillCheckSquare /></span>
                      {' '}
                      Minimum Reached
                    </span>
                  )
                  : `Minimum required characters left: ${50 - bodyCount}`}
              </p>
            </div>
          </div>
        </div>
        <UploadAndDisplayImage
          setImageUploadModal={setImageUploadModal}
          setSelectedImage={setSelectedImage}
          selectedImage={selectedImage}
          newReview={newReview}
          setNewReview={setNewReview}
          imgProgress={imgProgress}
          setImgProgress={setImgProgress}
        />
        <div className="email-name">
          <div className="email-name-container" onBlur={() => handleRequiredName()}>
            <p className="form__label">
              Nickname:
              <span className="review-asterisk-name">*</span>
            </p>
            <input type="input" className="form-field" placeholder="Example: jackson11!" name="nickname" id="nickname" maxLength="60" onChange={handleNameChange} required />
            <p className="email-disclaimer">For privacy reasons, do not use your full name or email address.</p>
          </div>
          <div className="write-review-email-parent" onBlur={(e) => handleRequiredEmail(e)}>
            <p className="form__label">
              Email:
              <span className="review-asterisk-email">*</span>
            </p>
            <input type="input" className="form-field" placeholder="Example: jackson11@email.com" name="name" id="name" maxLength="60" onChange={handleEmailChange} required />
            <p className="email-disclaimer">For authentication reasons, you will not be emailed.</p>
          </div>
        </div>
        <SubmitReview
          newReview={newReview}
          chars={characteristics}
          setChars={setChars}
          setNewReview={setNewReview}
          setReviewModal={setReviewModal}
          feature={feature}
          setReviewMeta={setReviewMeta}
          setReviews={setReviews}
          handleRequiredName={handleRequiredName}
          handleRequiredBody={handleRequiredBody}
          handleRequiredEmail={handleRequiredEmail}
          handleRequiredStars={handleRequiredStars}
          handleRequiredRecommend={handleRequiredRecommend}
          reviewMeta={reviewMeta}
          handleRequiredChars={handleRequiredChars}
          setShowThankyou={setShowThankyou}
        />
        {imageUploadModal
          ? (
            <UploadAndDisplayImage
              setImageUploadModal={setImageUploadModal}
              setSelectedImage={setSelectedImage}
              selectedImage={selectedImage}
              newReview={newReview}
              setNewReview={setNewReview}
              imgProgress={imgProgress}
              setImgProgress={setImgProgress}
            />
          ) : null}
      </div>
    </div>), document.getElementById('modal'));
}
