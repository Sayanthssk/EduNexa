import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../style/setFees.css'

const SetFee = () => {
  const { studentId } = useParams();
  const [amount, setAmount] = useState('');
  const [lastDate, setLastDate] = useState(''); 
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8080/api/fee', {
        userId: studentId, 
        amount,
        lastDate, 
        description
      });
      
      if (response.data.success) {
        toast.success(response.data.message, { position: 'top-right' });
        navigate('/all-fee-notification'); 
      } else {
        toast.error(response.data.message, { position: 'top-right' });
      }
    } catch (error) {
      toast.error('Error creating fee payment', { position: 'top-right' });
    }
  };

  return (
    <div className="full-height section">
    <div className="overlay"></div>
    <div className="card">
      <ToastContainer />
      <h2>Set Fee Payment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Date:</label>
          <input
            type="date"
            value={lastDate} 
            onChange={(e) => setLastDate(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Submit Fee Payment</button>
      </form>
    </div>
    </div>
  );
};

export default SetFee;
