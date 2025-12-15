import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

type HeaderProps = {
  scrollToTools: () => void;
  scrollToFeatures: () => void;
  openSignup: () => void;
};

export default function Header({
  scrollToTools,
  scrollToFeatures,
  openSignup,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-500 backdrop-blur-xl border-b border-white/20 ${
        isScrolled ? "bg-white/40 shadow-xl" : "bg-white/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">PDF</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900/90">PDFMaster</h1>
           
          </div>
        </Link>

        {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-6">
  {[
    { name: "Tools", link: "tools" },
    { name: "Features", link: "features" },
  ].map((item) => (
    <button
      key={item.name}
      onClick={() => {
        const section = document.getElementById(item.link);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }}
      className="text-gray-900 hover:text-blue-600 font-medium transition"
    >
      {item.name}
    </button>
  ))}
</nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/login"
            className="px-5 py-2 rounded-xl bg-white/30 border border-white/30 backdrop-blur-md text-gray-800 font-medium hover:bg-white/50 transition shadow-md"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-3 rounded-xl bg-white/30 backdrop-blur-md border border-white/20 shadow-lg"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden px-4 pb-4 transition-all duration-500 overflow-hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col space-y-3 bg-white/30 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-lg">
          
          <Link to="#tools" className="text-gray-800 py-2 rounded-lg hover:bg-white/40 px-3">
            Tools
          </Link>

          <Link to="#features" className="text-gray-800 py-2 rounded-lg hover:bg-white/40 px-3">
            Features
          </Link>

        

          <div className="pt-3 border-t border-white/30">
            <Link
              to="/login"
              className="block w-full text-center py-2 rounded-lg bg-white/40 backdrop-blur-sm text-gray-900 font-medium hover:bg-white/60 transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="block w-full mt-2 text-center py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold shadow-md hover:scale-105 transition"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
