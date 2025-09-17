import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdoptionForm = () => {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
        backgroundImage: "url('https://images.indianexpress.com/2019/08/adoption.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
    };

    const formStyle = {
        backgroundColor: 'rgb(206, 180, 108,0.8)',
        border: '2px solid #fdfffd',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        width: '100%'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold'
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    };

    const buttonStyle = {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        width: '100%',
        fontSize: '16px',
        marginTop: '10px'
    };

    const resetButtonStyle = {
        backgroundColor: '#f44336',
        color: 'white',
        padding: '10px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        width: '100%',
        fontSize: '16px',
        marginTop: '10px'
    };

    const linkStyle = {
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
        marginTop: '10px'
    };

    const quoteStyle = {
        marginTop: '20px',
        fontWeight: 'bold',
        textAlign: 'center'
    };

    const termsStyle = {
        marginTop: '20px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#f9f9f9'
    };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        placeOfBirth: '',
        gender: '',
        phoneNumber: '',
        email: '',
        occupation: '',
        salary: '',
        maritalStatus: '',
        residedInAnotherState: '',
        residenceDetails: '',
        streetAddress: '',
        city: '',
        region: '',
        pincode: '',
        contactMethod: '',
        child_id: '',
        child_name: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleTermsChange = (e) => {
        setTermsAccepted(e.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const requiredFields = ['firstName', 'lastName', 'dob', 'placeOfBirth', 'gender', 'phoneNumber', 'email', 'occupation', 'salary', 'maritalStatus', 'residedInAnotherState', 'streetAddress', 'city', 'region', 'pincode', 'contactMethod'];
        const newErrors = {};
        requiredFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
            }
        });
    
        if (!termsAccepted) {
            alert("You must accept the terms and conditions to proceed.");
            return;
        }
    
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        } else {
            axios.post('http://localhost:8081/adoption', formData)
                .then(res => {
                    alert("You are successfully registered, your contribution means a lot to us. Thanks for registering!");
                    navigate('/home');
                })
                .catch(err => alert(err));
        }
    };
    

    const handleReset = () => {
        setFormData({
            firstName: '',
            lastName: '',
            dob: '',
            placeOfBirth: '',
            gender: '',
            phoneNumber: '',
            email: '',
            occupation: '',
            salary: '',
            maritalStatus: '',
            residedInAnotherState: '',
            residenceDetails: '',
            streetAddress: '',
            city: '',
            region: '',
            pincode: '',
            contactMethod: '',
            child_id: '',
            child_name:''
        });
        setErrors({});
    };

    return (
        <div style={containerStyle}>
            <div style={formStyle}>
                <form onSubmit={handleSubmit}>
                    <h2 style={{ textAlign: 'center', marginBottom: '20px', fontFamily: 'Lucida, monospace' }}>Adoption Form</h2>
                    <label style={labelStyle} htmlFor="firstName">First Name</label>
                    <input style={inputStyle} type="text" placeholder='Enter firstName' name="firstName" value={formData.firstName} onChange={handleInput} />
                    {errors.firstName && <span className='text-danger'>{errors.firstName}</span>}

                    <label style={labelStyle} htmlFor="lastName">Last Name</label>
                    <input style={inputStyle} type="text" placeholder='Enter lastName' name="lastName" value={formData.lastName} onChange={handleInput} />
                    {errors.lastName && <span className='text-danger'>{errors.lastName}</span>}

                    <label style={labelStyle} htmlFor="dob">Date of Birth</label>
                    <input style={inputStyle} type="date" name="dob" value={formData.dob} onChange={handleInput} />
                    {errors.dob && <span className='text-danger'>{errors.dob}</span>}

                    <label style={labelStyle} htmlFor="placeOfBirth">Place of Birth</label>
                    <input style={inputStyle} type="text" placeholder='Enter PlaceOfBirth' name="placeOfBirth" value={formData.placeOfBirth} onChange={handleInput} />
                    {errors.placeOfBirth && <span className='text-danger'>{errors.placeOfBirth}</span>}

                    <label style={labelStyle} htmlFor="gender">Gender</label>
                    <select style={inputStyle} name="gender" value={formData.gender} onChange={handleInput}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.gender && <span className='text-danger'>{errors.gender}</span>}

                    <label style={labelStyle} htmlFor="phoneNumber">Phone Number</label>
                    <input style={inputStyle} type="tel" placeholder='Enter Phoneno' name="phoneNumber" value={formData.phoneNumber} onChange={handleInput} />
                    {errors.phoneNumber && <span className='text-danger'>{errors.phoneNumber}</span>}

                    <label style={labelStyle} htmlFor="email">Email</label>
                    <input style={inputStyle} type="email" placeholder='Enter Email' name="email" value={formData.email} onChange={handleInput} />
                    {errors.email && <span className='text-danger'>{errors.email}</span>}

                    <label style={labelStyle} htmlFor="occupation">Occupation</label>
                    <input style={inputStyle} type="text" placeholder='Enter Occupation' name="occupation" value={formData.occupation} onChange={handleInput} />
                    {errors.occupation && <span className='text-danger'>{errors.occupation}</span>}

                    <label style={labelStyle} htmlFor="salary">Salary</label>
                    <input style={inputStyle} type="number" placeholder='Enter Salary' name="salary" value={formData.salary} onChange={handleInput} />
                    {errors.salary && <span className='text-danger'>{errors.salary}</span>}

                    <label style={labelStyle} htmlFor="maritalStatus">Marital Status</label>
                    <select style={inputStyle} name="maritalStatus" value={formData.maritalStatus} onChange={handleInput}>
                        <option value="">Select Marital Status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="separated">Separated</option>
                        <option value="divorced">Divorced</option>
                        <option value="widow">Widow/Widower</option>
                    </select>
                    {errors.maritalStatus && <span className='text-danger'>{errors.maritalStatus}</span>}

               

                    <label style={labelStyle} htmlFor="residedInAnotherState">Have you resided in another state?</label>
                    <select style={inputStyle} name="residedInAnotherState" value={formData.residedInAnotherState} onChange={handleInput}>
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    {errors.residedInAnotherState && <span className='text-danger'>{errors.residedInAnotherState}</span>}

                    {formData.residedInAnotherState === 'yes' && (
                        <>
                            <label style={labelStyle} htmlFor="residenceDetails">If yes, please supply details</label>
                            <input style={inputStyle} type="text" placeholder='Enter residence details' name="residenceDetails" value={formData.residenceDetails} onChange={handleInput} />
                            {errors.residenceDetails && <span className='text-danger'>{errors.residenceDetails}</span>}
                        </>
                    )}

                    <label style={labelStyle} htmlFor="streetAddress">Street Address</label>
                    <input style={inputStyle} type="text" placeholder='Enter streetAddress' name="streetAddress" value={formData.streetAddress} onChange={handleInput} />
                    {errors.streetAddress && <span className='text-danger'>{errors.streetAddress}</span>}

                    <label style={labelStyle} htmlFor="city">City</label>
                    <input style={inputStyle} type="text" placeholder='Enter City' name="city" value={formData.city} onChange={handleInput} />
                    {errors.city && <span className='text-danger'>{errors.city}</span>}

                    <label style={labelStyle} htmlFor="region">Region</label>
                    <input style={inputStyle} type="text" placeholder='Enter Region' name="region" value={formData.region} onChange={handleInput} />
                    {errors.region && <span className='text-danger'>{errors.region}</span>}

                    <label style={labelStyle} htmlFor="pincode">Pincode</label>
                    <input style={inputStyle} type="number" placeholder='Enter Pincode' name="pincode" value={formData.pincode} onChange={handleInput} />
                    {errors.pincode && <span className='text-danger'>{errors.pincode}</span>}

                    <label style={labelStyle} htmlFor="contactMethod">How can we contact you?</label>
                    <select style={inputStyle} name="contactMethod" value={formData.contactMethod} onChange={handleInput}>
                        <option value="">Select Contact Method</option>
                        <option value="phone">Phone</option>
                        <option value="address">Address</option>
                        <option value="email">Email</option>
                    </select>
                    {errors.contactMethod && <span className='text-danger'>{errors.contactMethod}</span>}

                    
                    <label style={labelStyle} htmlFor="child_id">Child_ID</label>
                    <input style={inputStyle} type="number" placeholder='Enter Child_Id' name="child_id" value={formData.child_id} onChange={handleInput} />
                    {errors.child_id && <span className='text-danger'>{errors.child_id}</span>}

                    <label style={labelStyle} htmlFor="child_name">Child_Name</label>
                    <input style={inputStyle} type="text" placeholder='Enter Child_Name' name="child_name" value={formData.child_name} onChange={handleInput} />
                    {errors.child_name && <span className='text-danger'>{errors.child_name}</span>}

                    <div style={termsStyle}>
                        <h3>Terms and Conditions</h3>
                        <p>
                            The prospective adoptive parents need to be physically, emotionally and mentally stable.
                            They should be financially stable.
                            The prospective parents should not be suffering from any life-threatening diseases.
                            Couples with three or more kids are not considered for adoption except in the case of special-needs children.
                            A single female can adopt a child of any gender. However, a single male is not eligible to adopt a girl child.
                            A single parent cannot be more than 55 years of age.
                            A couple cannot have a cumulative age of more than 110 years.
                            The parents' age as of the date of registration should be as per CARA guidelines to be eligible for adoption.Your Salary should be greater than 20000.
                            Parents need to ensure that their child feels loved and supported, both emotionally and financially. They should be affectionate towards their child and provide encouragement and praise for their achievements.
                        </p>
                        <label>
                            <input type="checkbox" checked={termsAccepted} onChange={handleTermsChange} />
                            I accept all terms and conditions mentioned above.
                        </label>
                    </div>
                    <Link to='/childrenview'><button style={buttonStyle}>View children list</button></Link>
                    <button type="submit" style={buttonStyle}>Submit</button>
                    <button type="button" style={resetButtonStyle} onClick={handleReset}>Reset Form</button>
                </form>
                <Link to="/home" style={linkStyle}>
                    <button style={buttonStyle} onClick={handleReset}>Adopt Later</button>
                </Link>
                <p style={quoteStyle}>
                    We didn't give you the gift of life. Life gave us the gift of you.
                </p>
            </div>
        </div>
    );
};

export default AdoptionForm;
