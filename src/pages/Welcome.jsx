import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Server } from '../constant';

const Welcome = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${Server}/api/v1/users/logout`, {}, { withCredentials: true });
      toast.success('Logged out successfully!');
      navigate('/'); // Redirect to login page after logout
    } catch (error) {
      // Log the entire error for debugging
      console.error('Logout error:', error);

      // Display a more detailed error message
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || 'Logout failed!';
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error('Network error. Please try again later.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center h-screen relative">
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 bg-gray-300 text-black p-2 rounded"
      >
        Go Back
      </button>
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl mb-4">Welcome!</h2>
        <p className="text-lg mb-4">You successfully entered the page!</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded mt-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Welcome;
