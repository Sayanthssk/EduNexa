import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../style/addtimetable.css';

const AddTimeTable = () => {
  const [timetables, setTimetables] = useState([
    { subject: '', date: '', startTime: '', endTime: '', type: 'public' }
  ]);

  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newTimetables = [...timetables];
    newTimetables[index][name] = value;
    setTimetables(newTimetables);
  };

  const handleAddTimetable = () => {
    setTimetables([...timetables, { subject: '', date: '', startTime: '', endTime: '', type: 'public' }]);
  };

  const handleRemoveTimetable = (index) => {
    const newTimetables = timetables.filter((_, i) => i !== index);
    setTimetables(newTimetables);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      for (const timetable of timetables) {
        const response = await axios.post('http://localhost:8080/api/addtimetable', timetable);
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
      }
  
      toast.success("All exam time tables added successfully", { position: 'top-right' });
      navigate('/view-timetable');
    } catch (error) {
      setMessage('Error adding exam time table');
      setSuccess(false);
      console.error('Error adding exam time table:', error.message);
    }
  };

  return (
    <div className="card-container">
      <h2>Add Exam Time Table</h2>
      <form onSubmit={handleSubmit}>
        {timetables.map((timetable, index) => (
          <div key={index} className="timetable-entry">
            <div>
              <label>Subject:</label>
              <input
                type="text"
                name="subject"
                value={timetable.subject}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
            </div>
            <div>
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={timetable.date}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
            </div>
            <div>
              <label>Start Time:</label>
              <input
                type="time"
                name="startTime"
                value={timetable.startTime}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
            </div>
            <div>
              <label>End Time:</label>
              <input
                type="time"
                name="endTime"
                value={timetable.endTime}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
            </div>
            <div>
              <label>Type:</label>
              <select
                name="type"
                value={timetable.type}
                onChange={(e) => handleInputChange(index, e)}
                required
              >
                <option value="public">Public</option>
                <option value="internal">Internal</option>
              </select>
            </div>
            {timetables.length > 1 && (
              <button type="button" onClick={() => handleRemoveTimetable(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddTimetable}>
          Add Another Timetable
        </button>
        <button type="submit">Add Time Table</button>
      </form>
      {message && <p style={{ color: success ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
};

export default AddTimeTable;
