import { useState } from "react";
import { 
    FaBars
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);


    return (
        <aside className={`bg-[#8B5E83] text-white p-4 transition-all duration-300 min-h-screen sticky top-0 ${isOpen ? "w-64" : "w-20"}`}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="mb-8 p-2 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center"
                aria-label="Toggle Sidebar"
            >
                <FaBars className="text-2xl cursor-pointer" />
            </button>

            <nav className="flex flex-col gap-4">
                <ul>
                    <li>
                        <Link 
                            to="/dashboard"
                    
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                Dashboard
                        </Link>
                    </li>

                    <li>
                        <Link 
                            to="#"
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                Incidents Report
                        </Link>
                    </li>

                    <li>
                        <Link 
                            to="#"
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                Counseling
                        </Link>
                    </li>

                    <li>
                        <Link 
                            to="#"
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                User Management
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}