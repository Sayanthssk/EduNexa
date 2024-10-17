import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';

const UpdateStu = () => {
    const { id } = useParams();
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const studentId = localStorage.getItem('studentId')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/viewperson/${studentId}`);
                setUser(response.data.data || {}); 
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const inputChangeHandler = (e) => {
        const { value, name } = e.target;
        setUser({ ...user, [name]: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/updateprofile/${studentId}`, user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigate('/student-home')
            alert('Profile updated successfully!');
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
 <Link to='/student-home' style={{ textDecoration: 'none', color: 'gold', display: 'flex', alignItems: 'center' }}>
      <FaArrowLeft style={{ color: 'gold', fontSize: '24px' }} />
    </Link>           
     <h2>Update User</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input 
                        type='text' 
                        value={user.name || ''} 
                        onChange={inputChangeHandler} 
                        id='name' 
                        name="name" 
                        autoComplete='off' 
                        placeholder='Name' 
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input 
                        type='text' 
                        value={user.email || ''} 
                        onChange={inputChangeHandler} 
                        id='email' 
                        name="email" 
                        autoComplete='off' 
                        placeholder='Email' 
                    />
                </div>
                <div>
                    <label htmlFor='phone'>Phone</label>
                    <input 
                        type='text' 
                        value={user.phone || ''} 
                        onChange={inputChangeHandler} 
                        id='phone' 
                        name="phone" 
                        autoComplete='off' 
                        placeholder='Phone' 
                    />
                </div>
                <div>
                    <label htmlFor='address'>Address</label>
                    <input 
                        type='text' 
                        value={user.address || ''} 
                        onChange={inputChangeHandler} 
                        id='address' 
                        name="address" 
                        autoComplete='off' 
                        placeholder='Address' 
                    />
                </div>
                <div>
                    <button type='submit'>Edit User</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateStu;