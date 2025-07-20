import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaCode, FaCamera, FaLaptopCode, FaFeatherAlt } from 'react-icons/fa';
import styled from 'styled-components';
import './Introduction.css';

// Styled Components
const Section = styled.section`
  padding: 4rem 2rem;
  background-color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  text-align: center;
  min-height: 80vh; /* Adjusted to leave space for footer */
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: rgb(255, 255, 255);
  max-width: 600px;
  margin: 0 auto 3rem auto;

  span.blue {
    color: #64FFDA;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 2rem;
  margin-bottom: 4rem;
`;

const Card = styled(motion.div)`
  background: #1A1A2E;
  padding: 2rem;
  border-radius: 15px;
  width: 250px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Icon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #64FFDA;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: white;
  margin-bottom: 1rem;
`;

const Button = styled(motion.button)`
  background: black;
  color: white;
  border: 3px solid #64FFDA;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 4rem;
  transition: background 0.3s ease;

  &:hover {
    background: #64FFDA;
    color: black;
  }
`;

const Introduction = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="app-container">
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

      <Section>
        <Title>Introduction 👋</Title>
        <Description>
          Hi, I'm a <a href="https://www.linkedin.com/in/vansh-mahajan-565a602aa" target="_blank" rel="noopener noreferrer" className="green-button" style={{ color: '#00FF00', fontWeight: 'bold' }}>Web/App Developer</a> and a <span style={{ color: '#00FF00', fontWeight: 'bold' }}>Software Developer</span> with a passion for creating scalable, high-performance systems that solve real-world problems. 👨‍💻⚙️🚀

          I'm also deeply into <span style={{ color: '#00FF00' }}>Photography</span>📸 — not just as a hobby, but as a way to capture emotions, preserve moments, and tell visual stories. 🌅📷✨

          Alongside that, I’m a <span style={{ color: '#00FF00' }}>Writer & Poet</span> ✍️📝 — someone who finds beauty in words and meaning in expression. Whether it’s through code, imagery, or poetry, I love creating things that connect, inspire, and endure. 💡📚🌟

        </Description>

        <CardContainer>
          <Card initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Icon><FaCode /></Icon>
            <CardTitle>Technology Enthusiast</CardTitle>
          </Card>

          <Card initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Icon><FaLaptopCode /></Icon>
            <CardTitle>Software Engineer</CardTitle>
          </Card>

          <Card initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <Icon><FaCamera /></Icon>
            <CardTitle>Photographer</CardTitle>
          </Card>

          <Card initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Icon><FaFeatherAlt /></Icon>
            <CardTitle>Writer</CardTitle>
          </Card>

        </CardContainer>

        <Button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => window.open('/Vansh_Resume.pdf', '_blank', 'noopener,noreferrer')}>
          View Resume →
        </Button>
      </Section>

      <footer className="footer">
        <div className="social-icons">
          <a href="mailto:guptavansh607@gmail.com"><FaEnvelope /></a>
          <a href="https://github.com/Vansh11223344"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/vansh-mahajan-565a602aa"><FaLinkedin /></a>
          <a href="https://x.com/VanshGupta50524"><FaTwitter /></a>
        </div>
        <p>© 2025 Vansh. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Introduction;
