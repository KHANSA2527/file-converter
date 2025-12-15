import React, { useState, useEffect } from "react";
import { ArrowUp, Mail, Lock, Globe, Heart, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const subscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setEmail("");
    setTimeout(() => setDone(false), 3000);
  };

  const Tools = [
    "Docx to PDF",
    "PDF to Docx",
    "Excel to PDF",
    "PDF to Excel",
    "JPG to PDF",
    "PDF to CSV",
  ];

  const Company = ["About Us", "Blog", "Careers", "Press Kit", "Contact"];
  const Support = [
    "Help Center",
    "Documentation",
    "Status",
    "Privacy Policy",
    "Terms of Service",
  ];

  return (
    <footer className="relative mt-24 text-white bg-[#0A0A0B]">

      {/* BACKGROUND GRADIENT MESH */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#1a1a1b,transparent_60%),radial-gradient(circle_at_bottom_right,#272728,transparent_70%)] opacity-80 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

        {/* HEADER BRAND */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-14">
          
          {/* Brand */}
          <div className="max-w-sm">
            <Link to="/" className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center font-semibold text-xl">
                PDF
              </div>

              <div className="ml-3">
                <h1 className="text-2xl font-bold tracking-wide">PDFMaster</h1>
                <p className="text-sm text-gray-400">Next-Gen Document Tools</p>
              </div>
            </Link>

            <p className="text-gray-400 leading-relaxed">
              Convert, edit, merge and protect files — beautifully fast, secure
              and reliable.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-12">
            
            {/* Tools */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-red-400" />
                Tools
              </h3>

              <ul className="space-y-3">
                {Tools.map((t) => (
                  <li key={t}>
                    <button className="text-gray-400 hover:text-white transition flex items-center group">
                      <span className="group-hover:translate-x-1 transition">
                        {t}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>


            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-3">
                {Support.map((s) => (
                  <li key={s} className="text-gray-400 hover:text-white transition cursor-pointer">
                    {s}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="mt-20 pt-10 border-t border-white/10">
          {done ? (
            <div className="bg-green-600/10 border border-green-500/20 p-6 rounded-xl text-center">
              <h4 className="text-white font-semibold text-lg">Subscribed!</h4>
              <p className="text-green-300 mt-1 text-sm">
                Check your inbox for confirmation.
              </p>
            </div>
          ) : (
            <form
              onSubmit={subscribe}
              className="flex flex-col md:flex-row items-center gap-4"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="w-full md:flex-1 px-6 py-4 bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl text-white placeholder-gray-400 outline-none focus:border-red-400 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button className="px-8 py-4 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition flex items-center gap-2">
                <Mail size={18} />
                Subscribe
              </button>
            </form>
          )}
        </div>

        {/* BOTTOM */}
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-gray-400">
          <p className="text-sm flex items-center gap-1">
            © 2025 PDFMaster — Crafted with Khansa Khan
            <Heart size={14} className="text-red-500" /> for the web.
          </p>

          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <div className="flex items-center gap-2 text-green-400">
              <Lock size={14} /> <span className="text-sm">SSL Secure</span>
            </div>
            <div className="flex items-center gap-2 text-blue-400">
              <Globe size={14} /> <span className="text-sm">GDPR Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* BACK TO TOP BUTTON */}
    
    </footer>
  );
};

export default Footer;
