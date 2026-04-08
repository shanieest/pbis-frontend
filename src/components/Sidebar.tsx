import { useState } from "react";
import { 
    FaBars,
    FaThLarge,
    FaBell,
    FaHandsHelping,
    FaUsersCog
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
                            <FaThLarge className="text-xl shrink-0" />
                                Dashboard
                        </Link>
                    </li>

                    <li>
                        <Link 
                            to="/incident-reports"
                            className="flex items-center gap-3 p-2  hover:bg-white/10 transition-colors border-t border-white-700 pt-4"
                            >
                            <FaBell className="text-xl shrink-0" />
                                Incidents Report
                        </Link>
                    </li>

                    <li>
                        <Link 
                            to="/counseling"
                            className="flex items-center gap-3 p-2 hover:bg-white/10 transition-colors border-t border-white-700 pt-4"
                            >
                            <FaHandsHelping className="text-xl shrink-0" />
                                Counseling
                        </Link>
                    </li>

                    <li>
                        <Link 
                            to="/user-management"
                            className="flex items-center gap-3 p-2 hover:bg-white/10 transition-colors border-t border-white-700 pt-4"
                            >
                            <FaUsersCog className="text-xl shrink-0" />
                                User Management
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="mt-auto p-2 text-sm text-gray-300 flex items-center gap-2 border-t border-white-700 pt-4">
                <p className="text-xs">Logged in as:</p>
                <span className="font-bold">User</span>
            </div>
        </aside>
    );
}