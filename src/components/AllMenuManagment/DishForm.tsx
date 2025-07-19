import React from 'react';

const DishForm = ({
  formData,
  onInputChange,
  onSubmit,
  onCancel,
  isEdit = false
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onInputChange}
          className="w-full border border-gray-300 p-2"
        />
      </div>

      <div>
        <label className="block mb-1">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={onInputChange}
          className="w-full border border-gray-300 p-2"
        >
          <option value="vegetarian">Veg</option>
          <option value="non-vegetarian">Non-Veg</option>
          <option value="salad">Salad</option>
        </select>
      </div>

      <div>
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={onInputChange}
          className="w-full border border-gray-300 p-2 h-24"
        />
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="px-4 py-2 bg-black text-white"
          disabled={!formData.name || !formData.description}
        >
          {isEdit ? 'Update Dish' : 'Add Dish'}
        </button>
      </div>
    </div>
  );
};

export default DishForm;
