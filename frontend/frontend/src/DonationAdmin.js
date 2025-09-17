import React, { useState } from 'react';
import axios from 'axios';

const DonationTable = () => {
    const [donations, setDonations] = useState([]);
    const [date, setDate] = useState('');

    const fetchDonations = () => {
        axios.get(`http://localhost:8081/donations/${date}`)
            .then(res => setDonations(res.data))
            .catch(err => console.error('Error fetching donations:', err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8081/donations/${id}`)
            .then(res => {
                if (res.data.success) {
                    setDonations(donations.filter(donation => donation.id !== id));
                }
            })
            .catch(err => console.error('Error deleting donation:', err));
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

    const buttonStyle = {
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer',
        borderRadius: '4px'
    };

    const fetchButtonStyle = {
        backgroundColor: '#c9a25c',
        color: 'black',
        border: 'none',
        padding: '10px 15px',
        cursor: 'pointer',
        borderRadius: '4px',
        marginBottom: '20px'
    };

    const containerStyle = {
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: ' rgba(218, 190, 101, 0.8)',
        padding: '20px'
    };
    return (
        <div style={containerStyle}>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ marginBottom: '10px', padding: '5px' }}
            />
            <button style={fetchButtonStyle} onClick={fetchDonations}>View Donations</button>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>ID</th>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Amount</th>
                        <th style={thStyle}>Donated Date</th>
                        <th style={thStyle}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {donations.map(donation => (
                        <tr key={donation.id}>
                            <td style={tdStyle}>{donation.id}</td>
                            <td style={tdStyle}>{donation.name}</td>
                            <td style={tdStyle}>{donation.email}</td>
                            <td style={tdStyle}>{donation.amount}</td>
                            <td style={tdStyle}>{donation.donateddate}</td>
                            <td style={tdStyle}>
                                <button style={buttonStyle} onClick={() => handleDelete(donation.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DonationTable;
