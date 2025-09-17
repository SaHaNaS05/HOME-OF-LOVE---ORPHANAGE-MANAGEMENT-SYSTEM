import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Adoptionadmin.css'; // Include CSS file for styling

const AdminPage = () => {
    const [adoptions, setAdoptions] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAdoptions();
    }, []);

    const fetchAdoptions = async () => {
        try {
            const response = await axios.get('http://localhost:8081/adoption');
            setAdoptions(response.data);
        } catch (err) {
            console.error('Error fetching adoptions:', err);
            setError('Failed to fetch adoptions');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/adoption/${id}`);
            fetchAdoptions(); // Refresh the list after deletion
        } catch (err) {
            console.error('Error deleting adoption:', err);
            setError('Failed to delete adoption');
        }
    };

    const containerStyle = {
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor:  ' rgba(218, 190, 101, 0.8)',
        padding: '20px'
    };
    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        margin: '20px 0'
    };

    const thStyle = {
        border: '1px solid #ddd',
        padding: '8px',
        backgroundColor: '#f2f2f2',
        textAlign: 'left'
    };

    const tdStyle = {
        border: '1px solid #ddd',
        padding: '8px'
    };
    return (
        <div className="admin-container"  style={containerStyle}>
            <h2>Adoptions Info</h2>
            {error && <p className="error-message">{error}</p>}
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>First Name</th>
                        <th style={thStyle}>Last Name</th>
                        <th style={thStyle}>DOB</th>
                        <th style={thStyle}>Gender</th>
                        <th style={thStyle}>Phone Number</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Occupation</th>
                        <th style={thStyle}>Salary</th>
                        <th style={thStyle}>MaritalStatus</th>
                        <th style={thStyle}>City</th>
                        <th style={thStyle}>Contact Method</th>
                        <th style={thStyle}>Child_id</th>
                        <th style={thStyle}>Child_name</th>
                        <th style={thStyle}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {adoptions.map(adoption => (
                        <tr key={adoption.id}>
                            <td style={tdStyle}>{adoption.firstName}</td>
                            <td style={tdStyle}>{adoption.lastName}</td>
                            <td style={tdStyle}>{adoption.dob}</td>
                            <td style={tdStyle}>{adoption.gender}</td>
                            <td style={tdStyle}>{adoption.phoneNumber}</td>
                            <td style={tdStyle}>{adoption.email}</td>
                            <td style={tdStyle}>{adoption.occupation}</td>
                            <td style={tdStyle}>{adoption.salary}</td>
                            <td style={tdStyle}>{adoption.maritalStatus}</td>
                            <td style={tdStyle}>{adoption.city}</td>
                            <td style={tdStyle}>{adoption.contactMethod}</td>
                            <td style={tdStyle}>{adoption.child_id}</td>
                            <td style={tdStyle}>{adoption.child_name}</td>
                            <td style={tdStyle}>
                                <button onClick={() => handleDelete(adoption.id)} className="delete-button">DELETE</button>
                                {/* <button className="accept-button">Accept</button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;
