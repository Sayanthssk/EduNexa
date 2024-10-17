import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../style/ViewTeacher.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewStudNot = () => {
  const [feeNotifications, setFeeNotifications] = useState([]);

  const studentId = localStorage.getItem('studentId');
  console.log('Student ID retrieved from local storage:', studentId);

  useEffect(() => {
    const fetchFeeNotifications = async () => {
      if (!studentId) {
        toast.error('Student ID not found in local storage', { position: 'top-right' });
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/notifications/${studentId}`);
        console.log('API response:', response.data);

        if (response.status === 200 && response.data.fees.length > 0) {
          setFeeNotifications(response.data.fees);
        } else {
          toast.error('No notifications found for this student', { position: 'top-right' });
        }
      } catch (err) {
        console.error('Error fetching Fee notifications:', err.response ? err.response.data : err.message);
        toast.error('Error fetching Fee notifications', { position: 'top-right' });
      }
    };

    fetchFeeNotifications();
  }, [studentId]);

  const handlePayFee = async (feeId) => {
    try {
      await axios.delete(`http://localhost:8080/api/delete-fee-notification/${ feeId }`)
      toast.success('Fee paid successfully', {  position: "top-right" })
      setFeeNotifications(prevFees => prevFees.filter(fee => fee._id !== feeId));
    } catch (error) {
      console.error('Error paying fee:', error);
      toast.error('Error paying fee', { position: 'top-right' });
    }
  }

  return (
    <div>
      <ToastContainer />
      <h2>Fee Notifications</h2>
      {feeNotifications.length === 0 ? (
        <p>No notifications found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Last Date</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feeNotifications.map((fee) => (
              <tr key={fee._id}>
                <td>{fee.amount}</td>
                <td>{new Date(fee.lastDate).toLocaleDateString()}</td>
                <td>{fee.description}</td>
                <td>
                  <button onClick={() => handlePayFee(fee._id)}>Pay Fee</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewStudNot;
