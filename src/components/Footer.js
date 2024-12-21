const Footer = () => {
    return (
      <footer className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-4 text-center">
        <div className="max-w-7xl mx-auto">
          <p>&copy; {new Date().getFullYear()} AWB<br /> All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;