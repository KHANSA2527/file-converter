const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading PDFMaster</h2>
        <p className="text-gray-600">Preparing your PDF tools...</p>
      </div>
    </div>
  )
}

export default LoadingSpinner