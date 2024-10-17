import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ExamQuestion = () => {
  const [questions, setQuestions] = useState([{ question: '', marks: '' }]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate()
  
  const teacherId = localStorage.getItem('teacherId');

  const handleChange = (index, e) => {
    const newQuestions = [...questions];
    newQuestions[index][e.target.name] = e.target.value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', marks: '' }]);
  };

  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!teacherId) {
      setMessage('Teacher ID not found');
      setLoading(false);
      return;
    }
    
    try {
      console.log('Submitting questions:', questions);
      
      const formattedQuestions = questions.map(q => ({
        question: q.question,
        marks: q.marks
      }));
      
      const response = await axios.post(`http://localhost:8080/api/createquestion/${teacherId}`, formattedQuestions);
      navigate('/viewQue')
      toast.success(response.data.message, { position: "top-right" });
    } catch (error) {
      console.error('Error creating exam questions:', error.response ? error.response.data : error.message);
      setMessage('Error creating questions');
    } 
  };

  return (
    <div>
      <h1>Create Exam Questions</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div key={index}>
            <label>
              Question {index + 1}:
              <input
                type="text"
                name="question"
                value={q.question}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </label>
            <label>
              Marks:
              <input
                type="number"
                name="marks"
                value={q.marks}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </label>
            <button type="button" onClick={() => removeQuestion(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addQuestion}>Add Another Question</button>
        <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Submit'}</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ExamQuestion;
