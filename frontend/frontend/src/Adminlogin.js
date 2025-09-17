import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './login.css';

function AdminLogin() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    //const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!values.email || !values.password) {
            alert("Please enter all fields");
            return;
        }

        axios.post('http://localhost:8081/adminlogin', values)
            .then(res => {
                if (res.data.message === "Success") {
                    navigate('/dashboard');
                } else {
                    alert("Incorrect credentials. Please try again.");
                }
            })
            .catch(err => {
                console.error("Error:", err);
                alert("You are not a registered admin.Please try again with correct credentials");
            });
    };

    return (
        <div className='login-container'>
            <div className='login-form'>
                <h1 style={{ color: "green", textAlign: "center" }}>ADMIN LOGIN</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='email' onChange={handleInput} className='form-control rounded-0' />
                    </div>
                    <div>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name='password' onChange={handleInput} className='form-control rounded-0' />
                    </div>
                    <br />
                    <button type="submit" className='btn btn-primary w-100' >Log in as Admin</button>
                    <p style={{ color: "green" }}>Welcome, Admin!</p>
                    <Link to="/" className='btn-default border w-100 rounded text-decoration-none ' style={{ display: 'inline-block', width: '100%', padding: '0.5rem', textAlign: 'center' }}>Back to User Login</Link>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
