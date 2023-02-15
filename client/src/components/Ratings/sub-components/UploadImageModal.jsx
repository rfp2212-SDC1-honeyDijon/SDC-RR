/// REVISIT LATER ///////
/// DEPENDENT ON AN EXTERNAL API -CAUSING LOCALISSUES /////
/* global env */

import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineCloudUpload, AiOutlinePlus } from 'react-icons/ai';
import { TiDelete } from 'react-icons/ti';

export default function UploadAndDisplayImage({
  selectedImage,
  setSelectedImage,
  newReview,
  setNewReview,
  imgProgress,
  setImgProgress,
}) {
  // STATE DATA //
  const [numUploaded, setNumUploaded] = useState(0);

  // HELPER FUNCTIONS //
  const imageURLGenerator = (imgPath) => {
    const options = {
      url: `${env.LOCAL_URL}:3000/api/image`,
      method: 'post',
      data: { imgPath },
    };
    axios(options)
      .then(({ data }) => setNewReview({
        ...newReview,
        photos: [...newReview.photos, data],
      }))
      .catch((err) => console.error(err));
  };

  const hideProgressBar = () => {
    setImgProgress({ ...imgProgress, [numUploaded]: true });
    setNumUploaded(numUploaded + 1);
  };
  const asyncHideProgressBar = () => {
    setTimeout(() => {
      hideProgressBar();
    }, 5000);
  };

  // EVENT HANDLERS //
  const handleSubmit = (file) => {
    if (file) {
      const rf = new FileReader();
      rf.readAsDataURL(file);
      rf.onloadend = function (event) {
        const body = new FormData();
        body.append('image', event.target.result.split(',').pop());
        imageURLGenerator(event.target.result.split(',').pop());
      };
    }
  };

  return (
    <div className="image-upload">
      {selectedImage.length < 5 && (
        <div
        // onClick={e => }
          className="drag-and-drop"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const { files } = e.dataTransfer;
            if (files.length) {
              setSelectedImage([...selectedImage, files[0]]);
              handleSubmit(files[0]);
            }
          }}
        >
          <div className="drag-file">
            <p className="drag-and-drop-text">Click or Drop to Upload Images</p>
            <input
              className="img-btn"
              type="file"
              name="myImage"
              onChange={(event) => {
                if (event.target.files[0]) {
                  setSelectedImage([...selectedImage, event.target.files[0]]);
                  handleSubmit(event.target.files[0]);
                }
              }}
            />
          </div>
        </div>
      )}

      {selectedImage.length
        ? (
          <div className="uploaded-imgs">
            { selectedImage.map(
              (image, index) => (
                <div key={image} className="img-container">
                  <img alt="Thumbnail You Uploaded" className="uploaded-img" src={URL.createObjectURL(image)} />
                  <button
                    className="rmv-img"
                    type="button"
                    onClick={() => {
                      setSelectedImage(selectedImage.filter((_, i) => i !== index));
                    }}
                  >
                    <TiDelete size="2em" />
                  </button>
                </div>
              ),
            ) }
          </div>
        )
        : null}
    </div>
  );
}
