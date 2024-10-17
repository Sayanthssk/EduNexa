import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/ViewTeacher.css'


const ViewNot = () => {
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewNot;
