import React, { useState, useEffect } from 'react'
import { Play, Shield, Zap, CheckCircle, Clock, TrendingUp, Cpu } from 'lucide-react'
import { NavLink } from 'react-router-dom'

interface HeroSectionProps {
  scrollToTools: () => void
  openSignup: () => void
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToTools, openSignup }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [timeSaved, setTimeSaved] = useState(0)
  const [activeProcesses, setActiveProcesses] = useState(0)
 const [toolsVisible, setToolsVisible] = useState(false);

  const fullText = "Master Your PDF Workflow"
const [typedText, setTypedText] = useState("")
useEffect(() => {
  setTimeout(() => setToolsVisible(true), 200); 
}, []);

useEffect(() => {
  setIsVisible(true)

  // Typewriter Effect
  let index = 0
  const typingInterval = setInterval(() => {
    if (index < fullText.length) {
      setTypedText(prev => prev + fullText[index])
      index++
    } else {
      clearInterval(typingInterval)
    }
  }, 80)

  // Time saved & processes counters
  const timeInterval = setInterval(() => setTimeSaved(prev => prev + 127), 100)
  const processInterval = setInterval(() => setActiveProcesses(prev => (prev + 1) % 28), 2000)

  return () => {
    clearInterval(typingInterval)
    clearInterval(timeInterval)
    clearInterval(processInterval)
  }
}, [])




  useEffect(() => {
    setIsVisible(true)
    
    const timeInterval = setInterval(() => setTimeSaved(prev => prev + 127), 100)
    const processInterval = setInterval(() => setActiveProcesses(prev => (prev + 1) % 28), 2000)

    return () => {
      clearInterval(timeInterval)
      clearInterval(processInterval)
    }
  }, [])

  

  const tools = [
    { icon: CheckCircle, title: "DOCX to PDF", desc: "Convert DOCX files to PDF quickly" },
    { icon: CheckCircle, title: "PDF to DOCX", desc: "Extract text from PDF into DOCX" },
    { icon: CheckCircle, title: "CSV to Excel", desc: "Convert CSV files to Excel format" },
    { icon: CheckCircle, title: "Excel to CSV", desc: "Save Excel files as CSV" },
    { icon: CheckCircle, title: "JPG to PDF", desc: "Convert images to PDF" },
    { icon: CheckCircle, title: "PNG to PDF", desc: "Convert PNG images to PDF" },
    { icon: CheckCircle, title: "HTML to PDF", desc: "Export web pages as PDF" },
    { icon: CheckCircle, title: "More Tools", desc: "Many more PDF utilities" },
  ]

  return (
    <section id="hero" className="relative min-h-screen pt-40 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Main Heading */}
        <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Master Your PDF Workflow
        </h1>
       <p
  className={`text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10 transition-all duration-700 ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
  }`}
>
  Transform the way you manage documents. Convert, edit, compress, sign, and organize PDFs instantly. 
  <span className="font-semibold text-blue-600"> Free for individuals,</span>
  and 
  <span className="font-semibold text-indigo-600"> powerful automation tools</span> 
  for teams when you need them.
</p>


        {/* Hero Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12 group">

  {/* Explore Tools */}
  <button
    className="
      flex items-center justify-center px-10 py-4 font-bold rounded-xl shadow 
      transition-all duration-300 transform hover:scale-105

      bg-blue-600 text-white 
      group-hover:bg-white group-hover:text-gray-700 group-hover:border group-hover:border-gray-300
      hover:bg-white hover:text-gray-700 hover:border hover:border-gray-300
    "
  >
    <Play className="w-5 h-5 mr-2" />
    Explore Tools
  </button>

  {/* Start Free */}
  <NavLink
    to="/login"
    className="
      flex items-center justify-center px-10 py-4 rounded-xl shadow transition-all 
      duration-300 transform hover:scale-105

      bg-white text-gray-700 border border-gray-300
      group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600
      hover:bg-blue-600 hover:text-white hover:border-blue-600
    "
  >
    Start Free
  </NavLink>

</div>


 <h2 id="tools" className="pt-32 text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2">
  Our Powerful <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">PDF Tools</span>
</h2>
<p className="text-gray-600 mb-10 max-w-xl mx-auto">
  Convert, edit, and manage your documents with one click.
</p>

{/* Hero Tools Grid with Flip Cards */}
<div 
  className={`
    grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16
    transition-all duration-700
    ${toolsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
  `}
>
  {tools.map((tool, idx) => (
    <div key={idx} className="group perspective w-full h-40">
      <div className="relative w-full h-full transition-transform duration-500 transform-style preserve-3d group-hover:rotate-y-180">

        {/* Front */}
        <div className="absolute w-full h-full bg-white rounded-xl shadow flex flex-col items-center justify-center p-5 backface-hidden">
          <tool.icon className="w-8 h-8 text-blue-500 mb-2" />
          <h3 className="font-semibold text-gray-800">{tool.title}</h3>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full bg-blue-600 rounded-xl shadow flex flex-col items-center justify-center p-5 backface-hidden rotate-y-180">
          <p className="text-white text-sm font-medium">{tool.desc}</p>
        </div>

      </div>
    </div>
  ))}
</div>

      </div>

      {/* Tailwind CSS Flip Card Utilities */}
      <style >{`
  .perspective {
    perspective: 1000px;
  }
  .transform-style {
    transform-style: preserve-3d;
  }
  .backface-hidden {
    backface-visibility: hidden;
  }
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
  .group-hover\\:rotate-y-180:hover {
    transform: rotateY(180deg);
  }
`}</style>
    </section>
  )
}

export default HeroSection
