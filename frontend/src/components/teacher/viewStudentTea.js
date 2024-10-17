import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'; 

const ViewStudentTea = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/viewStudent');
        console.log('API response:', response.data);

        
        if (response.data && response.data.data) {
          setStudents(response.data.data);
        } else {
          toast.error('Failed to fetch students', { position: 'top-right' });
        }
      } catch (err) {
        toast.error('Error fetching students', { position: 'top-right' });
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ToastContainer />
      <h2>Student List</h2>
      {students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Register Number</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.registerNo}</td>
                <td>{student.phone}</td>
                <td>{student.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewStudentTea;
