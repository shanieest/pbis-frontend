import { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="shadow-md bg-[#8B5E83] p-4 text-white font-bold text-lg relative">
            <div className="container mx-auto flex items-center">
                <div className="relative flex items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    <img src="/logo.png" alt="Profile" className="h-8 w-8 rounded-full mr-2" />
                    <div className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
                        </div>

                    {isOpen && (
                        <div className="absolute left-0 top-10 w-48 bg-white text-gray-800 rounded shadow-lg py-2 z-50 font-normal text-sm">
                            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100 gap-3">
                                <div/>Profile
                            </a>

                            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100 gap-3">
                                <div /> 
                            </a>
                            <hr className="my-1 border-gray-200" />
                            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100 gap-3">
                                Logout
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
