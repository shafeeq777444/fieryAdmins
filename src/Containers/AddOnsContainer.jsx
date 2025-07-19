import React, { useRef, useState } from "react";
import {
  useGetAddOns,
  useCreateAddOn,
  useUpdateAddOn,
  useDeleteAddOn,
} from "../services/queries/useAddOns";
import AddOnCard from "../components/addsOn/AddOnCard";
import EditAddOnModal from "../components/addsOn/EditAddOnModal";
import DeleteConfirmModal from "../components/addsOn/DeleteConformationModal";
import CreateForm from "../components/addsOn/CreateForm";
import toast from "react-hot-toast";

const AddOnsContainer = ({ vendor = "FG" }) => {
  const { data: addOns, isLoading } = useGetAddOns(vendor);
  const createMutation = useCreateAddOn(vendor);
  const updateMutation = useUpdateAddOn(vendor);
  const deleteMutation = useDeleteAddOn(vendor);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({ item: "", price: "" });
  const [file, setFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // 👈 for create form loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fd = new FormData();
    fd.append("item", formData.item);
    fd.append("price", formData.price);
    if (file) fd.append("img", file);

    try {
      await createMutation.mutateAsync(fd);
      setFormData({ item: "", price: "" });
      fileInputRef.current.value = "";
      setFile(null);
    } catch (error) {
      toast.error("Creation failed");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (addOn) => {
    setFormData({ item: addOn.item, price: addOn.price });
    setEditId(addOn._id);
    setFile(null);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    deleteMutation.mutate({ id: deleteId }, {
      onSuccess: () => {

        setShowDeleteModal(false);
        setDeleteId(null);
      },
    });
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return (
    <div className="p-6 text-gray-900">
      <h2 className="text-2xl font-semibold mb-6 border-b pb-2 border-gray-300">
        Add Ons — <span className="text-gray-600">{vendor}</span>
      </h2>

      {/* Create form */}
      <CreateForm
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        setFile={setFile}
        file={file}
        isSubmitting={isSubmitting}
        fileInputRef={fileInputRef}
      />

      {/* Grid */}
      {isLoading ? (
        <p className="text-center mt-8 text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {addOns?.map((addon, idx) => (
            <AddOnCard
              key={addon._id}
              addon={addon}
              onEdit={handleEdit}
              onDelete={handleDelete}
              delay={idx * 0.07}
            />
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {showModal && (
        <EditAddOnModal
          formData={formData}
          setFormData={setFormData}
          file={file}
          setFile={setFile}
          onClose={() => setShowModal(false)}
          onSave={({ id, addOnData }) =>
            updateMutation.mutateAsync({ id, addOnData })
          }
          editId={editId}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteConfirmModal
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default AddOnsContainer;
