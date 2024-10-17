import React, { useEffect, useState } from 'react';
import '../../style/ViewStudyMaterial.css'

const ViewStudyMaterial = () => {
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudyMaterials = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/viewstudymaterial/');
        if (!response.ok) {
          throw new Error('Failed to fetch study materials');
        }
        const data = await response.json();
        setStudyMaterials(data);
      } catch (err) {
        setError(err.message);
        console.log(err);
        
      }
    };

    fetchStudyMaterials();
  }, []);

  return (
    <div className="container">
      <h1 className="header">View Study Material</h1>
      {error ? (
        <p className="error">Error fetching study materials: {error}</p>
      ) : (
        <table className="study-material-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Subject</th>
              <th>Content</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {studyMaterials.map(material => (
              <tr key={material._id}>
                <td>{material.title}</td>
                <td>{material.subject}</td>
                <td>{material.content}</td>
                <td>{material.tags.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewStudyMaterial;
