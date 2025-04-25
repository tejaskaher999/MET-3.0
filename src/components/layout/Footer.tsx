
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#800000] text-white border-t border-[#900000] py-4 px-6 text-center text-sm">
      <div className="container mx-auto">
        <p>© {currentYear} MET Bhujbal Knowledge City. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
