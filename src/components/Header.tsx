import { useState } from "react";
import { FaChevronDown, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="shadow-md bg-[#4D2B8C] opacity-85 p-4 text-white font-bold text-lg relative">
            <div className="container mx-auto flex items-center justify-end">

                <div className="relative flex items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    <img src="/logo.png" alt="Profile" className="h-8 w-8 rounded-full mr-2" />
                    
                    <FaChevronDown className={`text-sm transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />

                    {isOpen && (
                        <div className="absolute right-0 top-12 w-48 bg-white text-gray-800 rounded shadow-lg py-2 z-50 font-normal text-sm">
                            <Link to="/profile" className="flex items-center px-4 py-2 hover:bg-gray-100 gap-3">
                                <FaUser className="text-gray-500" /> Profile
                            </Link>

                            <hr className="my-1 border-gray-200" />
                            
                            <Link to="/" className="flex items-center px-4 py-2 hover:bg-gray-100 gap-3">
                                <FaSignOutAlt /> Logout
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
