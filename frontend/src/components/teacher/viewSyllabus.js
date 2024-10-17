import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

const ViewSyll = () => {
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

  return (
    <div>
      <h2>Syllabus</h2>
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Module</th>
            <th>Topics</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewSyll;
