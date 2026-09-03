import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Catalog from './components/Catalog';
import Pricing from './components/Pricing';
import About from './components/About';
import Footer from './components/Footer';
import AccessibilityWidget from './components/AccessibilityWidget';

function App() {
  return (
    <div id="app-root" className="min-h-screen bg-white" dir="rtl">
      <Header />
      <Pricing />
      <Catalog />
      <Hero />
      <Services />
      <About />
      <Footer />
      <AccessibilityWidget />
    </div>
  );
}

export default App;