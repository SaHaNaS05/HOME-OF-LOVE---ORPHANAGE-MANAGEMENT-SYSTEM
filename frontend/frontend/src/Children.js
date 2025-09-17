import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const ChildrenPage = () => {
    

    // Inline styles
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL}/image2.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundColor: '#f0f0f0'
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        width: '100%'
    };

    const imageStyle = {
        width: '150px',
        height: '150px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        objectFit: 'cover'
    };

    const formStyle = {
        backgroundColor: ' rgba(218, 190, 101, 0.8)',
        border: '2px solid #fdfffd',
        padding: '20px',
        borderRadius: '8px',
        width: '500px',
    };
     
    const linkStyle = {
        textDecoration: 'none', // Remove default link underline
        color: 'inherit', // Inherit parent color
    };

    const labelStyle = {
        alignSelf: 'flex-start',
        marginTop: '10px'
    };

    const [childData, setChildData] = useState({
        name: '',
        gender: '',
        dob: '',
        age: '',
        placeOfBirth: '',
        school: '',
        class: '',
        siblings: '',
        parentGuardian: '',
        guardianDetails: {
            name: '',
            address: '',
            phoneNumber: '',
            email: '',
            occupation: '',
            relationship: ''
        },
        parentDetails: {
            father: {
                name: '',
                qualification: '',
                occupation: '',
                phoneNumber: ''
            },
            mother: {
                name: '',
                qualification: '',
                occupation: '',
                phoneNumber: ''
            },
            address: ''
        },
        imageSrc: ''
    });

    const [imageLink, setImageLink] = useState('');
    const [parentType, setParentType] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setChildData({
            ...childData,
            [name]: value
        });
    };

    const handleGuardianDetailsChange = (e) => {
        const { name, value } = e.target;
        setChildData({
            ...childData,
            guardianDetails: {
                ...childData.guardianDetails,
                [name]: value
            }
        });
    };

    const handleParentDetailsChange = (e) => {
        const { name, value } = e.target;
        const parentField = name.split('-')[1]; 
        const parentType = name.split('-')[0]; 
        setChildData({
            ...childData,
            parentDetails: {
                ...childData.parentDetails,
                [parentType]: {
                    ...childData.parentDetails[parentType],
                    [parentField]: value
                }
            }
        });
    };

    const handleAddressChange = (e) => {
        const { value } = e.target;
        setChildData({
            ...childData,
            parentDetails: {
                ...childData.parentDetails,
                address: value
            }
        });
    };

    const handleImageLinkChange = (e) => {
        setImageLink(e.target.value);
    };

    const handleImageAttach = () => {
        setChildData({
            ...childData,
            imageSrc: imageLink
        });
    };

    const handleImageFileAttach = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            setChildData({
                ...childData,
                imageSrc: event.target.result
            });
        };
        reader.readAsDataURL(file);
    };

    const handleParentTypeChange = (e) => {
        setParentType(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if all fields are entered
        if (validateForm()) {
            axios.post('http://localhost:8081/children', childData)
                .then(response => {
                    console.log('Form submitted:', response.data);
                    alert("Thanks for submission");
                    navigate('/dashboard/childrenedit');
                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                    alert('Error submitting form');
                });
        } else {
            alert('Please fill in all fields.');
        }
    };

    const validateForm = () => {
        // Check compulsory fields
        const compulsoryFields = ['name', 'gender', 'dob', 'age', 'placeOfBirth', 'school', 'class', 'siblings'];
        for (const field of compulsoryFields) {
            if (!childData[field]) {
                return false;
            }
        }

        
        if (childData.parentGuardian === 'guardian') {
            const guardianFields = ['name', 'address', 'phoneNumber', 'email', 'occupation', 'relationship'];
            for (const field of guardianFields) {
                if (!childData.guardianDetails[field]) {
                    return false;
                }
            }
        }

       if (childData.parentGuardian === 'parent') {
            if (parentType === 'father' || parentType === 'both') {
                const fatherFields = ['name', 'qualification', 'occupation', 'phoneNumber'];
                for (const field of fatherFields) {
                    if (!childData.parentDetails.father[field]) {
                        return false;
                    }
                }
            }
            if (parentType === 'mother' || parentType === 'both') {
                const motherFields = ['name', 'qualification', 'occupation', 'phoneNumber'];
                for (const field of motherFields) {
                    if (!childData.parentDetails.mother[field]) {
                        return false;
                    }
                }
            }
            if (parentType === 'both' && !childData.parentDetails.address) {
                return false;
            }
            
        }

        return true;
    };

    return (
        <div style={containerStyle}>
            
            <form style={formStyle} onSubmit={handleSubmit}>
               
            <div style={headerStyle}>
            <h1 style={{  fontFamily: 'Lucida, monospace' }}>CHILDREN INFO </h1> 
                {childData.imageSrc && <img src={childData.imageSrc} alt="Child" style={imageStyle} />}
            </div>
                <label style={labelStyle}>Name:</label>
                <input type="text" name="name" value={childData.name} onChange={handleInputChange} /><br></br>
    
                <label style={labelStyle}>Gender:</label>
                <input type="text" name="gender" value={childData.gender} onChange={handleInputChange} /><br></br>
    
                <label style={labelStyle}>Date of Birth:</label>
                <input type="date" name="dob" value={childData.dob} onChange={handleInputChange} /><br></br>
    
                <label style={labelStyle}>Age:</label>
                <input type="text" name="age" value={childData.age} onChange={handleInputChange} /><br></br>
    
                <label style={labelStyle}>Place of Birth:</label>
                <input type="text" name="placeOfBirth" value={childData.placeOfBirth} onChange={handleInputChange} /><br></br>
    
                <label style={labelStyle}>School:</label>
                <input type="text" name="school" value={childData.school} onChange={handleInputChange} /><br></br>
    
                <label style={labelStyle}>Class:</label>
                <select name="class" value={childData.class} onChange={handleInputChange}>
                    <option value="">Select Class</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                    <option value="1st">1st</option>
                    <option value="2nd">2nd</option>
                    <option value="3rd">3rd</option>
                    <option value="4th">4th</option>
                    <option value="5th">5th</option>
                    <option value="6th">6th</option>
                    <option value="7th">7th</option>
                    <option value="8th">8th</option>
                    <option value="9th">9th</option>
                    <option value="10th">10th</option>
                    <option value="11th">11th</option>
                    <option value="12th">12th</option>
                </select><br></br>
    
                <label style={labelStyle}>Siblings:</label>
                <input type="text" name="siblings" value={childData.siblings} onChange={handleInputChange} /><br></br>
    
                <label style={labelStyle}>Parent/Guardian:</label>
                <select name="parentGuardian" value={childData.parentGuardian} onChange={handleInputChange}>
                    <option value="">Select</option>
                    <option value="parent">Parent</option>
                    <option value="guardian">Guardian</option>
                </select><br></br>
    
                {childData.parentGuardian === 'parent' && (
                    <>
                        <label style={labelStyle}>Select Parent Type:</label>
                        <select value={parentType} onChange={handleParentTypeChange}>
                            <option value="">Select</option>
                            <option value="father">Father</option>
                            <option value="mother">Mother</option>
                            <option value="both">Both</option>
                        </select>
                    </>
                )}
    <br></br>
                {parentType && (
                    <div>
                        {['father', 'both'].includes(parentType) && (
                            <div>
                                <label style={labelStyle}>Father's Name:</label>
                                <input type="text" name="father-name" value={childData.parentDetails.father.name} onChange={handleParentDetailsChange} /><br></br>
    
                                <label style={labelStyle}>Father's Qualification:</label>
                                <input type="text" name="father-qualification" value={childData.parentDetails.father.qualification} onChange={handleParentDetailsChange} /><br></br>
    
                                <label style={labelStyle}>Father's Occupation:</label>
                                <input type="text" name="father-occupation" value={childData.parentDetails.father.occupation} onChange={handleParentDetailsChange} /><br></br>
    
                                <label style={labelStyle}>Father's Phone Number:</label>
                                <input type="tel" name="father-phoneNumber" value={childData.parentDetails.father.phoneNumber} onChange={handleParentDetailsChange} /><br></br>
                            </div>
                        )}
    
                        {['mother', 'both'].includes(parentType) && (
                            <div>
                                <label style={labelStyle}>Mother's Name:</label>
                                <input type="text" name="mother-name" value={childData.parentDetails.mother.name} onChange={handleParentDetailsChange} /><br></br>
    
                                <label style={labelStyle}>Mother's Qualification:</label>
                                <input type="text" name="mother-qualification" value={childData.parentDetails.mother.qualification} onChange={handleParentDetailsChange} /><br></br>
    
                                <label style={labelStyle}>Mother's Occupation:</label>
                                <input type="text" name="mother-occupation" value={childData.parentDetails.mother.occupation} onChange={handleParentDetailsChange} /><br></br>
    
                                <label style={labelStyle}>Mother's Phone Number:</label>
                                <input type="tel" name="mother-phoneNumber" value={childData.parentDetails.mother.phoneNumber} onChange={handleParentDetailsChange} /><br></br>
                            </div>
                        )}
    
                        {parentType === 'both' && (
                            <div>
                                <label style={labelStyle}>Address:</label>
                                <input type="text" name="address" value={childData.parentDetails.address} onChange={handleAddressChange} /><br></br>
                            </div>
                        )}
                    </div>
                )}
    
                {childData.parentGuardian === 'guardian' && (
                    <div>
                        <h3>Guardian's Details</h3>
                        <label style={labelStyle}>Guardian's Name:</label>
                        <input type="text" name="name" value={childData.guardianDetails.name} onChange={handleGuardianDetailsChange} /><br></br>
    
                        <label style={labelStyle}>Guardian's Address:</label>
                        <input type="text" name="address" value={childData.guardianDetails.address} onChange={handleGuardianDetailsChange} /><br></br>
    
                        <label style={labelStyle}>Guardian's Phone Number:</label>
                        <input type="tel" name="phoneNumber" value={childData.guardianDetails.phoneNumber} onChange={handleGuardianDetailsChange} /><br></br>
    
                        <label style={labelStyle}>Guardian's Email:</label>
                        <input type="email" name="email" value={childData.guardianDetails.email} onChange={handleGuardianDetailsChange} /><br></br>
    
                        <label style={labelStyle}>Guardian's Occupation:</label>
                        <input type="text" name="occupation" value={childData.guardianDetails.occupation} onChange={handleGuardianDetailsChange} /><br></br>
    
                        <label style={labelStyle}>Relationship with the Child:</label>
                        <input type="text" name="relationship" value={childData.guardianDetails.relationship} onChange={handleGuardianDetailsChange} /><br></br>
                    </div>
                )}
    
                <label style={labelStyle}>Image Link:</label>
                <input type="text" value={imageLink} onChange={handleImageLinkChange} />
                <button type="button" onClick={handleImageAttach}>Attach Image</button>
    
                <label style={labelStyle}>Or Attach Image File:</label>
                <input type="file" onChange={handleImageFileAttach} />
                <br /><br></br>
                <button type="submit" className='btn btn-primary w-100'>
                    Submit
                </button>
                <br></br><br></br>
                <Link to='/dashboard' style={linkStyle}><button className='btn btn-primary w-100'>Go Back to Dashboard</button></Link>
                <p style={{ color: "white", textAlign: "center" }}>Thank you</p>
            </form>
    
            
       
       </div>
       );
   };
   
   export default ChildrenPage;
