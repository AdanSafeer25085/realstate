import { useState, useRef } from 'react';

export default function ImageInput({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  name,
  className = "w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
}) {
  const [inputType, setInputType] = useState('url'); // 'url' or 'file'
  const [previewUrl, setPreviewUrl] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputTypeChange = (type) => {
    setInputType(type);
    if (type === 'url') {
      onChange('');
      setPreviewUrl('');
    } else {
      onChange('');
      setPreviewUrl('');
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    onChange(url);
    setPreviewUrl(url);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsConverting(true);
      
      // Create a preview URL for the selected file
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result;
        onChange(base64String); // Pass the base64 string instead of file object
        setIsConverting(false);
      };
      reader.onerror = () => {
        setIsConverting(false);
        alert('Error converting image. Please try again.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      
      {/* Input Type Toggle */}
      <div className="flex space-x-2 mb-2">
        <button
          type="button"
          onClick={() => handleInputTypeChange('url')}
          className={`px-3 py-1 text-sm rounded ${
            inputType === 'url' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          📎 Add Link
        </button>
        <button
          type="button"
          onClick={() => handleInputTypeChange('file')}
          className={`px-3 py-1 text-sm rounded ${
            inputType === 'file' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          📷 Upload Photo
        </button>
      </div>

      {/* Input Field */}
      {inputType === 'url' ? (
        <input
          type="url"
          value={value || ''}
          onChange={handleUrlChange}
          placeholder={placeholder}
          className={className}
        />
      ) : (
        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={handleFileButtonClick}
            disabled={isConverting}
            className={`${className} text-left cursor-pointer bg-white border-2 border-dashed border-gray-300 hover:border-blue-500 ${isConverting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isConverting ? '⏳ Converting...' : (value ? '📷 Change Photo' : '📷 Click to Upload Photo')}
          </button>
          {isConverting && (
            <p className="text-sm text-blue-600">
              ⏳ Converting image to base64...
            </p>
          )}
          {value && typeof value === 'string' && value.startsWith('data:image/') && !isConverting && (
            <p className="text-sm text-green-600">
              ✅ Image uploaded and converted to base64
            </p>
          )}
        </div>
      )}

      {/* Image Preview */}
      {previewUrl && (
        <div className="mt-2">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-32 object-cover rounded border"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}
    </div>
  );
}
