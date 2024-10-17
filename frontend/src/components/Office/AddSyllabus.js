import React, { useState } from 'react';
import axios from 'axios';
import '../../style/addSyllabus.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddSyllabus = () => {
  const [subject, setSubject] = useState('');
  const [module, setModule] = useState('');
  const [topics, setTopics] = useState([{ title: '', description: '' }]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate()

  const handleTopicChange = (index, field, value) => {
    const newTopics = [...topics];
    newTopics[index][field] = value;
    setTopics(newTopics);
  };

  const handleAddTopic = () => {
    setTopics([...topics, { title: '', description: '' }]);
  };

  const handleRemoveTopic = (index) => {
    const newTopics = topics.filter((_, i) => i !== index);
    setTopics(newTopics);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8080/api/addsyllabus', {
        subject,
        module,
        topics
      });
      console.log('Response:', response); 
      toast.success(response.data.message, {position:"top-right"})
      navigate('/view-syllabus')
      setError('');
    } catch (err) {
      console.error('Error:', err); 
      setError('Error adding syllabus. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="create-syllabus">
      <h1>Add Syllabus</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="module">Module:</label>
          <input
            type="text"
            id="module"
            value={module}
            onChange={(e) => setModule(e.target.value)}
            required
          />
        </div>
        <div>
          <h3>Topics:</h3>
          {topics.map((topic, index) => (
            <div key={index} className="topic">
              <label htmlFor={`title-${index}`}>Title:</label>
              <input
                type="text"
                id={`title-${index}`}
                value={topic.title}
                onChange={(e) => handleTopicChange(index, 'title', e.target.value)}
                required
              />
              <label htmlFor={`description-${index}`}>Description:</label>
              <textarea
                id={`description-${index}`}
                value={topic.description}
                onChange={(e) => handleTopicChange(index, 'description', e.target.value)}
                required
              />
              <button type="button" onClick={() => handleRemoveTopic(index)}>
                Remove Topic
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddTopic}>
            Add Topic
          </button>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddSyllabus;
