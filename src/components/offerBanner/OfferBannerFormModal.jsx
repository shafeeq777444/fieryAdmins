import React, { useState } from 'react';
import ImageCropper from './ImageCropper';
import Toast from './Toast';
import ImageUpload from './ImageUpload';

const OfferBannerFormModal = ({ initialData, onClose, onSubmit }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(initialData?.image || null);
  const [showCropper, setShowCropper] = useState(false);
  const [imageError, setImageError] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'error' });

  const showToast = (message, type = 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'error' }), 3000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB = 5 * 1024 * 1024 bytes)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        showToast('File size must be less than 5MB');
        setImageError('File size must be less than 5MB');
        setImageFile(null);
        setImageUrl(null);
        setShowCropper(false);
        return;
      }
      
      setImageError('');
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
      setShowCropper(true);
    }
  };

  const handleCropComplete = (croppedBlob) => {
    setImageFile(new File([croppedBlob], imageFile.name || 'cropped.jpg', { type: 'image/jpeg' }));
    setImageUrl(URL.createObjectURL(croppedBlob));
    setShowCropper(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageFile) {
      showToast('Please select and crop an image');
      return;
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', imageFile);
    onSubmit(formData);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-slide-up">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 animate-fade-in-delay">
              {initialData ? 'Edit Banner' : 'Add New Banner'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="animate-fade-in-delay-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full border border-gray-300 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  placeholder="Enter banner title"
                />
              </div>
              <div className="animate-fade-in-delay-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={3}
                  className="w-full border border-gray-300 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none hover:border-gray-400"
                  placeholder="Enter banner description"
                />
              </div>
              
              <div className="animate-fade-in-delay-4">
                <ImageUpload
                  onImageChange={handleImageChange}
                  imageUrl={imageUrl}
                  imageError={imageError}
                  showCropper={showCropper}
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 animate-fade-in-delay-5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 hover:shadow-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 hover:shadow-md transform hover:scale-105"
                >
                  {initialData ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Image Cropper Modal */}
      {showCropper && (
        <ImageCropper
          imageUrl={imageUrl}
          onCropComplete={handleCropComplete}
          onClose={() => setShowCropper(false)}
        />
      )}
      
      {/* Toast Notification */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ show: false, message: '', type: 'error' })}
      />
    </>
  );
};

export default OfferBannerFormModal;