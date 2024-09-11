import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login', {
        email,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        navigate('/home');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="form">
      <h2 className="heading">Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
      {message && <p className="error-message">{message}</p>}
      <div className="signup-link">
        <p>Don't have an account?</p>
        <Link to="/signup" className="signup-button">Sign Up</Link>
      </div>
      <div className="forgot-password-link">
        <p>Forgot your password?</p>
        <Link to="/forgot-password" className="forgot-password-button">Reset Password</Link>
      </div>
    </div>
  );
};

export default Login;
