"use client";

import React, { useState, useEffect } from 'react';

const Modal = ({ show, onClose, onSave, onDelete, initialValue }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (!show) {
    return null;
  }

  const handleSave = () => {
    onSave(value);
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow w-1/3">
        <h2 className="text-lg mb-4">Edit Item</h2>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border text-black p-2 mb-4 w-full"
        />
        <div className="flex justify-between">
          <button onClick={handleDelete} className="p-2 border rounded bg-red-500 text-white">Remove</button>
          <div className="flex">
            <button onClick={onClose} className="mr-2 p-2 border rounded bg-gray-200">Cancel</button>
            <button onClick={handleSave} className="p-2 border rounded bg-blue-500 text-white">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
