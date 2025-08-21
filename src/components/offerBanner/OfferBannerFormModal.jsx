import React, { useState, useEffect } from "react";
import ImageCropper from "./ImageCropper";
import Toast from "./Toast";
import ImageUpload from "./ImageUpload";
import { Plus } from "lucide-react"; // icon

const OfferBannerFormModal = ({ initialData, onClose, onSubmit }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [mainDescription, setMainDescription] = useState("");
  const [points, setPoints] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(initialData?.image || null);
  const [showCropper, setShowCropper] = useState(false);
  const [imageError, setImageError] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "error" });

  const showToast = (message, type = "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "error" }), 3000);
  };

  // Parse description when editing
  useEffect(() => {
    if (initialData?.description) {
      const cleaned = initialData.description.replace(/^\/\*/, "").trim();
      const parts = cleaned.split("/-").map((p) => p.trim()).filter(Boolean);

      if (parts.length > 0) {
        setMainDescription(parts[0]);
        setPoints(parts.slice(1));
      }
    }
  }, [initialData]);

  // Add new empty point
  const handleAddPoint = () => {
    setPoints([...points, ""]);
  };

  // Update point text
  const handlePointChange = (index, value) => {
    const updated = [...points];
    updated[index] = value;
    setPoints(updated);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        showToast("File size must be less than 5MB");
        setImageError("File size must be less than 5MB");
        setImageFile(null);
        setImageUrl(null);
        setShowCropper(false);
        return;
      }
      setImageError("");
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
      setShowCropper(true);
    }
  };

  const handleCropComplete = (croppedBlob) => {
    setImageFile(new File([croppedBlob], imageFile?.name || "cropped.jpg", { type: "image/jpeg" }));
    setImageUrl(URL.createObjectURL(croppedBlob));
    setShowCropper(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!imageFile && !initialData) {
      showToast("Please select and crop an image");
      return;
    }

    // build final description string: ¸
    const finalDescription = `/*${mainDescription}${points.length ? "/-" + points.join("/-") : ""}`;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", finalDescription.trim());
    if (imageFile) {
      formData.append("image", imageFile);
    }

    onSubmit(formData);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4 animate-fade-in">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-slide-up">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {initialData ? "Edit Banner" : "Add New Banner"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full border px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter banner title"
                />
              </div>

              {/* Main Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Main Description</label>
                <input
                  type="text"
                  value={mainDescription}
                  onChange={(e) => setMainDescription(e.target.value)}
                  required
                  className="w-full border px-3 py-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter main description"
                />
              </div>

              {/* Points with plus button */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Points</label>
                  <button
                    type="button"
                    onClick={handleAddPoint}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Plus size={18} className="mr-1" /> Add
                  </button>
                </div>
                {points.map((point, idx) => (
                  <input
                    key={idx}
                    type="text"
                    value={point}
                    onChange={(e) => handlePointChange(idx, e.target.value)}
                    className="w-full border px-3 py-2 mb-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder={`Point ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Image Upload */}
              <div>
                <ImageUpload
                  onImageChange={handleImageChange}
                  imageUrl={imageUrl}
                  imageError={imageError}
                  showCropper={showCropper}
                />
              </div>

              {/* Footer buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  {initialData ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Image Cropper */}
      {showCropper && (
        <ImageCropper
          imageUrl={imageUrl}
          onCropComplete={handleCropComplete}
          onClose={() => setShowCropper(false)}
        />
      )}

      {/* Toast */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ show: false, message: "", type: "error" })}
      />
    </>
  );
};

export default OfferBannerFormModal;
