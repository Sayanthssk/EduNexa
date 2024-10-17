import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../style/StudentList.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllFeeNotifications = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/all-fee-notifications');
        if (response.data.success) {
          setFees(response.data.notifications);
        } else {
          toast.error('Failed to fetch fee notifications', { position: 'top-right' });
        }
      } catch (err) {
        toast.error('Error fetching fee notifications', { position: 'top-right' });
      } finally {
        setLoading(false);
      }
    };

    fetchFees();
  }, []);


  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/delete-fee-notification/${id}`);
      if (response.data.success) {
        toast.success('Fee notification deleted successfully', { position: 'top-right' });
        setFees(prevFees => prevFees.filter(fee => fee._id !== id));
      } else {
        toast.error('Failed to delete fee notification', { position: 'top-right' });
      }
    } catch (err) {
      console.error('Error deleting fee notification:', err);
      toast.error('Error deleting fee notification', { position: 'top-right' });
    }
  };
  

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ToastContainer />
      <div >
        <h2>Fee Notifications</h2>
        {fees.length === 0 ? (
          <p>No fee notifications found</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>User Phone</th>
                <th>Amount</th>
                <th>Last Date</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((fee) => (
                <tr key={fee._id}>
                  <td>{fee.userName}</td>
                  <td>{fee.userPhone}</td>
                  <td>{fee.amount}</td>
                  <td>{new Date(fee.lastDate).toLocaleDateString()}</td>
                  <td>{fee.description}</td>
                  <td>
                    <button onClick={() => handleDelete(fee._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllFeeNotifications;
