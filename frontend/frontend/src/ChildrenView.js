import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import video from './homevideo.mp4';
import './ChildrenList.css';

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

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }
  
    return (
        <div className="container"  >
            
            <h2 className="title">Children List</h2>
            <table className="table">
                <thead className="thead">
                    <tr className="tr">
                        <th className="th">ID</th>
                        <th className="th">Name</th>
                        <th className="th">Gender</th>
                        <th className="th">Date of Birth</th>
                        <th className="th">Age</th>
                        <th className="th">Place of Birth</th>
                        <th className="th">School</th>
                        <th className="th">Class</th>
                        <th className="th">Siblings</th>
                        <th className="th">Parent/Guardian</th>
                        <th className="th">Father Name</th>
                        <th className="th">Mother Name</th>
                        <th className="th">Guardian Name</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {children.map((child) => (
                        <tr className="tr" key={child.id}>
                            <td className="td">{child.id}</td>
                            <td className="td">{child.name}</td>
                            <td className="td">{child.gender}</td>
                            <td className="td">{child.dob}</td>
                            <td className="td">{child.age}</td>
                            <td className="td">{child.placeOfBirth}</td>
                            <td className="td">{child.school}</td>
                            <td className="td">{child.class}</td>
                            <td className="td">{child.siblings}</td>
                            <td className="td">{child.parentGuardian}</td>
                            <td className="td">{child.fathername}</td>
                            <td className="td">{child.mothername}</td>
                            <td className="td">{child.guardianname}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>You have to enter child_id and child_name whom you would like to adopt in the form. Click adopt now to fill adoption form.</p>
            <Link to='/adoption'><button className="button">Adopt Now</button></Link>
        </div>
    );
};

export default ChildrenList;
