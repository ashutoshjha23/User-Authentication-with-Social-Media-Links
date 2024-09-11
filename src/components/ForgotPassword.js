import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/forgot-password', { email });
      if (response.status === 200) {
        setMessage('Password reset email sent. Check your inbox.');
        setTimeout(() => navigate('/login'), 2000); 
      }
    } catch (error) {
      console.error('Error sending password reset email:', error);
      setMessage('Failed to send password reset email. Please try again.');
    }
  };

  return (
    <div className="form2">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
