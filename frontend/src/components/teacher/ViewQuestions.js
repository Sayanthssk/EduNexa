import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ViewQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      const teacherId = localStorage.getItem('teacherId');

      if (!teacherId) {
        setError('Teacher ID not found in local storage');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/viewquestion/${teacherId}`);
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

  const handleDelete = async (questionId) => {
    try {
      await axios.delete(`http://localhost:8080/api/deleteQuestion/${questionId}`);
      toast.success('Question deleted successfully', { position: "top-right" });
      setQuestions(questions.filter(q => q._id !== questionId));

    } catch (error) {
      setError('Error deleting question');
      console.error('Error deleting question:', error.response ? error.response.data : error.message);
    }
  };

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
              <th>Actions</th> 
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
                  <td>
                    <button onClick={() => handleDelete(q._id)}>Delete</button> 
                  </td>
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

export default ViewQuestions;
