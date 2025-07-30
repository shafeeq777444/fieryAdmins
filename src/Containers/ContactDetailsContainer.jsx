'use client';
import React, { useState, useEffect } from 'react';
import { useGetContactDetails, useUpdateContactDetails } from '../services/queries/useContactDetails';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const fields = [
  { name: 'email', label: 'Email', type: 'email', section: 'Contact Info' },
  { name: 'contactNumber', label: 'Phone', section: 'Contact Info' },
  { name: 'whatsapp', label: 'WhatsApp', type: 'text', section: 'Contact Info' },
  { name: 'facebook', label: 'Facebook', type: 'url', section: 'Social Links' },
  { name: 'instagram', label: 'Instagram', type: 'url', section: 'Social Links' },
  { name: 'tiktok', label: 'TikTok', type: 'url', section: 'Social Links' },
  { name: 'website', label: 'Website', type: 'url', section: 'Social Links' },
];

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
  const [success, setSuccess] = useState(false);

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
    setSuccess(false);
    updateMutation.mutate(
      { id: contactDetails._id, ...formData },
      {
        onSuccess: () => {
          setSuccess(true);
          setTimeout(() => setSuccess(false), 2000);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-white">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Group fields by section
  const groupedFields = fields.reduce((acc, field) => {
    acc[field.section] = acc[field.section] || [];
    acc[field.section].push(field);
    return acc;
  }, {});

  return (
    <div className="flex items-center justify-center  bg-gradient-to-br from-blue-100 to-white">
      <div className="w-full h-screen p-0  flex flex-col items-center justify-center">
        <div className="w-full max-w-5xl bg-white/70 shadow-2xl rounded-2xl border border-blue-100 p-10">
          {/* Last updated time */}
          {contactDetails?.updatedAt && (
            <div className="text-right text-xs text-gray-500 mb-2">
              Last updated: {new Date(contactDetails.updatedAt).toLocaleString()}
            </div>
          )}
          <div className="mb-8">
            <h2 className="text-4xl font-extrabold text-blue-800 mb-1 tracking-tight">Contact Details</h2>
            <p className="text-gray-500">Keep your contact and social information up to date.</p>
          </div>
          <form onSubmit={handleSubmit} autoComplete="off">
            {Object.entries(groupedFields).map(([section, fields]) => (
              <div key={section} className="mb-8">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">{section}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {fields.map(({ name, label, type }) => (
                    <div className="relative" key={name}>
                      {name === 'contactNumber' ? (
                        <>
                          <PhoneInput
                            country={'ca'}
                            value={formData.contactNumber}
                            onChange={phone => setFormData(prev => ({ ...prev, contactNumber: "+" + phone }))}
                            inputClass="!w-full !h-12 !border-b-2 !border-gray-300 !text-gray-900 !bg-transparent text-base md:text-lg"
                            buttonClass="!border-b-2 !border-gray-300"
                            containerClass="!w-full"
                            inputProps={{
                              name: 'contactNumber',
                              required: false,
                              autoFocus: false,
                            }}
                            enableAreaCodes={true}
                            disableCountryCode={false}
                            countryCodeEditable={false}
                            placeholder="+1 234 567 8901"
                          />
                          <label
                            htmlFor={name}
                            className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-blue-600 peer-focus:text-sm"
                            style={{ pointerEvents: 'none' }}
                          >
                            {label}
                          </label>
                        </>
                      ) : (
                        <>
                          <input
                            id={name}
                            name={name}
                            type={type}
                            value={formData[name]}
                            onChange={handleChange}
                            className="peer h-12 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500 bg-transparent transition"
                            placeholder={label}
                          />
                          <label
                            htmlFor={name}
                            className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-blue-600 peer-focus:text-sm"
                          >
                            {label}
                          </label>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-4 mt-8">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-10 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 text-lg"
                disabled={updateMutation.isLoading}
              >
                {updateMutation.isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin h-4 w-4 border-b-2 border-white rounded-full"></span>
                    Saving...
                  </span>
                ) : (
                  'Save Changes'
                )}
              </button>
              {success && (
                <span className="text-green-600 font-medium animate-fade-in text-lg">Saved!</span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsContainer;
