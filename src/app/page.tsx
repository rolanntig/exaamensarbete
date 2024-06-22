"use client";

import React from 'react';
import DragSpace from './component/dragSpace';
import Sidebar from './component/sidebar';

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <DragSpace />
    </div>
  );
};

export default Home;
