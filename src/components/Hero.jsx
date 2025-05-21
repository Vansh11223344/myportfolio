import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import './Hero.css';

class Spider {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tx = x;
    this.ty = y;
    this.speed = 0.07 + Math.random() * 0.07;
  }
  follow(x, y) {
    this.tx = x;
    this.ty = y;
  }
  tick() {
    this.x += (this.tx - this.x) * this.speed;
    this.y += (this.ty - this.y) * this.speed;
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    // Body
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD700';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#FFD700';
    ctx.fill();
    // Eyes
    ctx.beginPath();
    ctx.arc(-5, -4, 2, 0, Math.PI * 2);
    ctx.arc(5, -4, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.restore();
  }
}

function useSpidersBackground(numSpiders = 3) {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const spiders = Array.from({ length: numSpiders }, () =>
      new Spider(Math.random() * w, Math.random() * h)
    );

    const onMove = (e) => {
      spiders.forEach((spider) => spider.follow(e.clientX, e.clientY));
    };
    window.addEventListener('pointermove', onMove);

    function animate() {
      ctx.clearRect(0, 0, w, h);
      spiders.forEach((spider) => {
        spider.tick();
        spider.draw(ctx);
      });
      requestAnimationFrame(animate);
    }
    animate();

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, [numSpiders]);
  return canvasRef;
}

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const canvasRef = useSpidersBackground(3); // Number of spiders

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {/* Spider Canvas Background */}
      <canvas
        ref={canvasRef}
        className="spider-canvas"
        width={window.innerWidth}
        height={window.innerHeight}
      />

      {/* Header */}
      <header className="header">

         <motion.div
          className="logo"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          Vansh Mahajan
        </motion.div>

        
        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/introduction">About</Link></li>
            <li><Link to="/projects">Projects</Link></li>
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
        >
          <img
            src="./images/myimg3.jpg"
            alt="Vansh Mahajan"
            className="hero-img"
          />
          <h1>
            <span className="hero-title">
              Hi, I'm <span className="hero-highlight">Vansh</span>
            </span>
          </h1>
          <p className="hero-desc">
            I love to learn and build scalable, optimized systems — from intuitive frontends to robust backends.
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
