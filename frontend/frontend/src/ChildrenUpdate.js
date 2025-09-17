import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChildrenEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
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

    useEffect(() => {
        const fetchChildData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/children/${id}`);
                setChildData(response.data);
            } catch (error) {
                console.error('Error fetching child data:', error);
            }
        };
        fetchChildData(); // Call fetchChildData directly inside useEffect
    }, [id]); // Include 'id' in the dependency array

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setChildData({
            ...childData,
            [name]: value
        });
    };
    
    const handleGuardianInputChange = (e) => {
        const { name, value } = e.target;
        setChildData({
            ...childData,
            guardianDetails: {
                ...childData.guardianDetails,
                [name]: value
            }
        });
    };
    
    const handleParentInputChange = (e) => {
        const { name, value } = e.target;
        const parentType = name.split('-')[0]; // Extracts 'father' or 'mother'
    
        setChildData({
            ...childData,
            parentDetails: {
                ...childData.parentDetails,
                [parentType]: {
                    ...childData.parentDetails[parentType],
                    name: value
                }
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8081/children/${id}`, childData);
            // Navigate programmatically to children edit route
            navigate('/dashboard/childrenedit');
        } catch (error) {
            console.error('Error updating child data:', error);
        }
    };
    const containerStyle = {
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor:  ' rgba(218, 190, 101, 0.8)',
        padding: '20px'
    };
    return (
        <div style={containerStyle}>
            <h2>Edit Child Data</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={childData.name} onChange={handleInputChange} /><br />
                <label>Gender:</label>
                <input type="text" name="gender" value={childData.gender} onChange={handleInputChange} /><br />
                <label>Date of Birth:</label>
                <input type="date" name="dob" value={childData.dob} onChange={handleInputChange} /><br />
                <label>Age:</label>
                <input type="text" name="age" value={childData.age} onChange={handleInputChange} /><br />
                <label>Place of Birth:</label>
                <input type="text" name="placeOfBirth" value={childData.placeOfBirth} onChange={handleInputChange} /><br />
                <label>School:</label>
                <input type="text" name="school" value={childData.school} onChange={handleInputChange} /><br />
                <label>Class:</label>
                <input type="text" name="class" value={childData.class} onChange={handleInputChange} /><br />
                <label>Siblings:</label>
                <label>Parent/Guardian:</label>
<input type="text" name="parentGuardian" value={childData.parentGuardian} onChange={handleInputChange} /><br />

<label>Guardian name:</label>
<input type="text" name="name" value={childData.guardianDetails.name} onChange={handleGuardianInputChange} /><br />

<label>Father's Name:</label>
<input type="text" name="father-name" value={childData.parentDetails.father.name} onChange={handleParentInputChange} /><br />

<label>Mother's Name:</label>
<input type="text" name="mother-name" value={childData.parentDetails.mother.name} onChange={handleParentInputChange} /><br />
    
                
                {/* Submit Button */}
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default ChildrenEdit;

