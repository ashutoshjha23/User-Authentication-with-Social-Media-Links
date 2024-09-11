import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './ResetPassword.css';



const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/reset-password', { token, newPassword });
      if (response.status === 200) {
        setMessage('Password reset successfully! You can now log in.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="form1">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
