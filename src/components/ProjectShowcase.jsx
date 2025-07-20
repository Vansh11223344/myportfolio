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
      id: 1,
      title: 'Navyug Innovations',
      description: 'A modern platform showcasing Navyug’s intelligent EV diagnostics, skilling, and charging solutions—highlighting deep-tech innovation, rural empowerment, and seamless electric mobility with a clean, professional design and smooth user experience.',
      hashtags: ['#React', '#CSS', '#ChatBot', '#ResponsiveDesign', "#EmailJS", "#EmailAutomation"],
      image: '/images/navyuglogo.jpeg',
      githubLink: 'https://navyugin.com/',
    },

    {
      id: 2,
      title: 'BoneUp - Gamified To-Do List Manager',
      description: "A gamified to-do list manager for JEE & NEET aspirants, transforming study routines into an engaging experience with task tracking, XP points ('bones'), levels, and streaks—featuring a clean, responsive design and seamless PWA functionality for enhanced productivity.",
      hashtags: ["#PHP" , "#HTML" , "#CSS", "#JavaScript", "#PWA", "#ResponsiveDesign", "#Gamification"],
      image: '/images/boneup.jpg',
      githubLink: 'https://boneup.mentallyprepare.in/',
    },

    {
      id: 3,
      title: 'SkinCare Clinic Website',
      description: 'A modern and responsive website showcasing various skin care treatments and services  highlighting treatments, hair care, and laser procedures with elegant design and smooth user experience..',
      hashtags: ['#React', '#CSS', '#ResponsiveDesign', "#EmailJS", "#EmailAutomation"],
      image: '/images/skincare.png',
      githubLink: 'https://khuranaclinic.netlify.app/',
    },

    {
      id: 4,
      title: 'MIT NSS Website',
      description: 'A modern and responsive website showcasing NSS activities that colleges do with the help of their volunteers.',
      hashtags: ['#Html', '#CSS', '#Javascript', '#ResponsiveDesign'],
      image: '/images/nssimg.webp',
      githubLink: 'https://nssmitmanipal.netlify.app/',
    },

    {
      id: 5,
      title: 'Medicine-Management-System',
      description: 'A modern and responsive medicine management system showcasing seamless prescription ordering, billing, and reporting, crafted to enhance pharmacy operations with elegance and efficiency.',
      hashtags: ['#React', '#JavaScript', '#CSS', '#ResponsiveDesign', '#MaterialUI', '#PharmacyApp', '#WebDevelopment'],
      image: '/images/medmgs.webp',
      githubLink: 'https://medicinemanage.netlify.app/',
    },

    {
      id: 6,
      title: 'Game-Zone',
      description: 'A next-gen gaming platform delivering ultra-immersive, realistic experiences through seamless interaction, dynamic visuals, and authentic gameplay—blending cutting-edge technology with engaging content for all players.',
      hashtags: ['#React', '#JavaScript', '#CSS', '#40+ Games', '#ResponsiveDesign', '#Game', '#WebDevelopment'],
      image: '/images/game.webp',
      githubLink: 'https://gameculture.netlify.app/',
    },
  ];

  return (
    <>
      {/* Header */}
      <header className="header">
     

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
