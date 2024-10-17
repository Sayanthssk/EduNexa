import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token'); 

    
    toast.success('Logged out successfully', {
      position: "top-right"
    });

    setTimeout(() => {
      navigate('/');
    }, 1000); 
  }, [navigate]);

  return (
    <div>
      <ToastContainer />
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
