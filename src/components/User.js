import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './User.css'; 

const User = () => {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('http://localhost:8080/details', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDetails(response.data);
      } catch (error) {
        setError('Error fetching details');
        console.error('Error fetching details:', error);
      }
    };
    fetchDetails();
  }, []);

  const handleGoHome = () => {
    navigate('/home'); 
  };
  return (
    <div className="user-container">
      <h2>Your Social Media Links</h2>
      {error && <p className="error-message">{error}</p>}
      {details ? (
        <ul className="social-links-list">
          <li>
            Linkedln: <a href={details.linkedln} target="_blank" rel="noopener noreferrer">{details.linkedln || 'Not provided'}</a>
          </li>
          <li>
              Github: <a href={details.github} target="_blank" rel="noopener noreferrer">{details.github || 'Not provided'}</a>
          </li>
          <li>
            Instagram: <a href={details.instagram} target="_blank" rel="noopener noreferrer">{details.instagram || 'Not provided'}</a>
          </li>
        </ul>
      ) : (
        <p>Loading...</p>
      )}
      <button className="go-home-button" onClick={handleGoHome}>Go Home</button> {/* Go Home Button */}
    </div>
  );
};

export default User;
