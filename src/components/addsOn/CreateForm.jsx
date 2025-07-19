import React from "react";
import toast from "react-hot-toast";

const CreateForm = ({ handleSubmit, formData, setFormData, setFile, isSubmitting,fileInputRef}) => {
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
      
        if (selectedFile && selectedFile.size > 10 * 1024 * 1024) {
          toast.error("File too large! Max allowed is 10MB.");
          fileInputRef.current.value = null;
          return;
        }
      
        setFile(selectedFile);
      };
    
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white border border-gray-200 p-4 rounded-xl shadow-sm mb-8"
    >
      <input
        type="text"
        value={formData.item}
        onChange={(e) => setFormData({ ...formData, item: e.target.value })}
        placeholder="Item"
        className="w-full border border-gray-300 p-2 rounded"
        disabled={isSubmitting}
      />
      <input
        type="text"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        placeholder="Price"
        className="w-full border border-gray-300 p-2 rounded"
        disabled={isSubmitting}
      />
      <input
      ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="w-full file:bg-black file:text-white file:px-4 file:py-1 file:rounded file:border-0 file:cursor-pointer"
        disabled={isSubmitting}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            <span>Creating...</span>
          </>
        ) : (
          "Create Add-On"
        )}
      </button>
    </form>
  );
};

export default CreateForm;
