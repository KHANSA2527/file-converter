import { convertDocxToPdf } from "../Services/fileConversion";

function FileUpload() {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const res : any = await convertDocxToPdf(file);

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.pdf";
    a.click();
  };

  return (
    <input type="file" onChange={handleUpload} />
  );
}

export default FileUpload;
