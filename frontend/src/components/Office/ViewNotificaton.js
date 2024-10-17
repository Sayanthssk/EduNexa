import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/ViewTeacher.css'
import { toast } from 'react-toastify';

const ViewNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/getNotification');
        setNotifications(response.data.notifications);
      } catch (error) {
        setError('Error fetching notifications');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleDelete = async (notId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/deleteNotification/${ notId }`)
      if (response.data.success) {
        toast.success(response.data.message, { position: "top-right" })
        setNotifications((prevNotification) => prevNotification.filter((notification) => notification._id !== notId))
      } else {
        toast.error(response.data.message, { position: "top-right" })
      }
    } catch (error) {
      console.error('Error deleting notification:', error.response ? error.response.data : error.message);
      toast.error('Error deleting notification', { position: 'top-right' });
    }
  }

  if (loading) return <p>Loading notifications...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications available</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Message</th>
              <th>Type</th>
              {notifications[0].type === 'exam' && (
                <>
                  <th>Exam Type</th>
                  <th>Start Date</th>
                </>
              )}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification._id}>
                <td>{notification.message}</td>
                <td>{notification.type}</td>
                {notification.type === 'exam' && (
                  <>
                    <td>{notification.examType}</td>
                    <td>{new Date(notification.startDate).toLocaleDateString()}</td>
                  </>
                )}
                <td><button onClick={ () => handleDelete(notification._id) }>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewNotifications;
