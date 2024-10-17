import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../style/ViewTeacher.css';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowLeft } from 'react-icons/fa';


const ViewTeacherStu = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/viewteacher');
        console.log('API response:', response.data); 

        if (response.data.success) {
          if (Array.isArray(response.data.data)) {
            setTeachers(response.data.data);
            console.log('Teachers:', response.data.data); 
          } else {
            toast.error('Invalid data format', { position: 'top-right' })
            console.error('Invalid data format:', response.data.data);
          }
        } else {
          toast.error(response.data.message, { position: 'top-right' })
          console.error('API error:', response.data.message)
        }
      } catch (err) {
        toast.error('Error fetching teachers', { position: 'top-right' })
        console.error('Error fetching teachers:', err)
      } finally {
        setLoading(false)
      }
    };

    fetchTeachers();
  }, []);


  if (loading) {
    return <p>Loading...</p>;
  }

  if (!teachers || !Array.isArray(teachers)) {
    return <p>Failed to load teachers. Please try again later.</p>;
  }

  return (
    <div>
      <ToastContainer /> 
      <Link to='/student-home' style={{ textDecoration: 'none', color: 'gold', display: 'flex', alignItems: 'center' }}>
      <FaArrowLeft style={{ color: 'gold', fontSize: '24px' }} />
    </Link>
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
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher._id}>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>{teacher.subject || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewTeacherStu;
