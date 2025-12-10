// ✅ Load backend URL from .env
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// ✅ Helper function for all conversions
async function sendFile(endpoint: string, file: File): Promise<Blob> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/convert/${endpoint}`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error(`Conversion failed at: ${endpoint}`);

  return await res.blob();
}

// ✅ Individual tool exports (optional)
export async function convertDocxToPdf(file: File): Promise<Blob> {
  return sendFile("docx-to-pdf", file);
}

// ... (baaki tools bhi same style me rahe)

// ✅ Generic function for all tools
export async function convertFile(toolId: string, file: File): Promise<Blob> {
  return sendFile(toolId, file);
}
