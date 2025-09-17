import React from 'react';
import { Link } from 'react-router-dom';
import video from './homevideo.mp4';

function Home() {
    const sectionStyle = {
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: `url(${video})`, // Set the video as the background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const containerStyle = {
        width: '85%',
        margin: 'auto'
    };

    const container1Style = {
        height: '80px'
    };

    const h1Style = {
        float: 'left',
        lineHeight: '80px',
        fontSize: '35px',
        color: 'pink'
    };

    const buttonStyle = {
        position: 'absolute',
        top: '20px',
        right: '20px'
    };

    const buttonStyle1 = {
        marginRight: '10px',
        borderRadius: '20px', // Rounded corners
        backgroundColor: 'pink', // Dark pink background color
        color: 'black', // Blue text color
        padding: '8px 16px', // Padding for better spacing
        border: 'none', // No border
        cursor: 'pointer', // Cursor on hover
    };

    const linkStyle = {
        textDecoration: 'none', // Remove default link underline
        color: 'inherit', // Inherit parent color
    };

    const articleStyle = {
        width: '50%',
        margin: 'auto',
        textAlign: 'center',
        transform: 'translateY(25vh)'
    };

    const h1ArticleStyle = {
        fontSize: '36px',
        color: '#fff',
        letterSpacing: '1.5px',
        fontWeight: '800',
        marginBottom: '25px'
    };

    const pArticleStyle = {
        fontSize: '18px',
        borderRadius: '20px',
        // backgroundColor: '#FFDAB9',
        padding: '15px',
        color: 'pink',
        lineHeight: '1.5',
        marginBottom: '50px',
        fontFamily: 'Lucida, monospace'
    };

    return (
        <div style={sectionStyle} className="section">
            <video autoPlay loop muted style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: '-1' }}>
                <source src={video} type="video/mp4" />
            </video>
            <div style={containerStyle} className="container">
                <div style={container1Style} className="container1">
                    <h1 style={h1Style} className="h1">HOME OF LOVE</h1>
                    <div style={buttonStyle}>
                        <Link to="/about" style={linkStyle}><button style={buttonStyle1}>About</button></Link>
                        <Link to="/donation1" style={linkStyle}><button style={buttonStyle1}>Donation</button></Link>
                        <Link to="/childrenview" style={linkStyle}><button style={buttonStyle1}>Adoption</button></Link>
                        <Link to="/" style={linkStyle}><button style={buttonStyle1}>Logout</button></Link>
                    </div>
                </div>
                <div style={articleStyle} className="article">
                    <h1 style={h1ArticleStyle}>"The best way to find yourself is to lose yourself in the service of others." - Mahatma Gandhi</h1>
                    <p style={pArticleStyle}>Offering stability and support to children, giving them a sense of belonging and security. Empowering children with education, life skills, and opportunities to pursue their dreams.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
