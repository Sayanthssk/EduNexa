import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../style/ViewTeacher.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/viewteacher');
        console.log('API response:', response.data); // Log the entire response

        // Access the nested data property correctly
        if (response.data.success) {
          if (Array.isArray(response.data.data)) {
            setTeachers(response.data.data); // Use response.data.data instead of response.data.teachers
            console.log('Teachers:', response.data.data); // Log teachers array
          } else {
            toast.error('Invalid data format', { position: 'top-right' });
            console.error('Invalid data format:', response.data.data); // Log invalid format
          }
        } else {
          toast.error(response.data.message, { position: 'top-right' });
          console.error('API error:', response.data.message); // Log API error message
        }
      } catch (err) {
        toast.error('Error fetching teachers', { position: 'top-right' });
        console.error('Error fetching teachers:', err); // Log full error
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const handleDelete = async (teacherId) => {
    const officeId = localStorage.getItem('officeId');
    console.log('Officer ID from localStorage:', officeId);
    console.log('Teacher ID to delete:', teacherId);

    if (!officeId) {
      toast.error('Officer ID not found', { position: 'top-right' });
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8080/api/deleteteacher/${teacherId}/${officeId}`);
      if (response.data.success) {
        toast.success('Teacher deleted successfully', { position: 'top-right' });
        setTeachers((prevTeachers) => prevTeachers.filter((teacher) => teacher._id !== teacherId));
      } else {
        toast.error(response.data.message, { position: 'top-right' });
        console.error('Delete error:', response.data.message); // Log delete error
      }
    } catch (error) {
      console.error('Error deleting teacher:', error.response ? error.response.data : error.message);
      toast.error('Error deleting teacher', { position: 'top-right' });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!teachers || !Array.isArray(teachers)) {
    return <p>Failed to load teachers. Please try again later.</p>;
  }

  return (
    <div>
      <ToastContainer /> 
      <h2>Teacher List</h2>
      {teachers.length === 0 ? (
        <p>No teachers found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher._id}>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>{teacher.subject || 'N/A'}</td>
                <td>
                  <button onClick={() => handleDelete(teacher._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewTeacher;
