import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'
import Validation from './signupvalidation';
import './login.css'

function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });
    const navigate =useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    }

   
    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate form fields
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        // Check if there are no validation errors
        if (Object.values(validationErrors).every(error => error === "")) {
            axios.post('http://localhost:8081/signup', values)
                .then(res => {
                    navigate('/');
                })
                .catch(err => alert('If already a user,cannot signup'));
        }
    }
    return (
        <div className='login-container'>
            <div className='login-form'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <h1 style={{ color: "black", textAlign: "center" }}>HOME OF LOVE</h1>
                        <h2 style={{ color: "green" }}>SIGN-UP</h2>
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input type="name" placeholder='Enter Name' name='name' value={values.name} onChange={handleInput} className='form-control rounded-0' />
                        {errors.name && <span className='text-danger'>{errors.name}</span>}
                    </div>
                    <div>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='email' value={values.email} onChange={handleInput} className='form-control rounded-0' />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name='password' value={values.password} onChange={handleInput} className='form-control rounded-0' />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <br />
                    <button type='submit' className='btn btn-success w-100' rounded>
                        Sign up
                    </button>
                    <p style={{ color: "green" }}>Thanks for your support!</p>
                    <Link to="/" className='btn-default border w-100 rounded text-decoration-none ' style={{ display: 'inline-block', width: '100%', padding: '0.5rem', textAlign: 'center', backgroundColor: 'white' }}>Login</Link>
                </form>
            </div>
        </div>
    )
}

export default Signup;