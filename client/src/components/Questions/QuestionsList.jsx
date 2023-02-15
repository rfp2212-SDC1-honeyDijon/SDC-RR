import React, { useState, useEffect } from 'react';
import Question from './Question.jsx';
import QandAModal from './QandAModal.jsx';

export default function QuestionsList({
  questions,
  product_id,
  productName,
  updateQuestions,
  filterText,
}) {
  const [numQuestions, setNumQuestions] = useState(2);
  const [showAddQ, setShowAddQ] = useState(false);
  const [activeQ, setActiveQ] = useState(null);

  const loadMoreQuestions = (e) => {
    if (e.type === 'click' || e.key === 'Enter') {
      const increment = numQuestions + 2 > questions.length
        ? questions.length - numQuestions
        : 2;
      setNumQuestions(numQuestions + increment);
    }
  };

  // TODO: same function in Question.jsx
  const showModal = (e) => {
    if (e.type === 'click' || e.key === 'Enter') {
      setShowAddQ(true);
    }
  };

  useEffect(() => {
    setNumQuestions(questions.length < 2 ? questions.length : 2);
  }, [questions]);

  return (
    <>
      <div className="qa list accordion">
        {questions.length > 0
          ? questions.slice(0, numQuestions).map((question) => (
            <Question
              key={question.question_id}
              question={question}
              updateQuestions={updateQuestions}
              filterText={filterText}
              productName={productName}
              active={activeQ === question.question_id}
              setActive={setActiveQ}
            />
          ))
          : null}
      </div>
      {/* TODO: extract this and logic to Questions.jsx */}
      <div className="qa footer-control">
        <button
          className="footer-add-btn"
          type="button"
          tabIndex={0}
          onKeyUp={showModal}
          onClick={showModal}
        >
          {'ASK A QUESTION \t +'}
        </button>
        {numQuestions !== questions.length ? (
          <button
            className="footer-more-btn"
            type="button"
            tabIndex={0}
            onKeyUp={loadMoreQuestions}
            onClick={loadMoreQuestions}
          >
            MORE ANSWERED QUESTIONS
          </button>
        )
          : null}
        <QandAModal
          type="question"
          show={showAddQ}
          setShowModal={setShowAddQ}
          product_id={product_id}
          productName={productName}
        />
      </div>
    </>
  );
}
