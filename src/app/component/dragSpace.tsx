"use client";

import React, { useState, useEffect } from 'react';
import DraggableItem from './element';

const DragSpace = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('dragItems')) || [];
    setItems(storedItems);
  }, []);

  const updateItemPosition = (id, left, top) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, left, top } : item
    );
    setItems(updatedItems);
    localStorage.setItem('dragItems', JSON.stringify(updatedItems));
  };

  const updateItemType = (id, type) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, type } : item
    );
    setItems(updatedItems);
    localStorage.setItem('dragItems', JSON.stringify(updatedItems));
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('dragItems', JSON.stringify(updatedItems));
  };

  const addItem = (item, left, top) => {
    const newItem = {
      id: Date.now(),
      left,
      top,
      type: item.type,
      elementType: item.elementType,
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    localStorage.setItem('dragItems', JSON.stringify(newItems));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const item = JSON.parse(e.dataTransfer.getData('item'));
    const rect = e.target.getBoundingClientRect();
    const left = e.clientX - rect.left;
    const top = e.clientY - rect.top;
    addItem(item, left, top);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="relative w-full h-screen border bg-gray-300"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {items.map(item => (
        <DraggableItem
          key={item.id}
          id={item.id}
          left={item.left}
          top={item.top}
          type={item.type}
          elementType={item.elementType}
          updateItemPosition={updateItemPosition}
          updateItemType={updateItemType}
          deleteItem={deleteItem} // Pass the deleteItem function
        />
      ))}
    </div>
  );
};

export default DragSpace;
