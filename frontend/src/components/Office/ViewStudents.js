import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../style/StudentList.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ViewStudent = () => {
  const [students, setStudents] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/viewStudent');
        console.log('API response:', response.data);

        if (response.data.success) {
          setStudents(response.data.data);
        } else {
          toast.error('Failed to fetch students', { position: 'top-right' });
        }
      } catch (err) {
        toast.error('Error fetching students', { position: 'top-right' });
      } 
    }

    fetchStudents();
  }, []);

  const handleDelete = async (studentId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/delete/${studentId}`);
      if (response.data.success) {
        toast.success('Student deleted successfully', { position: 'top-right' });
        setStudents((prevStudents) => prevStudents.filter((student) => student._id !== studentId));
      } else {
        toast.error('Failed to delete student', { position: 'top-right' });
      }
    } catch (err) {
      toast.error('Error deleting student', { position: 'top-right' });
    }
  };

  const handleFee = (studentId) => {
    navigate(`/set-fee/${studentId}`);
  };

  

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
              <th>Actions</th>
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
                <td>
                  <button onClick={() => handleDelete(student._id)}>Delete</button>
                  <button onClick={() => handleFee(student._id)}>Fee</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewStudent;
