import React, { useRef } from 'react';
import { HiOutlinePhoto } from 'react-icons/hi2';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { filesize } from 'filesize';

function PhotoInput({
  files,
  setFiles,
}) {
  const MAX_PHOTOS = 5;
  const fileInput = useRef([]);
  const keyTracker = useRef(0);

  const chooseFile = (i) => {
    keyTracker.current += 1;
    fileInput.current[i].click();
  };

  const handleChange = (e, i) => {
    if (!e.target.files[0]) return;
    if (files.length) {
      const copy = [...files];
      copy.splice(i, 1, e.target.files[0]);
      setFiles(copy);
      return;
    }
    setFiles([...files, ...e.target.files]);
  };

  const removeFile = (i) => {
    const copy = [...files];
    copy.splice(i, 1);
    setFiles(copy);
  };

  return (
    <div className="qa add-photos">
      {files.map((file, i) => (
        <div
          // Exception: Items will never change order, no valid ID.
          // eslint-disable-next-line react/no-array-index-key
          key={`${i}_${file.name}`}
          className="qa user-photo"
        >
          <IoCloseCircleSharp
            height="100"
            width="100"
            className="qa remove-btn"
            aria-label="remove photo"
            onClick={() => removeFile(i)}
          />
          <div
            role="button"
            tabIndex={0}
            onKeyUp={() => chooseFile(i)}
            onClick={() => chooseFile(i)}
          >
            <img
              className="qa photo-sml"
              alt={`Your photo ${i}`}
              src={URL.createObjectURL(file)}
            />
          </div>
          <input
            ref={(element) => { fileInput.current[i] = element; }}
            type="file"
            accept="image/*"
            onChange={(e) => handleChange(e, i)}
            style={{ display: 'none' }}
            capture="environment"
          />
          {/* TODO: truncate long file names but keep extension */}
          <span className="qa photo-info">
            <span>{`${file.name} `}</span>
            <span>{filesize(file.size, { spacer: '' })}</span>
          </span>
        </div>
      ))}
      {files.length < MAX_PHOTOS ? (
        <div className="qa add-photo-row">
          <button
            form="add-answer-form"
            id="answer-photo-upload"
            className="qa modal-btn"
            type="button"
            tabIndex={0}
            onKeyUp={() => chooseFile(files.length)}
            onClick={() => chooseFile(files.length)}
          >
            <HiOutlinePhoto />
            <span className="qa modal-btn-text">Choose photo</span>
          </button>
          <input
            ref={(element) => { fileInput.current[files.length] = element; }}
            type="file"
            accept="image/*"
            onChange={(e) => handleChange(e, files.length)}
            style={{ display: 'none' }}
            capture="environment"
          />
        </div>
      ) : null}
    </div>
  );
}

export default PhotoInput;
