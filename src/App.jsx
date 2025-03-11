import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import ContactForm from './components/ContactForm';
import ProjectShowcase from './components/ProjectShowcase';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/Introduction" element={<Introduction />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/projects" element={<ProjectShowcase />} />
      </Routes>
    </Router>
  );
};

export default App;