import { useState, useRef } from 'react'

const requiredDocuments = [
  { name: 'Business Formation Documents', required: true },
  { name: 'EIN Verification', required: true },
  { name: 'Owner ID (Driver\'s License or Passport)', required: true },
  { name: '3-6 Months Bank Statements', required: true },
  { name: 'Voided Check or Bank Letter', required: true },
  { name: 'ACH Authorization (will be e-signed)', required: true },
  { name: 'Personal Guaranty (if applicable)', required: false },
]

interface UploadedFile {
  name: string
  type: string
  status: 'pending' | 'verified' | 'rejected'
  date: string
}

export default function DocumentUploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    // Handle dropped files
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // Handle file selection
    }
  }

  const getStatusBadge = (status: UploadedFile['status']) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Pending</span>
      case 'verified':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Verified</span>
      case 'rejected':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Rejected</span>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Document Upload</h1>
        <p className="text-gray-600">Upload the required documents for your application</p>
      </div>

      {/* Required Documents Checklist */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-navy mb-4">Required Documents</h2>
        <ul className="space-y-2">
          {requiredDocuments.map((doc, index) => (
            <li key={index} className="flex items-center">
              <span className="text-teal mr-2">✓</span>
              <span className={doc.required ? 'text-gray-800' : 'text-gray-600'}>
                {doc.name}
                {doc.required && <span className="text-red-500 ml-1">*</span>}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          dragOver
            ? 'border-teal bg-teal-light'
            : 'border-gray-300 hover:border-teal hover:bg-gray-50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={handleFileSelect}
          className="hidden"
        />
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <p className="text-gray-600 mb-1">
          Drag and drop files here or <span className="text-teal font-medium">click to browse</span>
        </p>
        <p className="text-sm text-gray-500">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-navy mb-4">Uploaded Files</h2>
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="pb-2">Document</th>
                <th className="pb-2">Upload Date</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {uploadedFiles.map((file, index) => (
                <tr key={index} className="border-b last:border-0">
                  <td className="py-3">{file.name}</td>
                  <td className="py-3 text-sm text-gray-500">{file.date}</td>
                  <td className="py-3">{getStatusBadge(file.status)}</td>
                  <td className="py-3">
                    <button className="text-teal hover:text-teal-dark text-sm mr-3">View</button>
                    <button className="text-red-500 hover:text-red-600 text-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
