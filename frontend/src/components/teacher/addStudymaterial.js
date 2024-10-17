import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../style/studymaterial.css';
import { useNavigate } from 'react-router-dom';

const CreateStudyMaterial = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTagsChange = (e) => {
    setFormData({
      ...formData,
      tags: e.target.value.split(',').map(tag => tag.trim())
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teacherId = localStorage.getItem('teacherId');
    if (!teacherId) {
      toast.error('Teacher ID is not available', {
        position: "top-right"
      });
      console.error('Teacher ID is missing');
      return;
    }
    

    try {
      const response = await axios.post(`http://localhost:8080/api/addstudymaterial/${teacherId}`, {
        title: formData.title,
        content: formData.content,
        tags: formData.tags
      });

      toast.success(response.data.message, {
        position: "top-right"
      });

      navigate('/studymat');
      
    } catch (error) {
      const errorMsg = error.response ? error.response.data.message : 'An error occurred';
      toast.error(errorMsg, {
        position: "top-right"
      });
    } 
  };

  return (
    <div className="create-study-material">
      <ToastContainer />
      <h2>Create Study Material</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Tags (comma-separated):</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleTagsChange}
          />
        </div>
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateStudyMaterial;
