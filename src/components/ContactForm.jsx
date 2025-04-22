import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter, FaMedium } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './ContactForm.css';

const ContactForm = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_nemnvdp',
      'template_24frk1a',
      e.target,
      'wa7lu9PVLioBjqoC7'
    )
    .then((result) => {
        console.log('Message sent successfully:', result.text);
        setFormStatus('Message sent successfully!');
    })
    .catch((error) => {
        console.error('Failed to send message:', error);
        setFormStatus('Message not sent, try again.');
    });
  
    e.target.reset();
  };
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
             {/*}      <li><Link to="/">Home</Link></li>
                   <li><Link to="/introduction">About</Link></li>
                */}     <li><Link to="/projects">Projects</Link></li>
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

      <motion.div
        className="contact-form-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ 
          flex: 1, 
          padding: '2rem 0', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center' ,
          width:'100%'
        }}
      >
        <div style={{ width: '90%', backgroundColor: '#1a1a1a', padding: '2rem', borderRadius: '1rem' }}>
          <div className="contact-header">
            <h1>Reach Out to Me</h1>
            <h2>Contact</h2>
          </div>

          <form className="contact-form" onSubmit={sendEmail}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Enter your name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Enter your email" required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" placeholder="Enter your message" required />
            </div>

            <motion.button
              type="submit"
              className="send-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send
            </motion.button>
          </form>
          {formStatus && <p>{formStatus}</p>}
        </div>
      </motion.div>

      <footer className="footer" style={{ backgroundColor: '#1a1a1a', padding: '1rem 0', textAlign: 'center', marginTop: 'auto' }}>
        <div className="social-icons">
          <a href="mailto:guptavansh607@gmail.com"><FaEnvelope /></a>
          <a href="https://github.com/Vansh11223344"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/vansh-mahajan-565a602aa"><FaLinkedin /></a>
          <a href="https://x.com/VanshGupta50524"><FaTwitter /></a>
         
        </div>
        <p style={{ color: '#f0f0f0', marginTop: '0.5rem' }}>© 2025 Vansh. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ContactForm;
