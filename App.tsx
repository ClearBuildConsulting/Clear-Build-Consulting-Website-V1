import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';

// Home loads eagerly (landing route, avoids a suspense flash on first paint).
// The rest are route-split so each page ships its own chunk.
const AIAdvisory = lazy(() => import('./pages/AIAdvisory').then((m) => ({ default: m.AIAdvisory })));
const BuiltEnv = lazy(() => import('./pages/BuiltEnv').then((m) => ({ default: m.BuiltEnv })));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-obsidian text-white selection:bg-focus selection:text-white">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ai-advisory" element={<AIAdvisory />} />
              <Route path="/built-environment" element={<BuiltEnv />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
