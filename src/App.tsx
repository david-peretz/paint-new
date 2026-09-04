import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Catalog from './components/Catalog';
import Pricing from './components/Pricing';
import About from './components/About';
import Faq from './components/Faq';
import Footer from './components/Footer';
import AccessibilityWidget from './components/AccessibilityWidget';
import JsonLd from './components/JsonLd';

function App() {
  return (
    <div id="app-root" className="min-h-screen bg-white" dir="rtl">
      {/* Emits the whole schema.org graph. Renders no visible output, so its position
          in the tree is arbitrary - it sits first only to keep it out of the way. */}
      <JsonLd />
      <Header />
      {/* One <main> around the content sections: it marks where the page's real content
          starts, which is what "skip to content" and a crawler's main-content
          extraction both look for. Header and Footer stay outside it. */}
      <main>
        <Pricing />
        <Catalog />
        <Hero />
        <Services />
        <About />
        <Faq />
      </main>
      <Footer />
      <AccessibilityWidget />
    </div>
  );
}

export default App;