import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Server } from '../constant';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !email || !password) {
      toast.error('All fields are required');
      return;
    }

    try {
      await axios.post(`${Server}/api/v1/users/register`, { username, email, password });
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      // Log the entire error for debugging
      console.error('Registration error:', error);

      // Display a more detailed error message
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || 'Registration failed';
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
        <h2 className="text-2xl mb-4">Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />
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
        <button onClick={handleRegister} className="w-full bg-blue-500 text-white p-2 rounded">
          Register
        </button>
        <p className="mt-4 text-center">
          Already have an account? <button onClick={() => navigate('/')} className="text-blue-500">Login</button>
        </p>
      </div>
    </div>
  );
};

export default Register;
