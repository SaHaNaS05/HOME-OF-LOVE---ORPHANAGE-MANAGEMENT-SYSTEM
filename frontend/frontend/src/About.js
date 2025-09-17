import React from 'react';


const styles = {
    container: {
        display: 'flex',
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL}/image3.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
    },
    
  aboutContent: {
    maxWidth: '800px',
    textAlign: 'justify',
    marginBottom: '20px',
    borderRadius: '20px',
    color: 'white',
  },
  contactSection: {
    maxWidth: '800px',
    textAlign: 'center',
    marginBottom: '20px',
    color: 'white',
  },
  contactInfo: {
    textAlign: 'left',
    maxWidth: '300px',
    margin: '0 auto',
  },
};

const AboutPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.aboutContent}>
        <h2>About Our Orphanage</h2>
        <p>
          Welcome to Our Orphanage, where we provide a nurturing and supportive home for children who have been orphaned or abandoned. Our mission is to ensure that every child in our care receives the love, support, and opportunities they need to thrive and succeed in life.
        </p>
        <p>
          At Our Orphanage, we believe that every child deserves a safe and loving environment where they can grow and develop to their fullest potential. We are committed to providing a holistic approach to care that addresses the physical, emotional, and educational needs of each child.
        </p>
        <h3>Our Mission</h3>
        <p>
          Our mission is to provide a loving and stable home for orphaned and abandoned children, where they can heal from past traumas and build a bright future. We are dedicated to providing comprehensive care that nurtures the physical, emotional, and intellectual development of each child.
        </p>
        <h3>Our Values</h3>
        <ul>
          <li>Compassion: We approach our work with empathy, kindness, and understanding.</li>
          <li>Respect: We value the dignity and worth of every child and treat them with respect and dignity.</li>
          <li>Excellence: We strive for excellence in everything we do, constantly seeking ways to improve and innovate.</li>
          <li>Integrity: We uphold the highest standards of honesty, transparency, and ethical conduct.</li>
          <li>Community: We believe in the power of community and work collaboratively with families, volunteers, and partners to support our mission.</li>
        </ul>
        <h3>Our Team</h3>
        <p>
          Our team is comprised of dedicated professionals who are passionate about making a positive difference in the lives of children. From caregivers and educators to counselors and administrators, each member of our team plays a vital role in creating a supportive and nurturing environment for our children.
        </p>
        <p>
          Meet some of the key members of our team:
        </p>
        <ul>
          <li>Dr. Vishnupriya  - Founder and Director</li>
          <li>Ishwarya- Head of Caregiving</li>
          <li>Sahana - Education Coordinator</li>
          
        </ul>
      </div>
      <div style={styles.contactSection}>
        <h3>Contact Us</h3>
        <p>
          If you have any questions or would like to learn more about our orphanage, please feel free to contact us using the form below or using the information provided:
        </p>
        
        <div style={styles.contactInfo}>
          <p>Alternatively, you can reach us via:</p>
          <ul>
            <li>Email: info@homeoflove.org</li>
            <li>Phone: 9444562341</li>
            <li>Address: 123 Main Street,Guindy,Chennai,Tamilnadu, India</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
