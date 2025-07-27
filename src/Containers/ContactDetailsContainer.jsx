'use client';
import React, { useState, useEffect } from 'react';
import { useGetContactDetails, useUpdateContactDetails } from '../services/queries/useContactDetails';


const ContactDetailsContainer = () => {
  const { data: contactDetails, isLoading } = useGetContactDetails();
  const updateMutation = useUpdateContactDetails();

  const [formData, setFormData] = useState({
    email: '',
    contactNumber: '',
    whatsapp: '',
    facebook: '',
    instagram: '',
    tiktok: '',
    website: '',
  });

  // Fill form with existing data
  useEffect(() => {
    if (contactDetails) {
      setFormData({
        email: contactDetails.email || '',
        contactNumber: contactDetails.contactNumber || '',
        whatsapp: contactDetails.whatsapp || '',
        facebook: contactDetails.facebook || '',
        instagram: contactDetails.instagram || '',
        tiktok: contactDetails.tiktok || '',
        website: contactDetails.website || '',
      });
    }
  }, [contactDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate({ id: contactDetails._id, ...formData });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Edit Contact Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block mb-1 capitalize">{key}</label>
            <input
              name={key}
              type="text"
              value={formData[key]}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ContactDetailsContainer;
