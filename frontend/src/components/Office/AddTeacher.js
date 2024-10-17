import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../style/styles.css';
import { useNavigate } from 'react-router-dom';

const AddTeacher = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    subject: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const officeId = localStorage.getItem('officeId');

    if (!officeId) {
      toast.error('Officer ID not found', { position: 'top-right' });
      return;
    }

    // Basic validation example
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields.', { position: 'top-right' });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`http://localhost:8080/api/addteacher/${officeId}`, formData);
      if (response.data.success) {       
        toast.success('Teacher added successfully', { position: 'top-right' });
        navigate('/view-teacher');
      } else {
        toast.error(response.data.message, { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error adding teacher:', error.response ? error.response.data : error.message);
      toast.error('Error adding teacher', { position: 'top-right' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="full-height section">
      <div className="overlay"></div>
      <div className="card">
        <ToastContainer />
        <h2>Add Teacher</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" />
          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Teacher'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTeacher;
