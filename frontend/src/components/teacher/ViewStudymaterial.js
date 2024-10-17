import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../style/ViewTeacher.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewStudy = () => {
  const [studymat, setStudymat] = useState([]);

  const teacherId = localStorage.getItem('teacherId');

  useEffect(() => {
    const fetchStudyMaterial = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/view-studymaterial/${teacherId}`);
        console.log('API response:', response.data);

        if (response.status === 200 && response.data.length > 0) {
          setStudymat(response.data);
        } else {
          toast.error('No study materials found', { position: 'top-right' });
        }
      } catch (err) {
        toast.error('Error fetching study materials', { position: 'top-right' });
      } 
    };

    fetchStudyMaterial();
  }, [teacherId]);

  const handleDelete = async (matId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/deletematerial/${matId}`);
      
      if (response.data.success) {
        toast.success('Material deleted successfully', { position: "top-right" });    
        setStudymat((prevStud) => prevStud.filter((material) => material._id !== matId));
      } else {
        toast.error('Failed to delete material', { position: "top-right" });
      }
    } catch (error) {
      console.error('Error deleting study material:', error.response ? error.response.data : error.message);
      toast.error('Error deleting study material', { position: 'top-right' });
    }
  };


  return (
    <div>
      <ToastContainer />
      <h2>Study Material List</h2>
      {studymat.length === 0 ? (
        <p>No study materials found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Subject</th>
              <th>Content</th>
              <th>Tags</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {studymat.map((material) => (
              <tr key={material._id}>
                <td>{material.title}</td>
                <td>{material.subject}</td>
                <td>{material.content}</td>
                <td>{material.tags.join(', ')}</td>
                <td>
                  <button onClick={() => handleDelete(material._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewStudy;
