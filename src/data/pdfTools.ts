export interface PDFTool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  color: string;
  popular?: boolean;
}

export const categories = [
  { id: 'all', name: 'All', count: 0 },
  { id: 'convert-to', name: 'Convert to PDF', count: 0 },
  { id: 'convert-from', name: 'Convert from PDF', count: 0 },
  { id: 'excel', name: 'Excel Tools', count: 0 },
  { id: 'image', name: 'Image Tools', count: 0 },
  { id: 'audio', name: 'Audio/Video Tools', count: 0 }
];

// ✅ Backend Supported Tools
export const pdfTools: PDFTool[] = [
  { id: 'docx-to-pdf', name: 'DOCX to PDF', description: 'Convert Microsoft Word (DOCX) to PDF', icon: 'FileText', category: 'convert-to', color: 'tool-blue', popular: true },
  { id: 'pdf-to-docx', name: 'PDF to DOCX', description: 'Convert PDF files to editable DOCX format', icon: 'FileText', category: 'convert-from', color: 'tool-green', popular: true },
  { id: 'csv-to-excel', name: 'CSV to Excel', description: 'Convert CSV files to Excel XLSX format', icon: 'Table', category: 'excel', color: 'tool-purple', popular: true },
  { id: 'excel-to-csv', name: 'Excel to CSV', description: 'Convert Excel XLS/XLSX sheets to CSV format', icon: 'Table', category: 'excel', color: 'tool-orange', popular: true },
  { id: 'jpg-to-pdf', name: 'JPG to PDF', description: 'Convert JPG images to PDF', icon: 'Image', category: 'image', color: 'tool-red' },
  { id: 'png-to-pdf', name: 'PNG to PDF', description: 'Convert PNG images to PDF', icon: 'Image', category: 'image', color: 'tool-red' },
  { id: 'pdf-to-jpg', name: 'PDF to JPG', description: 'Convert PDF pages to JPG images', icon: 'Image', category: 'image', color: 'tool-green' },
  { id: 'pdf-to-png', name: 'PDF to PNG', description: 'Convert PDF pages to PNG images', icon: 'Image', category: 'image', color: 'tool-green' },
  { id: 'pdf-to-csv', name: 'PDF to CSV', description: 'Extract tables from PDF into CSV', icon: 'Table', category: 'excel', color: 'tool-purple' },
  { id: 'html-to-pdf', name: 'HTML to PDF', description: 'Convert HTML pages or files to PDF', icon: 'FileText', category: 'convert-to', color: 'tool-blue' },
  { id: 'mp4-to-gif', name: 'MP4 to GIF', description: 'Convert MP4 video to GIF animation', icon: 'Video', category: 'audio', color: 'tool-purple' },
  { id: 'mp3-to-wav', name: 'MP3 to WAV', description: 'Convert MP3 audio to WAV format', icon: 'Music', category: 'audio', color: 'tool-orange' },
  { id: 'wav-to-mp3', name: 'WAV to MP3', description: 'Convert WAV audio to MP3 format', icon: 'Music', category: 'audio', color: 'tool-orange' },
  { id: 'video-to-audio', name: 'Video to Audio', description: 'Extract audio from video file (MP3)', icon: 'Video', category: 'audio', color: 'tool-red' }
];

// ✅ Auto Update Category Counts
export const updatedCategories = categories.map(category => {
  if (category.id === 'all') {
    category.count = pdfTools.length;
  } else {
    category.count = pdfTools.filter(tool => tool.category === category.id).length;
  }
  return category;
});

// ✅ Get Tools by Category with logging for debugging
export const getToolsByCategory = (categoryId: string) => {
  console.log('Getting tools for category:', categoryId);
  console.log('Current pdfTools length:', pdfTools.length);
  console.log('pdfTools IDs:', pdfTools.map(t => t.id));
  if (categoryId === 'all') return pdfTools;
  return pdfTools.filter(tool => tool.category === categoryId);
};