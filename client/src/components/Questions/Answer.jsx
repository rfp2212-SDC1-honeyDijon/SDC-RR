import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { createPortal } from 'react-dom';
import fetcher from '../../fetchers';
import PhotoModal from './PhotoModal.jsx';

export default function Answer({
  answer: {
    id,
    body,
    date,
    answerer_name: name,
    helpfulness,
    photos,
  },
  updateQuestions,
}) {
  const [helpfulStatus, setHelpfulStatus] = useState(true);
  const [reportStatus, setReportStatus] = useState(true);
  const [modalStatus, setModalStatus] = useState(false);
  const [modalPhoto, setModalPhoto] = useState('');

  const markHelpfulAnswer = (e) => {
    if ((e.type === 'click') && helpfulStatus) {
      fetcher
        .markHelpfulAnswer(id)
        .then(updateQuestions)
        .then(() => setHelpfulStatus(false))
        .catch((err) => console.error('markHelpfulAnswer: ', err));
    }
  };

  const reportAnswer = (e) => {
    if ((e.type === 'click' || e.key === 'Enter') && reportStatus) {
      fetcher
        .reportAnswer(id)
        .then(() => setReportStatus(false))
        .catch((err) => console.error('reportAnswer: ', err));
    }
  };

  const showModal = (e, photo) => {
    if (e.type === 'click' || e.key === 'Enter') {
      setModalStatus(true);
      setModalPhoto(photo);
    }
  };

  return (
    <div className="qa answer">
      <div className="qa answer-body">
        <p className="qa answer-text">
          {body}
        </p>
        {/* TODO: expand photo on click */}
        <div className="qa photos">
          {photos.length > 0
            ? photos.map((photo, index) => (
              // Image is meant to be interactable
              /* eslint-disable */
              <img
                className="qa photo-sml expandable"
                src={photo}
                key={photo}
                alt={`Customer's photo ${index + 1}`}
                tabIndex={0}
                onClick={(e) => showModal(e, photo)}
                onKeyUp={(e) => showModal(e, photo)}
              />
              /* eslint-enable */
            ))
            : null}
        </div>
        {modalStatus && createPortal(
          (
            <PhotoModal
              show={modalStatus}
              setShow={() => setModalStatus(false)}
              src={modalPhoto}
              alt={'Customer\'s expanded photo'}
            />
          ), document.getElementById('modal'),
        )}
      </div>
      <div className="qa answer-info">
        {'by '}
        <span className="qa answerer">{name}</span>
        {', '}
        <span className="qa answer-date">
          {format(parseISO(date), 'MMMM d, yyyy')}
        </span>
        <span className="helpful-par">
          | Is this answer helpful?
        </span>
        {helpfulStatus
          ? (
            <button
              className="qa btn-link"
              type="button"
              tabIndex={0}
              onKeyUp={markHelpfulAnswer}
              onClick={markHelpfulAnswer}
            >
              Yes

            </button>
          )
          : <span>Marked!</span>}
        <span
          className="qa helpfulness"
          data-testid="a-helpfulness"
        >
          {' ('}
          {helpfulness}
          {') | '}
        </span>
        {reportStatus ? (
          <button
            className="qa btn-link"
            type="button"
            tabIndex={0}
            onKeyUp={reportAnswer}
            onClick={reportAnswer}
          >
            Report
          </button>
        ) : <span>Reported</span>}
      </div>
    </div>
  );
}
