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
    CalendarDays,
    Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState("All");
    const [selectedVendor, setSelectedVendor] = useState(0);
    const [isVendorDropdownOpen, setIsVendorDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navigate = useNavigate();

    const dropdownRef = useRef(null);

    // Handle clicks outside the dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsVendorDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Sample vendor data - replace with your actual vendors
    const vendors = [
        // { id: 1, name: "All", logo: "/demoLogos/alldemoLogo.png" },
        { id: 1, name: "Fiery Grills", logo: "/FieryGrills/logos/fieryLogo1.png" },
        // { id: 2, name: "Bakery Three", logo: "/demoLogos/demoLogo2.png" },
        // { id: 3, name: "Bar Four", logo: "/demoLogos/demoLogo1.png" },
        // { id: 4, name: "Food Truck Five", logo: "/demoLogos/demoLogo3.png" },
    ];

    const menuItems = [
        // { name: "Dashboard", icon: <Home size={20} />, route: "/" },
        // { name: "Weekly Menu", icon: <CalendarDays size={20} />, route: "/weeklymenu" },
        // { name: "Total Menu", icon: <UtensilsCrossed size={20} />, route: "/menu" },
        { name: "Offer Banners", icon: <Images size={20} />, route: "/" },
        { name: "Subscriptions", icon: <Receipt size={20} />, route: "/subscriptions" },
        { name: "Add Ons", icon: <Plus size={20} />, route: "/addons" },
        // { name: "Users", icon: <Users size={20} />, route: "/users" },
        {name:"Profile", icon: <Users size={20} />, route: "/profile" },
        {name:"FAQs", icon: <span style={{ fontSize: 20 }}>?</span>, route: "/faqs" },
        // { name: "Customers", icon: <Users size={20} />, route: "/customers" },
        // { name: "Gallery", icon: <Images size={20} />, route: "/gallery" },
    ];

    const bottomMenuItems = [
        // { name: 'Notifications', icon: <Bell size={20} /> },
        { name: "Mails", icon: <Bell size={20} />, route: "/mails" },
        { name: "Logout", icon: <LogOut size={20} />, route: "/logout" },
    ];

    const handleItemClick = (itemName, route) => {
        setActiveItem(itemName);
        console.log(route, "--route");
        if (route) {
            navigate(route); // 👈 this does the routing
        }

        // On mobile, close the menu after item selection
        if (window.innerWidth < 768) {
            setIsMobileMenuOpen(false);
        }
    };

    const toggleVendorDropdown = () => {
        setIsVendorDropdownOpen(!isVendorDropdownOpen);
    };

    const selectVendor = (index) => {
        setSelectedVendor(index);
        setIsVendorDropdownOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden fixed top-4 left-4 z-30">
                <button onClick={toggleMobileMenu} className="p-2 bg-black rounded-md text-white" type="button">
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar - hidden on mobile unless toggled */}
            <div
                className={`
          fixed md:static inset-y-0 left-0 z-20  transform 
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 transition-transform duration-300 ease-in-out
          h-screen w-64 bg-black text-white flex flex-col
      `}
            >
                {/* Logo */}
                <div className="p-6 flex justify-center items-center">
                    <div className="text-2xl font-bold italic ">
                        <img
                            className="w-14 h-14 "
                            src={vendors[selectedVendor].logo}
                            alt={`${vendors[selectedVendor].name} logo`}
                        />
                    </div>
                </div>

                {/* Vendor Selector with Fixed Dropdown */}
                <div className="px-6 " ref={dropdownRef}>
                    {/* Blur background when dropdown is open */}
                    {isVendorDropdownOpen && (
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-90 backdrop-blur-sm z-0 rounded-md"></div>
                    )}

                    {/* Vendor Selection UI */}
                    <div
                        className="flex items-center justify-between p-2 rounded-md cursor-pointer relative z-10"
                        onClick={toggleVendorDropdown}
                    >
                        <span className="font-medium">{vendors[selectedVendor].name}</span>
                        {isVendorDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>

                    {/* Vendor Dropdown */}
                    {isVendorDropdownOpen && (
                        <div className="absolute left-6 right-6 mt-1 bg-black rounded-lg overflow-hidden shadow-lg z-20 ">
                            {vendors.map((vendor, index) => (
                                <div
                                    key={vendor.id}
                                    className={`flex items-center p-2 cursor-pointer ${
                                        selectedVendor === index
                                            ? "bg-gray-700/30 rounded-md"
                                            : "hover:bg-gray-700/40 transition-all duration-200 ease-in-out hover:rounded-md"
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
                <nav className="flex-1 overflow-y-auto">
                    <ul className="space-y-1">
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <button
                                    className={`w-full flex items-center px-6 py-3 text-left ${
                                        activeItem === item.name ? "text-white" : "text-gray-400"
                                    } hover:text-white transition-colors`}
                                    onClick={() => handleItemClick(item.name, item.route)}
                                    type="button"
                                >
                                    <span className="mr-3">{item.icon}</span>
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Divider */}
                <div className="mx-6 my-4 border-t border-gray-700"></div>

                {/* Bottom Navigation */}
                <nav className="mb-6">
                    <ul className="space-y-1">
                        {bottomMenuItems.map((item) => (
                            <li key={item.name}>
                                <button
                                    className={`w-full flex items-center px-6 py-3 text-left ${
                                        activeItem === item.name ? "text-white" : "text-gray-400"
                                    } hover:text-white transition-colors`}
                                    onClick={() => handleItemClick(item.name, item.route)}
                                    type="button"
                                >
                                    <span className="mr-3">{item.icon}</span>
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Mobile overlay backdrop */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-black/10 bg-opacity-50 z-10" onClick={toggleMobileMenu}></div>
            )}
        </>
    );
};

export default Sidebar;
