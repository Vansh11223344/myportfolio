import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMedium } from 'react-icons/fa';
import './ProjectShowcase.css';

const ProjectShowcase = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const projects = [
    {
      id: 2,
      title: 'SkinCare Clinic Website',
      description: 'A modern and responsive website showcasing various skin care treatments and services  highlighting treatments, hair care, and laser procedures with elegant design and smooth user experience..',
      hashtags: ['#React', '#CSS', '#ResponsiveDesign','#ChatSystem'],
      image: '/images/skincare.webp',
      githubLink: 'https://khuranaclinic.netlify.app/',
    },
    {
      id: 2,
      title: 'MIT NSS Website',
      description: 'A modern and responsive website showcasing NSS activities that colleges do with the help of their volunteers.',
      hashtags: ['#Html', '#CSS', '#Javascript', '#ResponsiveDesign'],
      image: '/images/nssimg.webp',
      githubLink: 'https://nssmitmanipal.netlify.app/',
    },
    {
      id: 1,
      title: 'Digital Apology',
      description: 'In this digital age, why not convey our apologies through a beautifully written, sincere message sent with warmth and care?',
      hashtags: ['#Html', '#CSS', '#Javascript','#ResponsiveDesign'],
      image: '/images/sorry.webp',
      githubLink: 'https://sorryletter.netlify.app/',
    },
  ];

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
                               {/*}  <li><a href="#experience">Experience</a></li>*/}
                                 <li><Link to="/contact">Contact</Link></li>
         
                   </ul>
        </nav>

        <div className="hamburger" onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </header>

      {/* Project Showcase Section */}
      <div className="project-showcase">
        <h1 className="showcase-title">Project Showcase</h1>
        <div className="projects-container">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <img src={project.image} alt={project.title} className="project-image" />
              <div className="project-content">
                <h2 className="project-title">{project.title}</h2>
                <p className="project-description">{project.description}</p>
                <div className="hashtags">
                  {project.hashtags.map((tag, index) => (
                    <span key={index} className="hashtag">{tag}</span>
                  ))}
                </div>
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="github-button">Link</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="social-icons">
          <a href="mailto:guptavansh607@gmail.com"><FaEnvelope /></a>
          <a href="https://github.com/Vansh11223344"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/vansh-mahajan-565a602aa"><FaLinkedin /></a>
          <a href="https://x.com/VanshGupta50524"><FaTwitter /></a>
          
        </div>
        <p>© 2025 Vansh. All rights reserved.</p>
      </footer>
    </>
  );
};

export default ProjectShowcase;
