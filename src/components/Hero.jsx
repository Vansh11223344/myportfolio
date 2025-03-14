import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMedium } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAbout = () => {
    navigate('/Introduction');
  };

  return (
    <>
      {/* Header */}
      <header className="header">
        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/introduction">About</Link></li>
           
            </ul>
        </nav>

        <motion.div
          className="logo"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
          style={{ fontSize: '2.1rem', fontWeight: 'bold' }}
        >
          Vansh Mahajan
        </motion.div>

        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/introduction">About</Link></li>
            <li><Link to="/projects">Projects</Link></li>
           {/* <li><a href="#experience">Experience</a></li>*/}
            <li><Link to="/contact">Contact</Link></li>

          </ul>
        </nav>

        <div className="hamburger" onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <motion.div
          className="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <img
            src="/myimg3.jpg"
            alt="Vansh Mahajan"
            style={{ width: '250px', height: '250px', borderRadius: '50%', marginBottom: '2rem' }}
          />
          <h1>
            <span style={{ fontSize: '4rem', color: '#FFFFFF', fontFamily: 'Verdana, Geneva, sans-serif' }}>
              Hi, I'm <span style={{ color: '#FFD700' }}>Vansh</span>
            </span>
          </h1>
          <p style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
            I love to learn and build scalable and optimized frontend systems.
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="social-icons">
          <a href="mailto:guptavansh607@gmail.com"><FaEnvelope /></a>
          <a href="https://github.com/Vansh11223344"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/vansh-mahajan-565a602aa?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><FaLinkedin /></a>
          <a href="https://x.com/VanshGupta50524"><FaTwitter /></a>
         
        </div>
        <p>© 2025 Vansh. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Hero;
