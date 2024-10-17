import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../style/styles.css';

const CreateNotification = () => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('exam');
  const [examType, setExamType] = useState('public'); 
  const [startDate, setStartDate] = useState('');
  const [isExamTypeVisible, setIsExamTypeVisible] = useState(type === 'exam');

  const navigate = useNavigate();

  const handleMessageChange = (e) => setMessage(e.target.value);

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setType(selectedType);
    setIsExamTypeVisible(selectedType === 'exam');
    if (selectedType !== 'exam') {
      setExamType('');
      setStartDate('');
    }
  };

  const handleExamTypeChange = (e) => setExamType(e.target.value);
  const handleStartDateChange = (e) => setStartDate(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      message,
      type,
      ...(type === 'exam' && { examType, startDate })
    };

    console.log('Data being sent:', data); 

    try {
      const response = await axios.post('http://localhost:8080/api/createnotification', data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Response:', response); 

      if (response.status === 201) {
        alert('Notification created successfully!');
        navigate('/office-home');
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the notification.');
    }
  };

  return (
    <div className="full-height section">
      <div className="overlay"></div>
      <div className="card">
        <h2>Create Notification</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="message">Message:</label>
            <input
              type="text"
              id="message"
              value={message}
              onChange={handleMessageChange}
              required
            />
          </div>
          <div>
            <label htmlFor="type">Type:</label>
            <select
              id="type"
              value={type}
              onChange={handleTypeChange}
              required
            >
              <option value="exam">Exam</option>
              <option value="other">Other</option>
            </select>
          </div>
          {isExamTypeVisible && (
            <>
              <div>
                <label htmlFor="examType">Exam Type:</label>
                <select
                  id="examType"
                  value={examType}
                  onChange={handleExamTypeChange}
                  required
                >
                  <option value="public">Public</option>
                  <option value="internal">Internal</option>
                </select>
              </div>
              <div>
                <label htmlFor="startDate">Start Date:</label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={handleStartDateChange}
                  required
                />
              </div>
            </>
          )}
          <button type="submit">Create Notification</button>
        </form>
      </div>
    </div>
  );
};

export default CreateNotification;
