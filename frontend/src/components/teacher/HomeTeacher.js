import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../../style/HomeOffice.css'; 

const HomeTeacher = () => {
  const location = useLocation();
  const { name } = location.state || {};
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/logout');
  };
  

  

  return (
    <div className="home-office">
      <h2>Welcome to the teacher Home Page</h2>
      {name && <p>Hello, {name}!</p>}
      <nav className="navbar">
        <Link to='/updatetea'>Update</Link>
        <Link to='/view-student-tea'> View Students </Link>
        <Link to='/add-study-material'> Add Study Material </Link>
        <Link to='/notifications'> View Notifications </Link>
        <Link to='/timetable'> View Timetable </Link>
        <Link to='/studymat'> View study material </Link>
        <Link to='/examque'> Add Question </Link>
        <Link to='/viewQue'> view Question </Link>
        <Link to= '/viewsyll'>View Syllabus</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
};

export default HomeTeacher;
