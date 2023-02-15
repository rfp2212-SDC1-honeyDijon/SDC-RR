import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { MdExpandMore } from 'react-icons/md';
import Answer from './Answer.jsx';
import QandAModal from './QandAModal.jsx';
import fetcher from '../../fetchers';

export default function Question({
  question: {
    question_id,
    question_body: body,
    // question_date: date,
    // asker_name: asker,
    question_helpfulness: helpfulness,
    // reported,
    answers,
  },
  updateQuestions,
  filterText,
  productName,
  active,
  setActive,
}) {
  const [sortedAnswers, setSortedAnswers] = useState([]);
  const [numAnswers, setNumAnswers] = useState(2);
  const [showAddA, setShowAddA] = useState(false);
  const [helpfulStatus, setHelpfulStatus] = useState(true);
  const [expandStatus, setExpandStatus] = useState(false);
  const panelRef = useRef(null);

  const byHelpfulness = (a, b) => {
    if (a[1].helpfulness > b[1].helpfulness) return -1;
    if (a[1].helpfulness < b[1].helpfulness) return 1;
    return 0;
  };

  const markHelpfulQuestion = (e) => {
    if ((e.type === 'click' || e.key === 'Enter') && helpfulStatus) {
      fetcher
        .markHelpfulQuestion(question_id)
        .then(updateQuestions)
        .then(() => setHelpfulStatus(false))
        .catch((err) => console.error('markHelpfulQuestion: ', err));
    }
  };

  const loadMoreAnswers = (e) => {
    if (e.type === 'click' || e.key === 'Enter') {
      const increment = numAnswers + 2 > Object.keys(answers).length
        ? Object.keys(answers).length - numAnswers
        : 2;
      setNumAnswers(numAnswers + increment);
    }
  };

  const collapseAnswers = (e) => {
    if (e.type === 'click' || e.key === 'Enter') {
      setNumAnswers(Object.keys(answers).length < 2 ? Object.keys(answers).length : 2);
    }
  };

  // TODO: dupe function in QuestionsList.jsx
  const showModal = (e) => {
    if (e.type === 'click' || e.key === 'Enter') {
      setShowAddA(true);
    }
  };

  const formatBody = () => {
    if (filterText.length < 3) return body;
    const parts = body.split(new RegExp(`(${filterText})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => (
          part.toLowerCase() === filterText.toLowerCase()
            ? <mark key={`${i + 1}_${part}`}>{part}</mark>
            : part
        ))}
      </span>
    );
  };

  const expand = () => {
    if (!active)setActive(question_id);
    else setActive(null);
  };

  const renderFooter = () => {
    if (numAnswers < Object.keys(answers).length) {
      return (
        <button
          className="qa btn-link-bold left-ctrl"
          type="button"
          tabIndex={0}
          onKeyUp={loadMoreAnswers}
          onClick={loadMoreAnswers}
        >
          LOAD MORE ANSWERS
        </button>
      );
    }
    if (numAnswers === Object.keys(answers).length
      && Object.keys(answers).length > 2) {
      return (
        <button
          className="qa btn-link-bold left-ctrl"
          type="button"
          tabIndex={0}
          onKeyUp={collapseAnswers}
          onClick={collapseAnswers}
        >
          COLLAPSE ANSWERS
        </button>
      );
    }
    return <div />;
  };

  useEffect(() => {
    if (Object.keys(answers).length < 2) {
      setNumAnswers(Object.keys(answers).length);
    }
    setSortedAnswers(Object.entries(answers).sort(byHelpfulness));
  }, [answers]);

  return (
    <div className="qa q&a">
      <div className="qa question">
        <button
          type="button"
          className={`qa accord${active ? ' active' : ''}`}
          onClick={expand}
        >
          <h3 className="qa q-body">
            {'Q: '}
            {formatBody()}
          </h3>
          <MdExpandMore
            className={`qa expand-btn${active ? ' active' : ''}`}
          />
        </button>
        <CSSTransition
          in={active}
          nodeRef={panelRef}
          timeout={750}
          classNames="panel"
        >
          <div
            ref={panelRef}
            className="qa panel"
          >
            {Object.keys(answers).length > 0 ? (
              <div className="qa answers-section">
                <h3>A: </h3>
                <div className="qa answers-list">
                  {sortedAnswers
                    .slice(0, numAnswers)
                    .map((answer) => (
                      <Answer
                        key={answer[0]}
                        answer={answer[1]}
                        updateQuestions={updateQuestions}
                      />
                    ))}
                </div>
              </div>
            ) : null}
            <div className="qa panel-footer-ctrl">
              {renderFooter()}
              <span className="qa right-ctrl">
                {'Is this question helpful? '}
                {helpfulStatus ? (
                  <button
                    className="qa btn-link"
                    type="button"
                    tabIndex={0}
                    onKeyUp={markHelpfulQuestion}
                    onClick={markHelpfulQuestion}
                  >
                    Yes
                  </button>
                ) : <span>Marked!</span>}
                <span
                  className="qa helpfulness"
                  data-testid="q-helpfulness"
                >
                  {' ('}
                  {helpfulness}
                  {') | '}
                </span>
                <button
                  className="qa btn-link"
                  type="button"
                  tabIndex={0}
                  onKeyUp={showModal}
                  onClick={showModal}
                >
                  Add Answer
                </button>
                <QandAModal
                  type="answer"
                  show={showAddA}
                  setShowModal={setShowAddA}
                  question_id={question_id}
                  questionBody={body}
                  productName={productName}
                />
              </span>
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}
