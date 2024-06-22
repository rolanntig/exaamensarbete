"use client";

import React from 'react';

const templateItems = [
  { id: 1, type: 'Nav', elementType: 'nav', class: 'nav' },
  { id:2, type: 'button',elementType:'button', class: 'button'},
  { id: 3, type: 'Form', elementType: 'form', class: 'form' },
  { id: 4, type: 'Input', elementType: 'input', class: 'form' },
    { id: 6, type: 'Image', elementType: 'img', class: 'img' },
    {id:7,type:'Logo',elementType:'logo',class:'img'},
    {id:8,type:'Text',elementType:'text',class:'text'}
];

const Sidebar = () => {
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('item', JSON.stringify(item));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
  };

  const sortedItems = templateItems.reduce((acc, item) => {
    if (!acc[item.class]) {
      acc[item.class] = [];
    }
    acc[item.class].push(item);
    return acc;
  }, {});

  return (
    <div
      className="w-1/4 h-screen bg-gray-200 p-4"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h2 className="text-3xl text-black text-center font-bold mb-4">Templates</h2>
      {Object.keys(sortedItems).map(cls => (
        <div key={cls}>
          <h3 className="text-md text-black font-semibold mb-2">{cls.charAt(0).toUpperCase() + cls.slice(1)}</h3>
          {sortedItems[cls].map(item => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              className="text-center w-32 overflow-hidden h-10 p-2 mb-2 bg-orange-400 border cursor-move rounded shadow-md"
            >
              {item.type}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
