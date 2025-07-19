import React, { useState, useEffect } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { useGetIndividualPlan } from "../../services/queries/usePlans";
import { useUpdateIndividualPlan } from "../../services/queries/usePlans";


const PlanEditModal = ({ editModal, setEditModal, planId }) => {
    const { mutate } = useUpdateIndividualPlan('fieryGrillss'); //it can change this constant to dynamic
    const { data, isLoading, error } = useGetIndividualPlan(planId);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        vendor: "",
        mealType: "veg",
        planType: "Individual Plan",
        price: "",
        pricePer: "week",
        description: ["", "", "", ""],
    });
    useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data]);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleDescriptionChange = (index, value) => {
        setFormData((prev) => ({
            ...prev,
            description: prev.description.map((item, i) => (i === index ? value : item)),
        }));
    };

    const addDescriptionItem = () => {
        setFormData((prev) => ({
            ...prev,
            description: [...prev.description, ""],
        }));
    };

    const removeDescriptionItem = (index) => {
        setFormData((prev) => ({
            ...prev,
            description: prev.description.filter((_, i) => i !== index),
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        setIsSaving(false);
        setEditModal(false);
        mutate({ id: planId, data: formData });
        
    };

    if (!editModal) return null;

    return (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-black text-white px-6 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Edit Meal Plan</h2>
                    <button onClick={() => setEditModal(false)} className="hover:bg-gray-800 p-1 rounded transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="animate-spin mr-2" size={24} />
                            <span className="text-gray-600">Loading plan details...</span>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Fixed Fields - Read Only */}
                            <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                                {/* Vendor - Read Only */}
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">Vendor</label>
                                    <div className="w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg text-gray-700">
                                        {formData.vendor}
                                    </div>
                                </div>

                                {/* Meal Type and Plan Type - Read Only */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-600 mb-2">Meal Type</label>
                                        <div className="w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg text-gray-700">
                                            {formData.mealType === "veg"
                                                ? "Vegetarian"
                                                : formData.mealType === "non-veg"
                                                ? "Non-Vegetarian"
                                                : "Vegan"}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-600 mb-2">Plan Type</label>
                                        <div className="w-full px-4 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg text-gray-700">
                                            {formData.planType}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-semibold text-black mb-2">Plan Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange("title", e.target.value)}
                                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors"
                                    placeholder="Enter plan title"
                                />
                            </div>

                            {/* Price and Price Per */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-black mb-2">Price</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => handleInputChange("price", e.target.value)}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors"
                                        placeholder="Enter price"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-black mb-2">Price Per</label>
                                    <select
                                        value={formData.pricePer}
                                        onChange={(e) => handleInputChange("pricePer", e.target.value)}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors"
                                    >
                                        <option value="day">Per Day</option>
                                        <option value="week">Per Week</option>
                                        <option value="biweek">Per BIWeek</option>
                                        <option value="month">Per Month</option>
                                    </select>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-black mb-2">Description Points</label>
                                <div className="space-y-3">
                                    {formData.description.map((item, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={item}
                                                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                                                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-colors"
                                                placeholder={`Description point ${index + 1}`}
                                            />
                                            {formData.description.length > 1 && (
                                                <button
                                                    onClick={() => removeDescriptionItem(index)}
                                                    className="px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                                                >
                                                    <X size={16} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        onClick={addDescriptionItem}
                                        className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-black hover:text-black transition-colors"
                                    >
                                        + Add Description Point
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t">
                    <button
                        onClick={() => setEditModal(false)}
                        className="px-6 py-2 border-2 border-gray-300 rounded-lg text-gray-700 hover:border-black hover:text-black transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        {isSaving ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save size={16} />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlanEditModal;
