import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import fetcher from '../../fetchers';
import PhotoInput from './PhotoInput.jsx';

export default function QandAModal({
  type,
  show,
  setShowModal,
  product_id,
  question_id,
  productName,
  questionBody,
}) {
  const blankForm = {
    name: '',
    body: '',
    email: '',
  };
  const [addForm, setAddForm] = useState(blankForm);
  const [files, setFiles] = useState([]);

  const close = (e) => {
    if ((e.type === 'click' && e.target.classList.contains('modal-close'))
      || e.key === 'Enter') {
      setAddForm(blankForm);
      setFiles([]);
      setShowModal(false);
    }
  };

  const handleChange = (e) => {
    setAddForm({
      ...addForm,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    if (email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) return true;
    return false;
  };

  const isValid = (field) => {
    switch (field) {
      case 'body':
        if (addForm.body.length) return true;
        return false;
      case 'name':
        if (addForm.name.length) return true;
        return false;
      case 'email':
        if (validateEmail(addForm.email)) return true;
        return false;
      default:
        console.error('wrong field');
        return false;
    }
  };

  const validateForm = () => {
    if (type === 'question' && (
      !isValid('body')
      || !isValid('name')
      || !isValid('email')
      || !product_id
    )) return false;

    if (type === 'answer' && (
      !isValid('body')
      || !isValid('name')
      || !isValid('email')
      || !question_id
    )) return false;

    return true;
  };

  const makeAddForm = () => new Promise((resolve) => {
    if (!files.length) resolve({ ...addForm, question_id });
    fetcher.fetchPhotos(files)
      .then((photos) => resolve({ ...addForm, photos, question_id }));
  });

  const submitForm = (e) => {
    e.preventDefault();
    if ((e.type === 'click' || e.key === 'Enter')) {
      // TODO: make custom alert message
      if (!validateForm()) {
        let message = '';
        if (!isValid('body') || !isValid('name')) message += 'Please fill the following:\n';
        if (!isValid('body')) message += ` - ${type.charAt(0).toUpperCase()}${type.slice(1)}\n`;
        if (!isValid('name')) message += ' - Nickname\n';
        if (!isValid('email')) message += 'The email address provided is not in correct email format';
        alert(message);
        return;
      }
      switch (type) {
        // TODO: also want to send signal to update q&a
        case 'question':
          fetcher
            .postQuestion({ ...addForm, product_id })
            .then(() => (setShowModal(false)))
            .catch((err) => console.error('postQuestion: ', err));
          break;
        case 'answer':
        // TODO: want to send signal to update q&a, may also need to inc answers
          makeAddForm()
            .then((form) => fetcher.postAnswer(form, question_id))
            .then(() => (setShowModal(false)))
            .catch((err) => console.error('postAnswer: ', err));
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (show) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'visible';
  }, [show]);

  useEffect(() => {
    if (files.length) {
      if (!files[files.length - 1].type.includes('image')) {
        alert('Invalid file type, please choose only images.');
        setFiles(files.slice(0, files.length - 1));
      }
    }
  }, [files]);

  if (!show) return null;
  return ReactDOM.createPortal((
    // Reason: There exists an accessible button to close the modal.
    /*  eslint-disable-next-line
        jsx-a11y/click-events-have-key-events,
        jsx-a11y/no-static-element-interactions */
    <div className="qa modal-bg modal-close" onClick={close}>
      {/* TODO escape key */}
      <div className="qa modal-fg">
        <div className="qa modal-header">
          <h3 className="qa modal-title">
            {type === 'question' ? 'Ask your Question' : 'Submit your Answer'}
          </h3>
          <sub>
            {type === 'question'
              ? `About the ${productName} here`
              : `${productName}: ${questionBody}`}
          </sub>
        </div>
        <div className="qa modal-body">
          <form id={`add-${type}-form`} onSubmit={submitForm}>
            <div className="qa add-body">
              <label className="qa add-label" htmlFor={`${type}-bodybox`}>
                <div className="qa add-label-text">
                  {type === 'question' ? 'Question' : 'Answer'}
                  {!isValid('body') ? (
                    <span className="qa required"> *</span>
                  ) : null}
                </div>
                <textarea
                  type="text"
                  id={`${type}-bodybox`}
                  className="qa text-input"
                  name="body"
                  form={`add-${type}-form`}
                  value={addForm.body}
                  onChange={handleChange}
                  maxLength="1000"
                  required
                />
              </label>
            </div>
            <div className="qa add-personal">
              <div className="qa add-nickname">
                <label className="qa add-label" htmlFor="nicknamebox">
                  <div className="qa add-label-text">
                    Nickname
                    {!isValid('name') ? (
                      <span className="qa required"> *</span>
                    ) : null}
                  </div>
                  <input
                    type="text"
                    id="nicknamebox"
                    className="qa text-input"
                    name="name"
                    form={`add-${type}-form`}
                    value={addForm.name}
                    onChange={handleChange}
                    maxLength="60"
                    placeholder={type === 'question'
                      ? 'Example: jackson11!'
                      : 'Example: jack543!'}
                    required
                  />
                </label>
                <sub>For privacy reasons, do not use your full name or email address.</sub>
              </div>
              <div className="qa add-email">
                <label className="qa add-label" htmlFor={`${type}-emailbox`}>
                  <div className="qa add-label-text">
                    Email
                    {!isValid('email') ? (
                      <span className="qa required"> *</span>
                    ) : null}
                  </div>
                  <input
                    type="text"
                    id={`${type}-emailbox`}
                    className="qa text-input"
                    name="email"
                    form={`add-${type}-form`}
                    value={addForm.email}
                    onChange={handleChange}
                    maxLength="60"
                    placeholder={type === 'question'
                      ? 'Why did you like the product or not?'
                      : 'Example: jack@email.com'}
                    required
                  />
                </label>
                <sub>For authentication reasons, you will not be emailed</sub>
              </div>
            </div>
            {type === 'answer' ? (
              <PhotoInput files={files} setFiles={setFiles} />
            ) : null}
          </form>
        </div>
        <div className="qa modal-footer">
          <button
            form={`add-${type}-form`}
            className="qa modal-btn"
            type="submit"
            tabIndex={0}
            onKeyUp={submitForm}
            onClick={submitForm}
          >
            Submit
          </button>
          <button
            className="qa modal-btn modal-close"
            type="button"
            tabIndex={0}
            onKeyUp={close}
            onClick={close}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>), document.getElementById('modal'));
}
