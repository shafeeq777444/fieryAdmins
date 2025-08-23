import React, { useState, useRef, useEffect } from "react";
import {
    Home,
    UtensilsCrossed,
    LogOut,
    Images,
    Users,
    Receipt,
    Bell,
    ChevronDown,
    ChevronUp,
    Menu,
    X,
    Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import localforage from "localforage";

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState("All");
    const [selectedVendor, setSelectedVendor] = useState(0);
    const [isVendorDropdownOpen, setIsVendorDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsVendorDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const vendors = [
        { id: 1, name: "Fiery Grills", logo: "/FieryGrills/logos/fieryLogo1.png" },
    ];

    const menuItems = [
        { name: "Offer Banners", icon: <Images size={20} />, route: "/" },
        { name: "Subscriptions", icon: <Receipt size={20} />, route: "/subscriptions" },
        { name: "Add Ons", icon: <Plus size={20} />, route: "/addons" },
        { name: "Profile", icon: <Users size={20} />, route: "/profile" },
        { name: "FAQs", icon: <span style={{ fontSize: 20 }}>?</span>, route: "/faqs" },
    ];

    const bottomMenuItems = [
        { name: "Customers", icon: <Bell size={20} />, route: "/customers" },
        { name: "Logout", icon: <LogOut size={20} /> },
    ];

    const handleItemClick = async (itemName, route) => {
        setActiveItem(itemName);

        if (itemName === "Logout") {
            setIsLogoutModalOpen(true);
            return;
        }

        if (route) navigate(route);
        if (window.innerWidth < 768) setIsMobileMenuOpen(false);
    };

    const confirmLogout = async () => {
        await localforage.clear();
        navigate("/login");
    };

    const toggleVendorDropdown = () => setIsVendorDropdownOpen(!isVendorDropdownOpen);
    const selectVendor = (index) => {
        setSelectedVendor(index);
        setIsVendorDropdownOpen(false);
    };
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <>
            {/* Mobile Menu Toggle */}
            <div className="md:hidden fixed top-4 left-4 z-30">
                <button onClick={toggleMobileMenu} className="p-2 bg-black rounded-md text-white">
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`
                    fixed md:static inset-y-0 left-0 z-20 transform
                    ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0 transition-transform duration-300 ease-in-out
                    h-screen w-64 bg-black text-white flex flex-col
                `}
            >
                {/* Logo */}
                <div className="p-6 flex justify-center items-center">
                    <img
                        className="w-14 h-14"
                        src={vendors[selectedVendor].logo}
                        alt={`${vendors[selectedVendor].name} logo`}
                    />
                </div>

                {/* Vendor Selector */}
                <div className="px-6 relative" ref={dropdownRef}>
                    <div
                        className="flex items-center justify-between p-2 rounded-md cursor-pointer"
                        onClick={toggleVendorDropdown}
                    >
                        <span className="font-medium">{vendors[selectedVendor].name}</span>
                        {isVendorDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>

                    {isVendorDropdownOpen && (
                        <div className="absolute left-0 right-0 mt-2 bg-gray-800 rounded-md overflow-hidden z-20">
                            {vendors.map((vendor, index) => (
                                <div
                                    key={vendor.id}
                                    className={`flex items-center p-2 cursor-pointer ${
                                        selectedVendor === index
                                            ? "bg-gray-700/50"
                                            : "hover:bg-gray-700/30"
                                    }`}
                                    onClick={() => selectVendor(index)}
                                >
                                    <span className="font-medium">{vendor.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Main Navigation */}
                <nav className="flex-1 overflow-y-auto mt-4">
                    <ul className="space-y-1">
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <button
                                    className={`w-full flex items-center px-6 py-3 text-left ${
                                        activeItem === item.name ? "text-white" : "text-gray-400"
                                    } hover:text-white`}
                                    onClick={() => handleItemClick(item.name, item.route)}
                                >
                                    <span className="mr-3">{item.icon}</span>
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Bottom Navigation */}
                <nav className="mb-6 mt-auto">
                    <ul className="space-y-1">
                        {bottomMenuItems.map((item) => (
                            <li key={item.name}>
                                <button
                                    className={`w-full flex items-center px-6 py-3 text-left ${
                                        activeItem === item.name ? "text-white" : "text-gray-400"
                                    } hover:text-white`}
                                    onClick={() => handleItemClick(item.name, item.route)}
                                >
                                    <span className="mr-3">{item.icon}</span>
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Mobile overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-black/10 z-10" onClick={toggleMobileMenu}></div>
            )}

            {/* Logout Confirmation Modal */}
            {isLogoutModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 animate-fadeIn">
                    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 w-96 max-w-md mx-4 transform transition-all duration-300 animate-slideUp">
                        {/* Header with Icon */}
                        <div className="flex items-center justify-center mb-6">
                            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </div>
                        </div>
                        
                        {/* Content */}
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Confirm Logout</h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Are you sure you want to log out? You'll need to sign in again to access your account.</p>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => setIsLogoutModalOpen(false)}
                                className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmLogout}
                                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all  font-medium shadow-lg hover:shadow-xl transform focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
