import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/register', {
        email,
        password,
      });

      if (response.status === 201) {
        setMessage('Signup successful!');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      setMessage('Signup failed.');
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <p className="heading">Sign Up</p>
        <input
          className="input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn" type="submit">Sign Up</button>
        {message && <p className="message">{message}</p>}
        <div className="login-link">
          <p>Already have an account?</p>
          <Link to="/login" className="login-button">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
