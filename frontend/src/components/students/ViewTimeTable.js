import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../style/ViewTeacher.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewTimeTable = () => {
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/viewexam');
        console.log('API response:', response.data);

        if (response.status === 200 && response.data.length > 0) {
          setTimetables(response.data);
        } else {
          toast.error('No timetables found', { position: 'top-right' });
        }
      } catch (err) {
        toast.error('Error fetching timetable', { position: 'top-right' });
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, []);



  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ToastContainer />
      <h2>Timetable List</h2>
      {timetables.length === 0 ? (
        <p>No timetable found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Exam Type</th>
            </tr>
          </thead>
          <tbody>
            {timetables.map((tts) => (
              <tr key={tts._id}>
                <td>{tts.subject}</td>
                <td>{new Date(tts.date).toLocaleDateString()}</td>
                <td>{tts.startTime}</td>
                <td>{tts.endTime}</td>
                <td>{tts.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewTimeTable;
