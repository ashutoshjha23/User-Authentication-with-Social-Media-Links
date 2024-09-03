import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom
import Navbar from './Navbar';
import useVantaWaves from '../hooks/useVantaWaves';
import './Home.css';

const Home = () => {
  const vantaRef = useVantaWaves();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    navigate('/login'); 
  };

  return (
    <div ref={vantaRef} className="vanta-background">
      <Navbar />
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <h2>Welcome to the Home Page</h2>
      <p>You are logged in.</p>
    </div>
  );
};

export default Home;
