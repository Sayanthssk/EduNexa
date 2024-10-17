import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ViewAllQue = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {

      try {
        const response = await axios.get(`http://localhost:8080/api/viewQuestion`);
        setQuestions(response.data);
      } catch (error) {
        setError('Error fetching questions');
        console.error('Error fetching questions:', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);


  return (
    <div>
      <h1>View Exam Questions</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>SI No.</th>
              <th>Question</th>
              <th>Subject</th>
              <th>Marks</th> 
            </tr>
          </thead>
          <tbody>
            {questions.length > 0 ? (
              questions.map((q, index) => (
                <tr key={q._id}> 
                  <td>{index + 1}</td>
                  <td>{q.question}</td>
                  <td>{q.subject}</td>
                  <td>{q.marks}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No questions found.</td> 
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewAllQue;
