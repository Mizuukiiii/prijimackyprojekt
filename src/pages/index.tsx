// src/pages/index.js
import React from 'react';
import Navbar from '../components/navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <main>
        <h1>Welcome to Your Next.js App</h1>
        {/* Your content here */}
      </main>
    </div>
  );
};

export default Home;
