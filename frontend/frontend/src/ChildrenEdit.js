import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const ChildrenList = () => {

    const [children, setChildren] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8081/children');
            setChildren(response.data);
            setLoading(false);
        } catch (error) {
            setError("There was an error fetching the children data!");
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/children/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting child:', error);
            setError('Error deleting child');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    const containerStyle = {
       
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: ' rgba(218, 190, 101, 0.8)',
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
        <div style={containerStyle}>
            <Link to="/dashboard/children">
                <button style={{
        backgroundColor: "#c9a25c",
        color: "black",
        padding: "5px 10px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginRight: "10px"
    }}>Add child data</button>
            </Link>
            <h2>Children List</h2>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>ID</th>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Gender</th>
                        <th style={thStyle}>Date of Birth</th>
                        <th style={thStyle}>Age</th>
                        <th style={thStyle}>Place of Birth</th>
                        <th style={thStyle}>School</th>
                        <th style={thStyle}>Class</th>
                        <th style={thStyle}>Siblings</th>
                        <th style={thStyle}>Parent/Guardian</th>
                        <th style={thStyle}>Father Name</th>
                        <th style={thStyle}>Mother Name</th>
                        <th style={thStyle}>Guardian Name</th>
                        <th style={thStyle}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {children.map((child) => (
                        <tr key={child.id}>
                            <td style={tdStyle}>{child.id}</td>
                            <td style={tdStyle}>{child.name}</td>
                            <td style={tdStyle}>{child.gender}</td>
                            <td style={tdStyle}>{child.dob}</td>
                            <td style={tdStyle}>{child.age}</td>
                            <td style={tdStyle}>{child.placeOfBirth}</td>
                            <td style={tdStyle}>{child.school}</td>
                            <td style={tdStyle}>{child.class}</td>
                            <td style={tdStyle}>{child.siblings}</td>
                            <td style={tdStyle}>{child.parentGuardian}</td>
                            <td style={tdStyle}>{child.fathername}</td>
                            <td style={tdStyle}>{child.mothername}</td>
                            <td style={tdStyle}>{child.guardianname}</td>
                          
                            <td style={tdStyle}>
                                <Link to={`/dashboard/childrenupdate/${child.id}`}><button   style={{
        backgroundColor: "green",
        color: "white",
        padding: "5px 10px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginRight: "10px"
    }}>Edit</button></Link>
                                <button
    style={{
        backgroundColor: "#f44336",
        color: "white",
        padding: "5px 10px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginRight: "10px"
    }}
    onClick={() => handleDelete(child.id)}
>
    Delete
</button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ChildrenList;


