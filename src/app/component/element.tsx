"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Modal from './modal';

const DraggableItem = ({ id, left, top, type, elementType, updateItemPosition, updateItemType, deleteItem }) => {
  const itemRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false); // New state to track movement
  const [showModal, setShowModal] = useState(false);
  const [elementStyle, setElementStyle] = useState("");

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setHasMoved(false); // Reset movement state
    itemRef.current.initialX = e.clientX - left;
    itemRef.current.initialY = e.clientY - top;
  };


  useEffect(() => {
    if (elementType === "nav"){
      setElementStyle("h-1/6 text-black w-full shadow-mg bg-gray-200 rounded cursor-move");
    }
    else if (elementType === "form"){
      setElementStyle(" text-black bg-gray-200 h-1/2 w-1/2 shadow-md rounded");
    }
    else if (elementType === "input"){
      setElementStyle("w-1/3 h-10 p-1.5 text-white bg-orange-400 shadow-md rounded cursor-move");
    }
    else if (elementType === "img"){
      setElementStyle("w-1/3 h-1/3 text-black bg-gray-200 shadow-md rounded cursor-move");
    }
    else if (elementType === "button"){
      setElementStyle("w-15 h-10 p-1.5 text-white bg-orange-400 shadow-md rounded cursor-move");
    }
    else if (elementType === "logo"){
      setElementStyle("text-black text-3xl");
    }
    else if (elementType === "text"){
      setElementStyle("w-1/3 h-1/4  text-center text- text-3xl text-black bg-gray-200 shadow-md rounded cursor-move");
    }

  }
  , [elementType]);

  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        setHasMoved(true); // Set movement state to true if mouse is moved
        const newLeft = e.clientX - itemRef.current.initialX;
        const newTop = e.clientY - itemRef.current.initialY;
        itemRef.current.style.left = `${newLeft}px`;
        itemRef.current.style.top = `${newTop}px`;
      }
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(
    (e) => {
      if (isDragging) {
        setIsDragging(false);
        if (hasMoved) {
          updateItemPosition(
            id,
            e.clientX - itemRef.current.initialX,
            e.clientY - itemRef.current.initialY
          );
        }
      }
    },
    [isDragging, hasMoved, id, updateItemPosition]
  );

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent triggering any parent click events
    if (!hasMoved) { // Open modal only if the item has not moved
      setShowModal(true);
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);


  return (
    <>
      <div
        ref={itemRef}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        className={` absolute ${elementStyle}`}
        style={{ left, top }}
      >
        {type}
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={(newValue) => updateItemType(id, newValue)}
        onDelete={() => deleteItem(id)} // Pass the deleteItem function
        initialValue={type}
      />
    </>
  );
};

export default DraggableItem;
