import { FileText, Settings, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardHome = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/dashboard/file-converter");
  };

  return (
    <div className="w-full">
      <div
        className="
          text-center 
          mb-12 
          py-10 
          bg-white 
          rounded-2xl 
          mx-2 
          md:mx-4 
          md:py-16 
        "
      >
        <div className="max-w-3xl mx-auto px-4 md:px-6">

          {/* Icons - Responsive */}
          <div
            className="
              flex 
              justify-center 
              space-x-4 
              md:space-x-6 
              mb-6 
              md:mb-8
            "
          >
            <div className="p-3 md:p-4 bg-white rounded-xl shadow-md">
              <FileText className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
            </div>
            <div className="p-3 md:p-4 bg-white rounded-xl shadow-md">
              <Settings className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
            </div>
            <div className="p-3 md:p-4 bg-white rounded-xl shadow-md">
              <Zap className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
            </div>
          </div>

          {/* Title */}
          <h1
            className="
              text-3xl 
              md:text-5xl 
              lg:text-6xl 
              font-black 
              text-gray-900 
              mb-4 
              leading-tight
            "
          >
            File Converter
            <span
              className="
                bg-gradient-to-r 
                from-blue-600 to-purple-600 
                bg-clip-text 
                text-transparent 
                ml-1 md:ml-3
              "
            >
              Dashboard
            </span>
          </h1>

          {/* Updated Subtitle */}
          <p
            className="
              text-lg 
              md:text-xl 
              text-gray-600 
              leading-relaxed 
              mb-4
            "
          >
            Your unified workspace for converting documents, images, audio,
            videos, and more instantly and effortlessly.
          </p>

          {/* Updated Secondary Description */}
          <p
            className="
              text-sm 
              md:text-lg 
              text-gray-500 
              max-w-xl 
              mx-auto 
              mb-8
            "
          >
            Experience fast, secure, and beautifully simple tools designed for seamless file conversion.
          </p>

          {/* Button */}
          <button
            onClick={handleExploreClick}
            className="
              group 
              inline-flex 
              items-center 
              justify-center 
              px-6 
              py-3 
              md:px-8 
              md:py-4 
              bg-gradient-to-r 
              from-blue-600 
              to-purple-600 
              text-white 
              font-bold 
              rounded-xl 
              md:rounded-2xl
              shadow-lg 
              hover:shadow-xl 
              transition-all 
              duration-300 
              transform 
              hover:scale-105 
              hover:-translate-y-1
            "
          >
            Explore Tools
            <ArrowRight className="w-5 h-5 ml-2 md:ml-3 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
