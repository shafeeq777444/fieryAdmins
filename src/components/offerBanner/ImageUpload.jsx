import React from 'react';

const ImageUpload = ({ 
  onImageChange, 
  imageUrl, 
  imageError, 
  showCropper,
  maxSize = 5 * 1024 * 1024 // 5MB default
}) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Image (Standard: 16:9) - Max {formatFileSize(maxSize)}
      </label>
      <div className="relative">
        <input
          type="file"
          onChange={onImageChange}
          accept="image/*"
          className="w-full border border-gray-300 px-3 py-2.5 rounded-lg text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-gray-50 file:text-gray-700 file:font-medium hover:file:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
        />
        {imageError && (
          <p className="text-red-500 text-sm mt-1 animate-fade-in">{imageError}</p>
        )}
        {imageUrl && !showCropper && (
          <img
            src={imageUrl}
            alt="Preview"
            className="mt-2 rounded-lg border w-full aspect-video object-cover animate-fade-in transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
            style={{ maxHeight: 180 }}
          />
        )}
      </div>
    </div>
  );
};

export default ImageUpload; 