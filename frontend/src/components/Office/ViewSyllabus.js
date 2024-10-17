import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const ViewSyllabus = () => {
  const [syllabus, setSyllabus] = useState([]); 

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/view-syllabus');
        console.log('API response =', response.data);

        if (response.data.success) {
          setSyllabus(response.data.data);
        } else {
          console.log('Error fetching syllabus');
        }
      } catch (error) {
        console.log('Error fetching syllabus:', error);
      }
    };

    fetchSyllabus();
  }, []);

  const handleDelete = async (syllabusId) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/delete-syllabus/${ syllabusId }`)
        if (response.data.success) {
            toast.success(response.data.message, { position:"top-right" })
            setSyllabus((prevSyllabus) => prevSyllabus.filter((syllabus) => syllabus._id !== syllabusId))
        } else {
            toast.success(response.data.message, { position: "top-right" })
        }
    } catch (error) {
        toast.error("Error wile deleting", { position: "top-right" })
        console.log("errer while deleting",error)
        
    }
  }

  return (
    <div>
      <h2>Syllabus</h2>
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Module</th>
            <th>Topics</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {syllabus.map((syllabusItem) => (
            <tr key={syllabusItem._id}>
              <td>{syllabusItem.subject}</td>
              <td>{syllabusItem.module}</td>
              <td>
                <ul>
                  {syllabusItem.topics.map((topic) => (
                    <li key={topic._id}>
                      <strong>{topic.title}:</strong> {topic.description}
                    </li>
                  ))}
                </ul>
              </td>
              <td><button onClick={() => handleDelete(syllabusItem._id)}>delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewSyllabus;
