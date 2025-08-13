import React, { useState } from "react";
import { useGetContactUs } from "../services/queries/useContactUs";
import { useGetSubscribers } from "../services/queries/useSubscribers";

const CustomersContainer = () => {
  const [activeTab, setActiveTab] = useState("contacts");
  const [page, setPage] = useState(1);

  const { data: contactData, isLoading, error } = useGetContactUs("FG", page);
  const {
    data: subscribersData,
    isLoading: subsLoading,
    error: subsError,
  } = useGetSubscribers("FG", page);

  if (isLoading || subsLoading) return <div className="p-4">Loading...</div>;
  if (error || subsError)
    return (
      <div className="p-4 text-red-500">
        Error: {error?.message || subsError?.message}
      </div>
    );

  const contacts = contactData?.contacts || [];
  const subscribers = subscribersData?.subscribers || [];

  const totalPages =
    activeTab === "contacts"
      ? contactData?.totalPages || 1
      : subscribersData?.totalPages || 1;

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {["contacts", "subscribers"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setPage(1);
            }}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab === "contacts" ? "Contacts" : "Subscribers"}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              {activeTab === "contacts" ? (
                <>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Message</th>
                </>
              ) : (
                <>
                  <th className="p-3 text-left">Data</th>
                  <th className="p-3 text-left">Type</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {activeTab === "contacts"
              ? contacts.map((c) => (
                  <tr key={c._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{c.name}</td>
                    <td className="p-3">
                      <a
                        href={`mailto:${c.email}`}

                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {c.email}
                      </a>
                    </td>
                    <td className="p-3">
                      <a
                        href={`https://wa.me/${c.phoneNumber.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline"
                      >
                        {c.phoneNumber}
                      </a>
                    </td>
                    <td className="p-3">{c.message}</td>
                  </tr>
                ))
              : subscribers.map((s) => (
                  <tr key={s._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      {s.type === "email" ? (
                        <a
                          href={`mailto:${encodeURIComponent(s.data)}`}

                          className="text-blue-600 hover:underline"
                        >
                          {s.data}
                        </a>
                      ) : (
                        <a
                          href={`https://wa.me/${s.data.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:underline"
                        >
                          {s.data}
                        </a>
                      )}
                    </td>
                    <td className="p-3">{s.type}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg border transition ${
            page === 1
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "hover:bg-gray-100 border-gray-300"
          }`}
        >
          Prev
        </button>
        <span className="text-sm">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-lg border transition ${
            page === totalPages
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "hover:bg-gray-100 border-gray-300"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomersContainer;
