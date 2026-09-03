
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <p className="mb-4">צביעה מקצועית - שירותי צביעה איכותיים</p>
          <p className="text-gray-400">© {new Date().getFullYear()} כל הזכויות שמורות</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;