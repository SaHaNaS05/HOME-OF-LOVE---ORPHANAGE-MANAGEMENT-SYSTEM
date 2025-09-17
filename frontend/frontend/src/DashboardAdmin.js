import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [childrenCount, setChildrenCount] = useState(0);
    const [adoptionCount, setAdoptionCount] = useState(0);
    const [donationCount, setDonationCount] = useState(0);
    useEffect(() => {
        fetchCounts();
    }, []);

    const fetchCounts = () => {
        axios.get('http://localhost:8081/children/count')
            .then(res => setChildrenCount(res.data.count))
            .catch(err => console.error(err));

        axios.get('http://localhost:8081/adoption/count')
            .then(res => setAdoptionCount(res.data.count))
            .catch(err => console.error(err));

        axios.get('http://localhost:8081/donation/count')
            .then(res => setDonationCount(res.data.count))
            .catch(err => console.error(err));
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor:' rgba(218, 190, 101, 0.8)',
        padding: '20px'
    };

    const cardStyle = {
        backgroundColor: '#ffffff',
        border: '1px solid #dddddd',
        borderRadius: '8px',
        padding: '20px',
        width: '200px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };

    const countStyle = {
        fontSize: '2em',
        color: '#333333',
    };

    const labelStyle = {
        fontSize: '1em',
        color: '#777777',
    };
    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <div style={countStyle}>{childrenCount}</div>
                <div style={labelStyle}>Children</div>
            </div>
            <div style={cardStyle}>
                <div style={countStyle}>{adoptionCount}</div>
                <div style={labelStyle}>Adoptions</div>
            </div>
            <div style={cardStyle}>
                <div style={countStyle}>{donationCount}</div>
                <div style={labelStyle}>Donations</div>
            </div>
        </div>
    );
};

export default Dashboard;