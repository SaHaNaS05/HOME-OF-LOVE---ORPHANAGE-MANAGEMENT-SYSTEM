import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import Validation from './loginvalidation';
import './login.css';

function Login() {
    
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);

    const handleInput = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };
    // Redirect to admin login if isAdmin is true
    if (isAdmin) {
        navigate('/adminlogin'); // Redirect to AdminLogin if isAdmin is true
        return;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors = Validation(values);
        setErrors(validationErrors);

        if (Object.values(validationErrors).every(error => error === "")) {
            axios.post('http://localhost:8081/login', values)
                .then(res => {
                    console.log(res);
                    if (res.data.message === "Success") {
                        navigate('/home');
                    } else if (res.data.error === "IncorrectPassword") {
                        alert("Incorrect password. Please try again.");
                    } else {
                        alert("No record existed");
                    }
                })
                .catch(err => alert("incorrect password"));
        }
    };
    const handleUserClick = () => {
        setIsAdmin(false); // Set isAdmin to false when user button is clicked
    };

    // Function to handle admin button click
    const handleAdminClick = () => {
        setIsAdmin(true); // Set isAdmin to true when admin button is clicked
    };
    return (
        <div className='login-container' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
             <h1 style={{ color: "white", textAlign: "center" ,}}>HOME OF LOVE</h1>
             <div className='login-buttons'>
                <button onClick={handleUserClick} className='btn' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '20px', color: 'black' }}>User</button>
                <button onClick={handleAdminClick} className='btn' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '20px' }}>Admin</button>
            </div>
            <div className='login-form' style={{width: '300px'}}>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <h2 style={{ color: "green" }}> USER LOG IN</h2>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='email' onChange={handleInput} className='form-control rounded-0' />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name='password' onChange={handleInput} className='form-control rounded-0' />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <br />
                    <button type="submit" className='btn btn-success w-100'>
                        Log in as user
                    </button>
                    <p style={{ color: "green" }}>Thanks for your support!</p>
                    <Link to="/signup" className='btn-default border w-100 rounded text-decoration-none ' style={{ display: 'inline-block', width: '100%', padding: '0.5rem', textAlign: 'center' }}>Create Account</Link>
                </form>
            </div>
        </div>
    );
    
}

export default Login;

