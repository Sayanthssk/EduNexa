import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/styles.css'; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Log the form data being submitted
      console.log('Submitting form data:', formData);

      const response = await axios.post('http://localhost:8080/api/login', formData);

      // Log the API response
      console.log('API Response:', response.data);

      toast.success(response.data.message, { position: "top-right" });

      const { role, name, officeId, teacherId, studentId } = response.data;

      console.log('Role:', role);
      console.log('Office ID:', officeId);
      console.log('Teacher ID:', teacherId);
      console.log('Student ID:', studentId);

      if (role === 'office') {
        if (officeId) {
          localStorage.setItem('officeId', officeId);
          navigate('/office-home', { state: { name } });
        } else {
          toast.error('Office ID not found in the response', { position: "top-right" });
        }
      } else if (role === 'student') {
        localStorage.setItem('studentId', studentId);
        navigate('/student-home', { state: { name } });
      } else if (role === 'teacher') {
        if (teacherId) {
          localStorage.setItem('teacherId', teacherId);
          navigate('/home-teacher', { state: { name } });
        } else {
          toast.error('Teacher ID not found in the response', { position: "top-right" });
          console.error('Teacher ID is missing in the response');
        }
      } else {
        toast.error('Unknown role', { position: "top-right" });
      }
    } catch (error) {
      // Log the error details
      console.error('Login error:', error);

      const errorMsg = error.response ? error.response.data.message : 'An error occurred';
      toast.error(errorMsg, { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="full-height section">
      <div className="overlay"></div>
      <div className="card">
        <ToastContainer /> 
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
