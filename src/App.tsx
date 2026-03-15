import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import About from './components/About';
import Footer from './components/Footer';
import AccessibilityWidget from './components/AccessibilityWidget';

function App() {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <Header />
      <Hero />
      <Services />
      <Gallery />
      <About />
      <Footer />
      <AccessibilityWidget />
    </div>
  );
}

export default App;