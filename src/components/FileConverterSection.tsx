import { useState, useRef, useEffect } from "react";
import { pdfTools, PDFTool } from "../data/pdfTools";
import { convertFile } from "../Services/fileConversion";
import SignupModal from "./SignupModal";
import { Upload, FileText, Download, Sparkles, Zap, ArrowRight, CheckCircle, Cloud, Shield } from "lucide-react";

export default function FileConverterSection() {
  const [selectedTool, setSelectedTool] = useState<PDFTool | null>(null);
  const [showSignup, setShowSignup] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [convertedFile, setConvertedFile] = useState<{url: string; name: string} | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('file-converter');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedTool) {
      alert("Please select a tool first.");
      return;
    }

    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setIsConverting(true);
    setConvertedFile(null);

    try {
      const blob = await convertFile(selectedTool.id, file);
      const url = window.URL.createObjectURL(blob);
      const ext = selectedTool.name.split("to")[1]?.trim().toLowerCase() || "file";
      const fileName = `converted.${ext}`;

      setConvertedFile({ url, name: fileName });
    } catch (err) {
      console.error("Conversion error:", err);
      alert("Conversion failed. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (convertedFile) {
      const a = document.createElement("a");
      a.href = convertedFile.url;
      a.download = convertedFile.name;
      a.click();
      window.URL.revokeObjectURL(convertedFile.url);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (!selectedTool) {
      alert("Please select a tool first.");
      return;
    }

    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
      // Simulate file input change
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
        fileInputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  };

  const handleToolSelect = (tool: PDFTool) => {
    setSelectedTool(tool);
    setConvertedFile(null);
    setUploadedFile(null);
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.includes('pdf')) return '📄';
    if (fileName.includes('word') || fileName.includes('doc')) return '📝';
    if (fileName.includes('excel') || fileName.includes('xls')) return '📊';
    if (fileName.includes('powerpoint') || fileName.includes('ppt')) return '📑';
    return '📎';
  };

  return (
    <section id="file-converter" className="relative py-32 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50/30">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20 animate-pulse-slow delay-1000"></div>
        
        {/* Floating Icons */}
        <div className="absolute top-20 left-10 animate-float-slow">
          <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center">
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="absolute bottom-40 right-20 animate-float-medium delay-1000">
          <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-center">
            <Download className="w-6 h-6 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/60 mb-8">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping mr-2"></div>
            <span className="text-sm font-semibold text-gray-700">File Converter</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
            Convert{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
              Any File
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Lightning-fast file conversion with professional quality. Convert between PDF, Word, Excel, and more in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tool Selection */}
          <div className={`lg:col-span-1 transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/60 h-full">
              <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center space-x-3">
                <Zap className="w-6 h-6 text-yellow-500" />
                <span>Choose Conversion</span>
              </h3>
              
              <div className="space-y-3">
                {pdfTools.map((tool, index) => (
                  <button
                    key={tool.id}
                    onClick={() => handleToolSelect(tool)}
                    className={`w-full p-4 rounded-2xl transition-all duration-500 group ${
                      selectedTool?.id === tool.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg scale-105'
                        : 'bg-gray-50 hover:bg-white hover:shadow-lg hover:scale-105'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          selectedTool?.id === tool.id
                            ? 'bg-white/20 text-white'
                            : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
                        }`}>
                          <span className="text-lg">{getFileIcon(tool.name)}</span>
                        </div>
                        <div className="text-left">
                          <h4 className={`font-bold transition-colors duration-300 ${
                            selectedTool?.id === tool.id ? 'text-white' : 'text-gray-900'
                          }`}>
                            {tool.name}
                          </h4>
                          <p className={`text-sm transition-colors duration-300 ${
                            selectedTool?.id === tool.id ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            Convert files
                          </p>
                        </div>
                      </div>
                      <ArrowRight className={`w-5 h-5 transition-all duration-300 ${
                        selectedTool?.id === tool.id
                          ? 'text-white scale-110'
                          : 'text-gray-400 group-hover:text-blue-600 group-hover:scale-110'
                      }`} />
                    </div>
                  </button>
                ))}
              </div>

              {/* Features */}
              <div className="mt-8 pt-6 border-t border-gray-200/60">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Cloud className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Cloud Processing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">Secure & Private</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-gray-600">High Quality</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">Fast Conversion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* File Upload & Conversion */}
          <div className={`lg:col-span-2 transition-all duration-1000 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/60 h-full">
              {!selectedTool ? (
                <div className="text-center py-16">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Select a Tool</h3>
                  <p className="text-gray-600">Choose a conversion type to get started</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Selected Tool Info */}
                  <div className="text-center">
                    <h3 className="text-2xl font-black text-gray-900 mb-2">
                      Convert to {selectedTool.name.split('to')[1]?.trim()}
                    </h3>
                    <p className="text-gray-600">Upload your file to start conversion</p>
                  </div>

                  {/* File Upload Zone */}
                  <div
                    className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-500 cursor-pointer ${
                      isDragOver
                        ? 'border-blue-500 bg-blue-50/50 scale-105'
                        : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/30'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept={selectedTool.accept || "*/*"}
                    />
                    
                    <div className="space-y-4">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                        <Upload className="w-8 h-8 text-white" />
                      </div>
                      
                      <div>
                        <h4 className="text-xl font-black text-gray-900 mb-2">
                          {isDragOver ? 'Drop your file here' : 'Choose a file or drag & drop'}
                        </h4>
                        <p className="text-gray-600 mb-4">
                          Maximum file size: 100MB
                        </p>
                      </div>

                      <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                        Browse Files
                      </button>
                    </div>
                  </div>

                  {/* Uploaded File Info */}
                  {uploadedFile && (
                    <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                      <div className="flex items-center space-x-4">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                        <div className="flex-1 text-left">
                          <h4 className="font-bold text-gray-900">File Ready</h4>
                          <p className="text-gray-600 text-sm">{uploadedFile.name}</p>
                        </div>
                        <span className="text-sm text-gray-500">
                          {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Conversion Status */}
                  {isConverting && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Converting File</h4>
                      <p className="text-gray-600">Please wait while we process your file...</p>
                    </div>
                  )}

                  {/* Download Section */}
                  {convertedFile && (
                    <div className="text-center space-y-6">
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h4 className="text-2xl font-black text-gray-900 mb-2">Conversion Complete!</h4>
                        <p className="text-gray-600 mb-6">Your file has been successfully converted</p>
                        
                        <button
                          onClick={handleDownload}
                          className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 mx-auto"
                        >
                          <Download className="w-5 h-5" />
                          <span>Download File</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Sign Up CTA */}
                  <div className="text-center pt-6 border-t border-gray-200/60">
                    <p className="text-gray-600">
                      For unlimited conversions and larger files{' '}
                      <span
                        className="text-blue-600 cursor-pointer hover:underline font-semibold"
                        onClick={() => setShowSignup(true)}
                      >
                        Sign Up Free
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Signup Modal */}
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}

      {/* Custom Animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-slow 4s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}




