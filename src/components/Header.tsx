import { useState } from "react";
import { FaChevronDown, FaUser, FaSignOutAlt } from "react-icons/fa";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="shadow-md bg-[#8B5E83] p-4 text-white font-bold text-lg relative">
            <div className="container mx-auto flex items-center justify-end">

                <div className="relative flex items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    <img src="/logo.png" alt="Profile" className="h-8 w-8 rounded-full mr-2" />
                    
                    <FaChevronDown className={`text-sm transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />

                    {isOpen && (
                        <div className="absolute right-0 top-12 w-48 bg-white text-gray-800 rounded shadow-lg py-2 z-50 font-normal text-sm">
                            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100 gap-3">
                                <FaUser className="text-gray-500" /> Profile
                            </a>

                            <hr className="my-1 border-gray-200" />
                            
                            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100 gap-3 text-red-600">
                                <FaSignOutAlt /> Logout
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
