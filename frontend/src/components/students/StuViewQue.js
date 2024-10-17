import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const StuViewQue = () => {
  const [questions, setQuestions] = useState([]);


  useEffect(() => {
    const fetchQuestions = async () => {


      try {
        const response = await axios.get(`http://localhost:8080/api/viewQuestion`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error.response ? error.response.data : error.message);
      } 
    };

    fetchQuestions();
  }, []);


  return (
    <div>
       <Link to='/student-home' style={{ textDecoration: 'none', color: 'gold', display: 'flex', alignItems: 'center' }}>
      <FaArrowLeft style={{ color: 'gold', fontSize: '24px' }} />
    </Link>
      <h1>View Exam Questions</h1>
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
    </div>
  );
};

export default StuViewQue;
