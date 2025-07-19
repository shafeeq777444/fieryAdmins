import React, { useState } from 'react';
import {
  useGetAllDishes,
  useCreateDish,
  useUpdateDish,
  useDeleteDish,
} from '../services/queries/useMenu.jsx';

import SearchBar from '../components/AllMenuManagment/SearchBar';
import FilterBar from '../components/AllMenuManagment/FilterBar';

import Pagination from '../components/AllMenuManagment/Pagination';
import Modal from '../components/AllMenuManagment/Modal';
import DishForm from '../components/AllMenuManagment/DishForm';
import DishListSkeleton from '../components/skeltons/SkeltonDishList.jsx';
import DishList from '../components/AllMenuManagment/DishList.jsx';

const vendor = 'fieryGrills';

const PunjabiDishesAdmin = () => {
  const [category, setCategory] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentDish, setCurrentDish] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    category: 'vegetarian',
    isActive: true,
  });

  const { data, isLoading, isFetching } = useGetAllDishes({
    vendor,
    category: category === 'all' ? 'all' : category,
  });

  const createDishMutation = useCreateDish({ vendor });
  const updateDishMutation = useUpdateDish({ vendor, category });
  const deleteDishMutation = useDeleteDish({ vendor, category });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleAddDish = () => {
    const {id,...form}=formData
    console.log(form,"form")
    createDishMutation.mutate(form);
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleEditDish = () => {
    if (!currentDish) return;
    updateDishMutation.mutate({ id: currentDish._id, dishData: formData });
    setIsEditModalOpen(false);
    setCurrentDish(null);
    resetForm();
  };

  const handleDeleteDish = (id) => {
    deleteDishMutation.mutate({ id });
  };

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      description: '',
      category: category === 'all' ? 'vegetarian' : category,
      isActive: true,
    });
  };

  const openEditModal = (dish) => {
    setCurrentDish(dish);
    setFormData({
      id: dish._id,
      name: dish.name,
      description: dish.description,
      category: dish.category,
      isActive: dish.isAvailable,
    });
    setIsEditModalOpen(true);
  };

  const openAddModal = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1);
  };

  const filteredDishes = data?.dishes?.filter((dish) =>
    dish.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = filteredDishes?.length || 0;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDishes?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => currentPage < totalPages && setCurrentPage((p) => p + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage((p) => p - 1);

  return (
    <div className="md:h-[94vh] bg-white text-gray-900 p-6 rounded-md">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center border-gray-300 pb-4">Menus</h1>

        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onClearSearch={() => handleSearchChange({ target: { value: '' } })}
        />

        <FilterBar
          activeCategory={category}
          onCategoryChange={handleCategoryChange}
          onAddClick={openAddModal}
        />

        {isLoading ? (
          <DishListSkeleton count={itemsPerPage + 2} />
        ) : (
          <>
            <DishList
              dishes={currentItems || []}
              searchQuery={searchQuery}
              onEdit={openEditModal}
              onDelete={handleDeleteDish}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
              totalDishes={totalItems}
              currentPage={currentPage}
              indexOfFirstItem={indexOfFirstItem + 1}
              indexOfLastItem={Math.min(indexOfLastItem, totalItems)}
            />

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
                prevPage={prevPage}
                nextPage={nextPage}
              />
            )}
          </>
        )}
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Dish"
      >
        <DishForm
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleAddDish}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Dish"
      >
        <DishForm
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleEditDish}
          onCancel={() => setIsEditModalOpen(false)}
          isEdit
        />
      </Modal>
    </div>
  );
};

export default PunjabiDishesAdmin;
