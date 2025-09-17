import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 

function DonationForm() {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: "url('https://tse4.mm.bing.net/th?id=OIP.VwbXTfs3CGE0kJ6YRkUFygHaDF&pid=Api&P=0&h=180')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
    };
    
    const container1Style = {
        backgroundColor: 'rgba(23, 177, 188, 0.8)',
        border: '2px solid #fdfffd',
        padding: '20px',
        borderRadius: '8px',
        width: '500px',
    };
    
    
    const linkStyle = {
        textDecoration: 'none', // Remove default link underline
        color: 'inherit', // Inherit parent color
    };
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        dob: '',
        occupation: '',
        phoneNumber: '',
        product: '',
        paymentMethod: '',
        amount: '',
        accountNumber: '',
        donateddate: ''
    });

    const [errors, setErrors] = useState({});
    
    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear validation error when user starts typing
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation logic
        const requiredFields = ['name', 'email', 'amount', 'address', 'dob', 'occupation', 'phoneNumber', 'accountNumber', 'product', 'paymentMethod','donateddate'];
        const newErrors = {};
        requiredFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
            }
        });
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        else {
            axios.post('http://localhost:8081/donation', formData)
                .then(res => {
                 
        alert("Thanks for generous contribution");
        navigate('/home');
                })
                .catch(err => alert(err));
        }

    };

    const handleReset = () => {
        setFormData({
            name: '',
            email: '',
            address: '',
            dob: '',
            occupation: '',
            phoneNumber: '',
            product: '',
            paymentMethod: '',
            amount: '',
            accountNumber: '',
            donateddate: ''
        });
        setErrors({});
    };

    

    return (
        <div className='donation-container' style={containerStyle} >
            <div className='donation-form' style={container1Style}>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <h2 style={{ color: "white", textAlign: "center", fontFamily: 'Lucida, monospace' }}>MAKE A DONATION</h2>
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input type="text" placeholder='Enter Name' name='name' value={formData.name} onChange={handleInput} className='form-control rounded-0' />
                        {errors.name && <span className='text-danger'>{errors.name}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='email' value={formData.email} onChange={handleInput} className='form-control rounded-0' />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                  
                    <div className='mb-3'>
                        <label htmlFor="address"><strong>Address</strong></label>
                        <input type="text" placeholder='Enter Address' name='address' value={formData.address} onChange={handleInput} className='form-control rounded-0' />
                        {errors.address && <span className='text-danger'>{errors.address}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="dob"><strong>Date of Birth</strong></label>
                        <input type="date" name="dob" value={formData.dob} onChange={handleInput} className='form-control rounded-0' />
                        {errors.dob && <span className='text-danger'>{errors.dob}</span>}
                    </div>   <div className='mb-3'>
                        <label htmlFor="occupation"><strong>Occupation</strong></label>
                        <input type="text" placeholder='Enter Occupation' name='occupation' value={formData.occupation} onChange={handleInput} className='form-control rounded-0' />
                        {errors.occupation && <span className='text-danger'>{errors.occupation}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="phoneNumber"><strong>Phone Number</strong></label>
                        <input type="tel" placeholder='Enter Phone Number' name='phoneNumber' value={formData.phoneNumber} onChange={handleInput} className='form-control rounded-0' />
                        {errors.phoneNumber && <span className='text-danger'>{errors.phoneNumber}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="product"><strong>Product(enter nil-if no product donation)</strong></label>
                        <input type="text" placeholder='Enter Product' name='product' value={formData.product} onChange={handleInput} className='form-control rounded-0' />
                        {errors.product && <span className='text-danger'>{errors.product}</span>}
                    </div>  
                    <div className='mb-3'>
                        <label htmlFor="paymentMethod"><strong>Payment Method(enter nil-if no cash donation)</strong></label>
                        <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInput} className='form-control rounded-0'>
                            <option value="">Select Payment Method</option>
                            <option value="cash">Cash</option>
                            <option value="cheque">Cheque</option>
                            <option value="card">Card</option>
                            <option value="upi">UPI</option>
                            <option value="nil">NIL</option>
                        </select>
                        {errors.paymentMethod && <span className='text-danger'>{errors.paymentMethod}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="amount"><strong>Amount</strong></label>
                        <input type="number" placeholder='Enter Amount' name='amount' value={formData.amount} onChange={handleInput} className='form-control rounded-0' />
                        {errors.amount && <span className='text-danger'>{errors.amount}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="accountNumber"><strong>Account Number</strong></label>
                        <input type="text" placeholder='Enter Account Number' name='accountNumber' value={formData.accountNumber} onChange={handleInput} className='form-control rounded-0' />
                        {errors.accountNumber && <span className='text-danger'>{errors.accountNumber}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="donateddate"><strong>Date of Donation:</strong></label>
                        <input type="date" placeholder='Enter Date of Donation ' name='donateddate' value={formData.donateddate} onChange={handleInput} className='form-control rounded-0' />
                        {errors.donateddate && <span className='text-danger'>{errors.donateddate}</span>}
                    </div>

                    <br />
                     <button type="submit" className='btn btn-primary w-100'>
                        Donate Now
                    </button>
                    <p style={{ color: "white", textAlign: "center" }}>Thank you for your generous contribution!</p>
                </form>
                <br />
                <button className='btn btn-info w-100' onClick={handleReset}>
                    Reset Form
                </button>
                <br /><br></br>
                <Link to="/home" style={linkStyle}>
                    <button className='btn btn-info w-100' >
                        Donate Later
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default DonationForm;
