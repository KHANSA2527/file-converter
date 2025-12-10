import { useState } from "react";
import {
  FileText,
  Images,
  FileArchive,
  FileAudio,
  FileVideo,
  FileCode,
  ArrowRight,
  Upload,
  AlertCircle
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../Services/axios";

const converters = [
  { title: "PDF to DOCX", icon: FileText, allowedTypes: ["application/pdf"] },
  { title: "DOCX to PDF", icon: FileText, allowedTypes: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"] },
  { title: "CSV to Excel", icon: FileText, allowedTypes: ["text/csv"] },
  { title: "Excel to CSV", icon: FileText, allowedTypes: ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"] },
  { title: "JPG to PDF", icon: Images, allowedTypes: ["image/jpeg"] },
  { title: "JPG to PNG", icon: Images, allowedTypes: ["image/jpeg"] },
  { title: "PDF to CSV", icon: FileText, allowedTypes: ["application/pdf"] },
  { title: "PDF to JPG", icon: FileText, allowedTypes: ["application/pdf"] },
  { title: "PDF to PNG", icon: FileText, allowedTypes: ["application/pdf"] },
  { title: "PNG to PDF", icon: Images, allowedTypes: ["image/png"] },
  { title: "PNG to JPG", icon: Images, allowedTypes: ["image/png"] },
  { title: "HTML to PDF", icon: FileText, allowedTypes: ["text/html"] },
  { title: "MP4 to GIF", icon: FileVideo, allowedTypes: ["video/mp4"] },
  { title: "MP3 to WAV", icon: FileAudio, allowedTypes: ["audio/mpeg"] },
  { title: "WAV to MP3", icon: FileAudio, allowedTypes: ["audio/wav"] },
  { title: "Video to Audio", icon: FileVideo, allowedTypes: ["video/mp4", "video/quicktime"] },
  { title: "TXT to PDF", icon: FileText, allowedTypes: ["text/plain"] },
  { title: "PDF to TXT", icon: FileText, allowedTypes: ["application/pdf"] },
  { title: "XML to JSON", icon: FileCode, allowedTypes: ["application/xml"] },
  { title: "JSON to XML", icon: FileCode, allowedTypes: ["application/json"] },
  { title: "PDF Merge", icon: FileArchive, allowedTypes: ["application/pdf"] },
  { title: "PDF Split", icon: FileArchive, allowedTypes: ["application/pdf"] },
  { title: "PDF Compress", icon: FileArchive, allowedTypes: ["application/pdf"] },
  { title: "PDF Protect", icon: FileArchive, allowedTypes: ["application/pdf"] },
  { title: "PDF Unlock", icon: FileArchive, allowedTypes: ["application/pdf"] },
];

const FileConverterPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedConverter, setSelectedConverter] = useState(null);
  const [password, setPassword] = useState("");

  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const needsPassword =
    selectedConverter?.title === "PDF Protect" ||
    selectedConverter?.title === "PDF Unlock";

  const openUploadModal = (converter) => {
    setSelectedConverter(converter);
    setErrorMsg("");
    setFile(null);
    setFiles([]);
    setPassword("");
    setOpenModal(true);
  };

  const handleFileSelect = (e) => {
    const selected = selectedConverter.title === "PDF Merge"
      ? Array.from(e.target.files)
      : e.target.files[0];

    if (!selected) return;

    if (selectedConverter.title === "PDF Merge") {
      const invalid = selected.some(f => !selectedConverter.allowedTypes.includes(f.type));
      if (invalid) {
        setErrorMsg("Only PDF files are allowed.");
        return;
      }
      setErrorMsg("");
      setFiles(selected);
      return;
    }

    if (!selectedConverter.allowedTypes.includes(selected.type)) {
      setErrorMsg("This file type is not allowed.");
      setFile(null);
      return;
    }

    setErrorMsg("");
    setFile(selected);
  };

  const handleConvert = async () => {
    if (selectedConverter.title === "PDF Merge" && files.length === 0) return;
    if (selectedConverter.title !== "PDF Merge" && !file) return;

    if (needsPassword) {
  if (!password.trim()) {
    setErrorMsg("Password is required.");
    return;
  }
  if (password.length < 4) {
    setErrorMsg("Password must be at least 4 characters long.");
    return;
  }
}


    setIsLoading(true);
    const formData = new FormData();

    if (selectedConverter.title === "PDF Merge") {
      files.forEach((f) => formData.append("files", f));
    } else {
      formData.append("file", file);
    }

    if (needsPassword) {
      formData.append("password", password);
    }

    try {
      const response = await api.post(
        `/convert/${selectedConverter.title.toLowerCase().replace(/ /g, "-")}`,
        formData,
        { responseType: "blob" }
      );

      const cd = response.headers["content-disposition"];
      let fileName = "converted_file";
      if (cd) {
        const match = cd.match(/filename="?(.+)"?/);
        if (match && match[1]) fileName = match[1];
      }

      const blob = new Blob([response.data], {
        type: response.data.type || "application/octet-stream",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("File converted successfully!");
      setOpenModal(false);
      setFile(null);
      setFiles([]);
      setPassword("");

    }
    catch (err) {
  console.error(err);

  // If backend sent a "detail" message
  if (err.response?.data?.detail) {
    toast.error(err.response.data.detail);
  } else {
    toast.error("Conversion failed!");
  }
}


    setIsLoading(false);
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">File Converter Tools</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {converters.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              onClick={() => openUploadModal(item)}
              className="group border rounded-xl p-5 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-blue-400 transform transition cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-xl text-blue-600">
                  <Icon className="w-6 h-6" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition" />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-gray-900">{item.title}</h3>
            </div>
          );
        })}
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6">

            <h2 className="text-2xl font-bold text-gray-900">{selectedConverter?.title}</h2>
            <p className="text-gray-600 mt-1">Upload your file to continue.</p>

            {errorMsg && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center gap-2 text-sm">
                <AlertCircle className="w-5 h-5" /> {errorMsg}
              </div>
            )}

            <div className="mt-6 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
              <Upload className="w-12 h-12 mx-auto text-gray-400" />
            

              <label className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer">
                Browse File
                <input
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  multiple={selectedConverter.title === "PDF Merge"}
                />
              </label>

              {selectedConverter.title === "PDF Merge" && files.length > 0 && (
                <div className="mt-3 text-sm text-gray-700 text-left font-medium">
                  {files.map((f) => <p key={f.name}>{f.name}</p>)}
                </div>
              )}

              {selectedConverter.title !== "PDF Merge" && file && (
                <p className="mt-3 text-sm text-gray-700 font-medium">Selected: {file.name}</p>
              )}
            </div>

            {/* 🔐 PASSWORD FIELD FOR PROTECT / UNLOCK */}
            {needsPassword && (
              <div className="mt-4">
                <label className="text-gray-700 font-medium">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-2 border px-3 py-2 rounded-lg"
                />
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>

              <button
                disabled={
                  isLoading ||
                  (selectedConverter.title === "PDF Merge" ? files.length === 0 : !file) ||
                  (needsPassword && !password.trim())
                }
                onClick={handleConvert}
                className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? "Converting..." : "Convert Now"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default FileConverterPage;
