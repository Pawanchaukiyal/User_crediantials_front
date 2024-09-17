import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSignInAlt } from 'react-icons/fa';
import { Server } from '../constant';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Both fields are required');
      return;
    }

    try {
      await axios.post(`${Server}/api/v1/users/login`, { email, password }, { withCredentials: true });
      toast.success('Login successful!');
      navigate('/welcome');
    } catch (error) {
      // Log the entire error for debugging
      console.error('Login error:', error);

      // Display a more detailed error message
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || 'Invalid credentials';
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error('Network error. Please try again later.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />
        <button onClick={handleLogin} className="w-full bg-blue-500 text-white p-2 rounded flex items-center justify-center">
          <FaSignInAlt className="mr-2" /> Login
        </button>
        <div className="mt-4 text-center">
          <p>
            No Account? <button onClick={() => navigate('/register')} className="text-blue-500 underline">Register here</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
