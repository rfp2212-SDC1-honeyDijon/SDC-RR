import React, { useEffect } from 'react';
import { TfiClose } from 'react-icons/tfi';

export default function PhotoModal({
  show,
  setShow,
  src,
  alt,
}) {
  const close = (e) => {
    if ((e.type === 'click' && e.target.classList.contains('modal-close'))
    || e.key === 'Enter') setShow(false);
  };

  useEffect(() => {
    if (show) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'visible'; };
  }, [show]);

  if (!show) return null;
  return (
    // Reason: There exists an accessible button to close the modal.
    //  eslint-disable-next-line
    <div className="modal-bg modal-close" onClick={close}>
      {/* TODO escape key */}
      <TfiClose
        className="close-btn modal-close"
        tabIndex={0}
        onClick={close}
        onKeyUp={close}
      />
      <img
        className="image-modal"
        src={src}
        alt={alt}
      />
    </div>
  );
}
