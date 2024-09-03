import React from 'react';
import Navbar from './Navbar';
import useVantaWaves from '../hooks/useVantaWaves';
import './Home.css';

const Home = () => {
  const vantaRef = useVantaWaves(); // Use the custom hook

  return (
    <div ref={vantaRef} className="vanta-background">
      <Navbar />
      <h2>Welcome to the Home Page</h2>
      <p>You are logged in.</p>
    </div>
  );
};

export default Home;
