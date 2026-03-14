import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaExternalLinkAlt, FaCode, FaCamera, FaFeatherAlt, FaLaptopCode, FaArrowUp } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import './Home.css';

// Custom hook for scroll spy
const useScrollSpy = (sectionIds, offset = 80) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: `-${offset}px 0px 0px 0px` }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, offset]);

  return activeSection;
};

// Custom hook for typing effect
const useTypingEffect = (texts, speed = 100, delay = 2000) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (index === texts.length) return;

    if (subIndex === texts[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts, speed]);

  return texts[index].substring(0, subIndex);
};

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const [sending, setSending] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Refs for sections
  const sectionIds = ['home', 'about', 'projects', 'contact'];
  const activeSection = useScrollSpy(sectionIds, 80);

  // Scroll progress for progress bar and header shrink
  const { scrollYProgress } = useScroll();
  const headerHeight = useTransform(scrollYProgress, [0, 0.1], ['80px', '60px']);
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Parallax effect for hero image
  const heroImageY = useTransform(scrollYProgress, [0, 0.3], ['0%', '15%']);
  const heroTextY = useTransform(scrollYProgress, [0, 0.3], ['0%', '5%']);

  // Background opacity for grid overlay
  const gridOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.2]);

  // Typing effect
  const typingText = useTypingEffect(['Full-Stack Developer', 'Creative Technologist', 'Photographer', 'Writer'], 100, 1500);

  // Back to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Email send handler
  const sendEmail = useCallback((e) => {
    e.preventDefault();
    setSending(true);

    emailjs.sendForm(
      'service_nemnvdp',
      'template_24frk1a',
      e.target,
      'wa7lu9PVLioBjqoC7'
    )
    .then(() => {
      setFormStatus('success');
      setSending(false);
    })
    .catch(() => {
      setFormStatus('error');
      setSending(false);
    });

    e.target.reset();
  }, []);

  // Data (memoized)
  const skills = useMemo(() => [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'Firebase', 'Appwrite'] },
    { category: 'Mobile', items: ['React Native', 'Flutter', 'Dart'] },
    { category: 'Tools', items: ['Git', 'Figma', 'Vercel', 'Netlify'] },
  ], []);

  const passions = useMemo(() => [
    { icon: <FaLaptopCode />, title: 'Software Engineer', desc: 'Building scalable systems from frontend to backend.' },
    { icon: <FaCode />, title: 'Tech Enthusiast', desc: 'Always exploring new tools and paradigms.' },
    { icon: <FaCamera />, title: 'Photographer', desc: 'Capturing emotions and telling visual stories.' },
    { icon: <FaFeatherAlt />, title: 'Writer & Poet', desc: 'Finding beauty in words and expression.' },
  ], []);

  const websites = useMemo(() => [
    {
      id: 1,
      title: "Resume Genie",
      description: "AI-powered resume builder with intelligent suggestions.",
      tags: ["React", "Node.js", "PostgreSQL"],
      image: "/images/resumegenie.webp",
      link: "https://resumegenies.netlify.app/",
      category: "website",
      featured: true,
    },
    {
      id: 2,
      title: 'Navyug Innovations',
      description: 'EV diagnostics and skilling platform.',
      tags: ["React", "EmailJS"],
      image: '/images/navyuglogo.webp',
      link: 'https://navyugin.com/',
      category: "website",
    },
    {
      id: 3,
      title: 'BoneUp',
      description: 'Gamified to-do for aspirants.',
      tags: ["PHP", "PWA"],
      image: '/images/boneup.webp',
      link: 'https://boneup.mentallyprepare.in/',
      category: "website",
    },
    {
      id: 4,
      title: 'SkinCare Clinic',
      description: 'Modern clinic website.',
      tags: ["React", "CSS"],
      image: '/images/skincare.webp',
      link: 'https://khuranaclinic.netlify.app/',
      category: "website",
    },
    {
      id: 5,
      title: 'Game-Zone',
      description: '40+ browser games.',
      tags: ["React", "JavaScript"],
      image: '/images/game.webp',
      link: 'https://gameculture.netlify.app/',
      category: "website",
    },
    {
      id: 6,
      title: 'MIT NSS Website',
      description: 'NSS MIT Manipal.',
      tags: ["HTML", "CSS"],
      image: '/images/nssimg.webp',
      link: 'https://nssmitmanipal.netlify.app/',
      category: "website",
    },
    {
      id: 7,
      title: 'Medicine Management',
      description: 'Pharmacy management.',
      tags: ["React", "Material UI"],
      image: '/images/medmgs.webp',
      link: 'https://medicinemanage.netlify.app/',
      category: "website",
    },
  ], []);

  const apps = useMemo(() => [
    {
      id: 8,
      title: 'ToDo List',
      description: 'React Native todo with Appwrite.',
      tags: ["React Native", "Appwrite"],
      image: '/images/todoapp.webp',
      link: 'https://drive.google.com/...',
      category: "app",
    },
    {
      id: 9,
      title: 'Kisan Mitra',
      description: 'Flutter app for farmers.',
      tags: ["Flutter", "Firebase"],
      image: '/images/kisanmitra.webp',
      link: 'https://drive.google.com/...',
      category: "app",
    },
  ], []);

  const allProjects = useMemo(() => [...websites, ...apps], [websites, apps]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return allProjects;
    return allProjects.filter(p => p.category === activeFilter);
  }, [activeFilter, allProjects]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  // Lazy loading images
  const [loadedImages, setLoadedImages] = useState({});
  const handleImageLoad = (id) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="home">
      {/* Scroll Progress Bar */}
      <motion.div className="scroll-progress" style={{ width: progressBarWidth }} />

      {/* Header with animated height */}
      <motion.header className="header" style={{ height: headerHeight }}>
        <motion.div
          className="logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="logo-text">Vansh Mahajan</span>
        </motion.div>

        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            {sectionIds.map(id => (
              <li key={id}>
                <button
                  onClick={() => scrollToSection(id)}
                  className={`nav-link ${activeSection === id ? 'active' : ''}`}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hamburger" onClick={toggleMenu}>
          <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
        </div>
      </motion.header>

      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            className="back-to-top"
            onClick={() => scrollToSection('home')}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Grid overlay with animated opacity */}
      <motion.div className="grid-overlay" style={{ opacity: gridOpacity }} />

      {/* Home Section */}
      <section id="home" className="section hero-section">
        <div className="container hero-grid">
          <motion.div
            className="hero-content"
            style={{ y: heroTextY }}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.span variants={fadeInUp} className="hero-greeting">👋 Hi, I'm</motion.span>
            <motion.h1 variants={fadeInUp} className="hero-title">Vansh Mahajan</motion.h1>
            <motion.h2 variants={fadeInUp} className="hero-subtitle">
              <span className="typing">{typingText}</span>
              <span className="cursor">|</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="hero-description">
              I build scalable web and mobile applications with a focus on user experience and performance. Also a photographer and writer.
            </motion.p>
            <motion.div variants={fadeInUp} className="hero-actions">
              <button onClick={() => scrollToSection('projects')} className="btn btn-primary">View Projects</button>
              <button onClick={() => scrollToSection('contact')} className="btn btn-outline">Contact Me</button>
            </motion.div>
            <motion.div variants={fadeInUp} className="hero-social">
              <a href="mailto:guptavansh607@gmail.com" target="_blank" rel="noopener noreferrer"><FaEnvelope /></a>
              <a href="https://github.com/Vansh11223344" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
              <a href="https://www.linkedin.com/in/vansh-mahajan-565a602aa" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              <a href="https://x.com/VanshGupta50524" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-image-wrapper"
            style={{ y: heroImageY }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="hero-image-inner">
              <img
                src="/images/myimg.webp"
                alt="Vansh Mahajan"
                className="hero-image"
                loading="eager"
                onLoad={() => handleImageLoad('hero')}
              />
            </div>
          </motion.div>
        </div>
        <div className="scroll-indicator">
          <button onClick={() => scrollToSection('about')}>
            <span>Scroll</span>
            <FaEnvelope style={{ transform: 'rotate(90deg)' }} />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <span className="section-subtitle">About Me</span>
            <h2 className="section-title">More than just code</h2>
          </motion.div>

          <div className="about-grid">
            <motion.div
              className="about-text"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <p>
                I'm a <strong>Web & App Developer</strong> and Software Engineer with a passion for creating scalable, high-performance systems that solve real-world problems. I care about every layer — from pixel-perfect interfaces to optimized database queries.
              </p>
              <p>
                Beyond engineering, I'm deeply into <strong>Photography</strong> — capturing emotions and telling visual stories. I'm also a <strong>Writer & Poet</strong>, someone who finds beauty in words and meaning in expression.
              </p>
              <a href="/Vansh_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary">View Resume →</a>
            </motion.div>

            <motion.div
              className="about-passions"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {passions.map((passion, index) => (
                <motion.div key={index} className="passion-card" variants={fadeInScale}>
                  <div className="passion-icon">{passion.icon}</div>
                  <h3 className="passion-title">{passion.title}</h3>
                  <p className="passion-desc">{passion.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="skills-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <h3 className="skills-title">Technical Skills</h3>
            <div className="skills-grid">
              {skills.map((group) => (
                <div key={group.category} className="skill-group">
                  <h4 className="skill-category">{group.category}</h4>
                  <div className="skill-tags">
                    {group.items.map((skill) => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section projects-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <span className="section-subtitle">Portfolio</span>
            <h2 className="section-title">Selected Work</h2>
          </motion.div>

          <div className="projects-header">
            <div className="filter-tabs">
              {['all', 'website', 'app'].map(filter => (
                <button
                  key={filter}
                  className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter === 'all' ? 'All' : filter === 'website' ? 'Websites' : 'Apps'}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            className="projects-grid"
            key={activeFilter}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {filteredProjects.map((project, i) => (
              <motion.article
                key={project.id}
                className={`project-card ${project.featured ? 'featured' : ''}`}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="card-image-wrap">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`card-image ${loadedImages[project.id] ? 'loaded' : 'loading'}`}
                    loading="lazy"
                    onLoad={() => handleImageLoad(project.id)}
                  />
                  <div className="card-overlay">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="card-visit">
                      Visit <FaExternalLinkAlt />
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-desc">{project.description}</p>
                  <div className="card-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="card-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="container contact-grid">
          <motion.div
            className="contact-info"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <span className="section-subtitle">Get in Touch</span>
            <h2 className="contact-title">Let's work together</h2>
            <p className="contact-description">
              Have a project in mind, want to collaborate, or just say hello? I'm always open to new opportunities and conversations.
            </p>

            <div className="contact-details">
              <a href="mailto:guptavansh607@gmail.com" className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>guptavansh607@gmail.com</span>
              </a>
            </div>

            <div className="contact-socials">
              <a href="https://github.com/Vansh11223344" target="_blank" rel="noopener noreferrer" className="social-icon"><FaGithub /></a>
              <a href="https://www.linkedin.com/in/vansh-mahajan-565a602aa" target="_blank" rel="noopener noreferrer" className="social-icon"><FaLinkedin /></a>
              <a href="https://x.com/VanshGupta50524" target="_blank" rel="noopener noreferrer" className="social-icon"><FaTwitter /></a>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-wrapper"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInScale}
          >
            <form className="contact-form" onSubmit={sendEmail}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required placeholder="Your name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required placeholder="your@email.com" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" required placeholder="Tell me about your project..."></textarea>
              </div>
              <button type="submit" className="btn btn-primary submit-btn" disabled={sending}>
                {sending ? 'Sending...' : 'Send Message'}
              </button>

              {formStatus === 'success' && (
                <motion.p
                  className="form-feedback success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✓ Message sent! I'll get back to you soon.
                </motion.p>
              )}
              {formStatus === 'error' && (
                <motion.p
                  className="form-feedback error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✗ Something went wrong. Please try emailing directly.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <p className="footer-copy">© 2025 Vansh Mahajan. All rights reserved.</p>
          <div className="footer-links">
            <a href="mailto:guptavansh607@gmail.com">guptavansh607@gmail.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;