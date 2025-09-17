import React from 'react';
import { Link } from 'react-router-dom';
const DonateNowPage = () => {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: "url('https://tse4.mm.bing.net/th?id=OIP.q51i_yAE5pFCDMtiwbPMzgHaDs&pid=Api&P=0&h=180')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
    };
    
    const container1Style = {
        backgroundColor: 'rgba(210, 167, 230, 0.8)',
        padding: '20px',
        borderRadius: '8px'
    };
    const linkStyle = {
        textDecoration: 'none', // Remove default link underline
        color: 'inherit', // Inherit parent color
    };
  
    const handleDonate = () => {
        // Example: Redirect to payment gateway or donation form
        console.log("Redirecting to payment gateway...");
    };

    return (
        <div className="donate-now-page" style={containerStyle}>
            <div style={container1Style}>
            <h2 style={{ color: "#367588", textAlign: "center" }}>Donate Now</h2>
            <p style={{ color: "black", textAlign: "center" }}>Your contribution can make a difference!</p>
            <div className="donation-info">
                <p><strong>Organization:</strong> HOME  OF LOVE </p>
                <p><strong>Account Name:</strong> SAHANA</p>
                <p><strong>Account number:</strong> 475-234-567</p>
                <p><strong>UPI transaction ID:</strong> TTCNIO2213425678</p>
                <p><strong>Address(send parcel to):</strong>143,SOUTH STREET,GUINDY,CHENNAI,600025 </p>
                <p><strong>Goal:</strong> $10,000</p>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
            <Link to="/donation" style={linkStyle}> <button style={buttonStyle} onClick={handleDonate}>
                    Donate Now
                </button></Link>
            </div>
            </div>
        </div>
    );
};

// Button Style
const buttonStyle = {
    backgroundColor: "#367588",
    color: "white",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "4px 2px",
    cursor: "pointer",
    borderRadius: "10px",
    border: "none"
};

export default DonateNowPage;
