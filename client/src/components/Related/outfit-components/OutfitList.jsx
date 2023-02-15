/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { GoTriangleRight } from 'react-icons/go';
// import { GrAdd } from 'react-icons/gr';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import OutfitProduct from './OutfitProduct.jsx';
import './styles/outfitList.css';

export default function OutfitList({
  feature, setFeatureProduct, outfitIdList, setOutfitIdList,
}) {
  // CAROUSEL COMPONENT
  const ref = useRef(null);
  const [posIndex, setPosIndex] = useState(3);

  // CHECK HOW MANY CLICKS NEED TO REACH END OF THE LAST RELATED IMAGE
  const endOfOutfitList = outfitIdList.length !== undefined ? outfitIdList.length : 0;

  const scrollLeft = () => {
    if (posIndex > -1) {
      document.querySelector(`#outfitProduct${posIndex - 4}`)
        .scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setPosIndex(posIndex - 1);
    }
  };

  const scrollRight = () => {
    if (posIndex < endOfOutfitList) {
      document.querySelector(`#outfitProduct${posIndex + 1}`)
        .scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setPosIndex(posIndex + 1);
    }
  };

  // ADD FEATURE PRODUCT TO OUTFIT LIST
  const addOutfit = () => {
    if (!outfitIdList.includes(feature.id)) {
      setOutfitIdList([...outfitIdList, feature.id]);
    }
  };

  // SET UP DRAG DROP FUNCTION
  const handleOnDragEnd = (result) => {
    // IF DROPPED OUTSIDE THE LIST
    if (!result.destination) {
      return;
    }

    const newList = [...outfitIdList];

    [
      newList[result.source.index],
      newList[result.destination.index],
    ] = [newList[result.destination.index], newList[result.source.index]];

    setOutfitIdList(newList);
  };

  return (
    <div className="outfit-carousel-outside">
      <div
        className="scroll-btns-left"
        onClick={scrollLeft}
        style={{ backgroundColor: posIndex === 3 ? '#EEEEEE00' : null }}
      >
        <GoTriangleRight
          size="3em"
          className="rel-scroll scrll-left"
          style={{ opacity: posIndex === 3 ? 0 : 1 }}
          onClick={scrollLeft}
        />
      </div>
      <div className="outfit-carousel-inside" ref={ref}>
        {outfitIdList
          ? outfitIdList.map((outfitId, index) => (
            <OutfitProduct
              key={outfitId}
              outfitId={outfitId}
              outfitIdList={outfitIdList}
              setOutfitIdList={setOutfitIdList}
              setFeatureProduct={setFeatureProduct}
              index={index}
            />
          ))
          : null}
        <div className="add-card" onClick={addOutfit} onKeyPress={addOutfit} tabIndex={0}>
          <AiOutlinePlus className="outfit-add" onClick={addOutfit} size="10em" />
        </div>
      </div>
      {outfitIdList.length > 4
        ? (
          <div
            className="scroll-btns-right"
            onClick={scrollRight}
            style={{ backgroundColor: (posIndex === endOfOutfitList - 1 || endOfOutfitList <= 0) ? '#EEEEEE00' : null }}
          >
            <GoTriangleRight
              className="rel-scroll"
              size="3em"
              style={{
                opacity:
            (posIndex <= endOfOutfitList - 1 || endOfOutfitList <= 0) ? 0 : 1,
              }}
              onClick={scrollRight}
            />
          </div>
        )
        : null}

    </div>
  );
}
