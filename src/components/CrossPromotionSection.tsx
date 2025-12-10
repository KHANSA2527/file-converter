import { useEffect, useState, useRef } from "react";
import { Shield, Zap, Award, Download, Users, Globe } from "lucide-react";

const CrossPromotionSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    { label: "Daily Users", value: "25,000+" },
    { label: "Files Processed", value: "14M+" },
    { label: "PDF Tools", value: "14" },
    { label: "Countries", value: "195" },
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "We encrypt every file and automatically delete it after 1 hour.",
    },
    {
      icon: Zap,
      title: "Fast Processing",
      description: "Optimized servers ensure files are processed within seconds.",
    },
    {
      icon: Award,
      title: "High Quality Output",
      description: "Process PDFs without losing formatting or clarity.",
    },
    {
      icon: Download,
      title: "No Installation",
      description: "Use all tools directly in your browser. No setup required.",
    },
    {
      icon: Users,
      title: "Team Friendly",
      description: "Easily share processed files with your team or clients.",
    },
    {
      icon: Globe,
      title: "Available Worldwide",
      description: "Reliable 24/7 service with 99.9% uptime.",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
    id="features"
      ref={sectionRef}
      className="relative py-24 bg-white border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
         

          <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-gray-900">
            A Better Way to Work With PDFs
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Powerful, private, and easy-to-use PDF tools designed for speed and
            reliability.
          </p>
        </div>

        {/* Features Grid */}
<div
  className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-20 transition-all duration-700 delay-200 ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
  }`}
>
  {features.map((f, idx) => (
    <div
      key={idx}
      className="
        group relative p-8 bg-gradient-to-br from-blue-600 to-indigo-600
        rounded-2xl shadow-xl
        transform transition-all duration-500 
        hover:animate-bounce-card
        overflow-hidden
      "
    >
      {/* Animated overlay effect */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-2xl pointer-events-none"></div>

      <div
        className="
          w-14 h-14 bg-white rounded-xl flex items-center justify-center 
          mb-5 transition-all duration-500
          group-hover:bg-blue-500 group-hover:scale-110
        "
      >
        <f.icon className="w-7 h-7 text-gray-700 group-hover:text-white transition-all duration-500" />
      </div>

      <h3 className="text-xl font-semibold text-white group-hover:text-gray-100 transition-all duration-500">
        {f.title}
      </h3>

      <p className="text-white group-hover:text-gray-200 mt-2 leading-relaxed transition-all duration-500">
        {f.description}
      </p>
    </div>
  ))}
</div>

{/* Trusted By Section (Horizontal Auto Scroll) */}
<div
  className={`mt-20 transition-all duration-700 delay-300 ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
  }`}
>
  <p className="text-center text-gray-500 text-sm font-medium tracking-wide mb-6">
    Trusted by millions of users worldwide
  </p>

  <div className="relative w-full overflow-hidden">
    <div className="flex gap-10 py-4 px-1 animate-marquee">
      {[
        { icon: Globe, label: "Global Reach" },
        { icon: Shield, label: "Secure Platform" },
        { icon: Users, label: "2M+ Users" },
        { icon: Award, label: "Top Rated" },
        { icon: Zap, label: "Lightning Fast" },
        { icon: Download, label: "Millions of Files" },
        { icon: Globe, label: "Worldwide Access" },
        { icon: Shield, label: "Encrypted" },
      ]
        .concat([
          { icon: Globe, label: "Global Reach" },
          { icon: Shield, label: "Secure Platform" },
          { icon: Users, label: "2M+ Users" },
          { icon: Award, label: "Top Rated" },
          { icon: Zap, label: "Lightning Fast" },
          { icon: Download, label: "Millions of Files" },
          { icon: Globe, label: "Worldwide Access" },
          { icon: Shield, label: "Encrypted" },
        ]) // duplicate for seamless infinite scroll
        .map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center min-w-[140px]"
          >
            <item.icon className="w-10 h-10 text-blue-600" />
            <p className="text-gray-600 text-sm mt-2">{item.label}</p>
          </div>
        ))}
    </div>
  </div>
</div>


      </div>
    </section>
  );
};

export default CrossPromotionSection;
