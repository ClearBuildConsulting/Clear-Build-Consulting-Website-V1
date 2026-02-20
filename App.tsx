import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { AIAdvisory } from './pages/AIAdvisory';
import { DomesticTender } from './pages/DomesticTender';
import { BuiltEnv } from './pages/BuiltEnv';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-obsidian text-white selection:bg-focus selection:text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai-advisory" element={<AIAdvisory />} />
            <Route path="/domestic-tender-packs" element={<DomesticTender />} />
            <Route path="/built-environment" element={<BuiltEnv />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;