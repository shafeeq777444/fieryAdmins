import React, { useState } from 'react';
import { Edit, Trash,  X,  } from 'lucide-react';
import { initialMixedWeeklyMenu, initialNonVegWeeklyMenu, initialVegWeeklyMenu } from '../constants/constants.WeeklyMenu';
import { MenuItem } from '../types/Type.WeeklyMenu';

// Define TypeScript interfaces


interface Category {
  id: string;
  name: string;
  menu: MenuItem[];
}

const WeeklyMenuManager: React.FC = () => {
  // Initial data
  

  

  // State management
  const [categories, setCategories] = useState<Category[]>([
    { id: "veg", name: "Vegetarian", menu: initialVegWeeklyMenu },
    { id: "nonveg", name: "Non-Vegetarian", menu: initialNonVegWeeklyMenu },
    { id: "mixed", name: "Mixed", menu: initialMixedWeeklyMenu },
  ]);
  
  const [activeCategory, setActiveCategory] = useState<string>("veg");
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [newMenuItem, setNewMenuItem] = useState<MenuItem>({
    day: "",
    mainDish: "",
    sides: ["", "", ""],
    image: "",
    id: 0
  });
  const [isConfirmingDelete, setIsConfirmingDelete] = useState<number | null>(null);

  // Get current active menu
  const activeMenu = categories.find(cat => cat.id === activeCategory)?.menu || [];

  // CRUD operations
  const addNewMenuItem = (): void => {
    if (!newMenuItem.day || !newMenuItem.mainDish) return;
    
    const updatedCategories = categories.map(category => {
      if (category.id === activeCategory) {
        const newId = Math.max(...category.menu.map(item => item.id), 0) + 1;
        const updatedMenu = [...category.menu, {...newMenuItem, id: newId}];
        return {...category, menu: updatedMenu};
      }
      return category;
    });
    
    setCategories(updatedCategories);
    setIsAdding(false);
    setNewMenuItem({
      day: "",
      mainDish: "",
      sides: ["", "", ""],
      image: "",
      id: 0
    });
  };

  const updateMenuItem = (): void => {
    if (!editingItem) return;
    
    const updatedCategories = categories.map(category => {
      if (category.id === activeCategory) {
        const updatedMenu = category.menu.map(item => 
          item.id === editingItem.id ? editingItem : item
        );
        return {...category, menu: updatedMenu};
      }
      return category;
    });
    
    setCategories(updatedCategories);
    setEditingItem(null);
  };

  const deleteMenuItem = (id: number): void => {
    const updatedCategories = categories.map(category => {
      if (category.id === activeCategory) {
        const updatedMenu = category.menu.filter(item => item.id !== id);
        return {...category, menu: updatedMenu};
      }
      return category;
    });
    
    setCategories(updatedCategories);
    setIsConfirmingDelete(null);
  };

  // Handlers for editing sides
  const handleSideChange = (index: number, value: string): void => {
    if (editingItem) {
      const updatedSides = [...editingItem.sides];
      updatedSides[index] = value;
      setEditingItem({...editingItem, sides: updatedSides});
    }
  };

  const handleNewItemSideChange = (index: number, value: string): void => {
    const updatedSides = [...newMenuItem.sides];
    updatedSides[index] = value;
    setNewMenuItem({...newMenuItem, sides: updatedSides});
  };

  return (
    <div className="p-6  min-h-full ">
      <h1 className="text-3xl font-bold mb-6">Weekly Menu Manager</h1>
      
      {/* Category Selector */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded-md font-medium ${
              activeCategory === category.id 
                ? 'bg-black text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => setActiveCategory(category.id)}
            type="button"
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Add New Item Button */}
      {/* <div className="mb-6">
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          onClick={() => setIsAdding(true)}
        >
          <Plus size={18} /> Add New Menu Item
        </button>
      </div> */}
      
      {/* Add New Item Form */}
      {isAdding && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Add New Menu Item</h2>
            <button 
              type="button" 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setIsAdding(false)}
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={newMenuItem.day}
                onChange={(e) => setNewMenuItem({...newMenuItem, day: e.target.value})}
              >
                <option value="">Select a day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Main Dish</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={newMenuItem.mainDish}
                onChange={(e) => setNewMenuItem({...newMenuItem, mainDish: e.target.value})}
                placeholder="Enter main dish"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image Path</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={newMenuItem.image}
                onChange={(e) => setNewMenuItem({...newMenuItem, image: e.target.value})}
                placeholder="/assets/image.png"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sides</label>
            {newMenuItem.sides.map((side, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={side}
                  onChange={(e) => handleNewItemSideChange(index, e.target.value)}
                  placeholder={`Side ${index + 1}`}
                />
              </div>
            ))}
          </div>
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              onClick={addNewMenuItem}
            >
              Add Item
            </button>
          </div>
        </div>
      )}
      
      {/* Weekly Menu Display with CRUD */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeMenu.map((item) => (
          <div 
            key={item.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* If editing this item */}
            {editingItem && editingItem.id === item.id ? (
              <div className="p-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={editingItem.day}
                    onChange={(e) => setEditingItem({...editingItem, day: e.target.value})}
                  >
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Main Dish</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={editingItem.mainDish}
                    onChange={(e) => setEditingItem({...editingItem, mainDish: e.target.value})}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image Path</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={editingItem.image}
                    onChange={(e) => setEditingItem({...editingItem, image: e.target.value})}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sides</label>
                  {editingItem.sides.map((side, index) => (
                    <div key={index} className="mb-2">
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={side}
                        onChange={(e) => handleSideChange(index, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    onClick={() => setEditingItem(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={updateMenuItem}
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="h-48 bg-gray-200 relative">
                  <img 
                    src={item.image || "/api/placeholder/400/320"} 
                    alt={item.mainDish}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      type="button"
                      className="p-2 bg-white bg-opacity-80 rounded-md hover:bg-opacity-100"
                      onClick={() => setEditingItem(item)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      type="button"
                      className="p-2 bg-white bg-opacity-80 rounded-md hover:bg-opacity-100"
                      onClick={() => setIsConfirmingDelete(item.id)}
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                  {isConfirmingDelete === item.id && (
                    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                      <div className="bg-white p-4 rounded-md shadow-lg">
                        <p className="mb-3 text-center">Are you sure you want to delete this item?</p>
                        <div className="flex justify-center gap-3">
                          <button
                            type="button"
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                            onClick={() => setIsConfirmingDelete(null)}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            onClick={() => deleteMenuItem(item.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">{item.day}</h3>
                  </div>
                  <p className="text-gray-800 font-medium mb-2">{item.mainDish}</p>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium mb-1">Sides:</p>
                    <ul className="list-disc pl-5">
                      {item.sides.map((side, idx) => (
                        <li key={idx}>{side}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyMenuManager;