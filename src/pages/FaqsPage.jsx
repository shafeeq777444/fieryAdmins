import React, { useState, useRef } from 'react';
import {
  useCreateFaq,
  useGetFaqs,
  useUpdateFaq,
  useDeleteFaq,
} from '../services/queries/useFaqs';

// Modal component for confirmation
const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Delete FAQ</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this FAQ? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-medium text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const FaqsPage = () => {
  const [isCreating, setIsCreating] = useState(true);
  const [editingFaq, setEditingFaq] = useState(null);
  const [formData, setFormData] = useState({ question: '', answer: '' });
  const [showModal, setShowModal] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null);
  const formRef = useRef(null);

  const { data: faqs, isLoading, error } = useGetFaqs("FG");
  const createFaqMutation = useCreateFaq('FG');
  const updateFaqMutation = useUpdateFaq('FG');
  const deleteFaqMutation = useDeleteFaq("FG");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) return;

    try {
      if (editingFaq) {
        await updateFaqMutation.mutateAsync({
          id: editingFaq._id,
          faqData: formData,
        });
        setEditingFaq(null);
      } else {
        await createFaqMutation.mutateAsync(formData);
        setIsCreating(false);
      }
      setFormData({ question: '', answer: '' });
    } catch (error) {
      console.error('Error saving FAQ:', error);
    }
  };

  const handleEdit = (faq) => {
    setEditingFaq(faq);
    setFormData({ question: faq.question, answer: faq.answer });
    setIsCreating(true);

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleDelete = (faq) => {
    setFaqToDelete(faq);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!faqToDelete) return;
    try {
      await deleteFaqMutation.mutateAsync({ id: faqToDelete._id });
      setShowModal(false);
      setFaqToDelete(null);
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setFaqToDelete(null);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingFaq(null);
    setFormData({ question: '', answer: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-red-800 font-medium">Error loading FAQs</h3>
            <p className="text-red-600 mt-1">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">

        <ConfirmModal
          isOpen={showModal}
          onClose={cancelDelete}
          onConfirm={confirmDelete}
        />

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">FAQ Management</h1>
              <p className="text-gray-600 mt-1">Manage frequently asked questions</p>
            </div>
            {!isCreating && (
              <button
                onClick={() => setIsCreating(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Add New FAQ
              </button>
            )}
          </div>
        </div>

        {/* Create/Edit Form */}
        {isCreating && (
          <div ref={formRef} className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {editingFaq ? 'Edit FAQ' : 'Create New FAQ'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                  Question
                </label>
                <input
                  type="text"
                  id="question"
                  name="question"
                  value={formData.question}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter the question..."
                  required
                />
              </div>
              <div>
                <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
                  Answer
                </label>
                <textarea
                  id="answer"
                  name="answer"
                  value={formData.answer}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter the answer..."
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={createFaqMutation.isPending || updateFaqMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {createFaqMutation.isPending || updateFaqMutation.isPending
                    ? 'Saving...'
                    : editingFaq
                    ? 'Update FAQ'
                    : 'Create FAQ'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* FAQs List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              FAQs ({faqs?.length || 0})
            </h2>
          </div>

          {!faqs || faqs.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs yet</h3>
              <p className="text-gray-500 mb-4">Get started by creating your first FAQ.</p>
              {!isCreating && (
                <button
                  onClick={() => setIsCreating(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Create First FAQ
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {faqs.map((faq) => (
                <div key={faq.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      {faq.createdAt && (
                        <p className="text-sm text-gray-400 mt-3">
                          Created: {new Date(faq.createdAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(faq)}
                        className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                        title="Edit FAQ"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(faq)}
                        disabled={deleteFaqMutation.isPending}
                        className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                        title="Delete FAQ"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaqsPage;
