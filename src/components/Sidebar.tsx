import { useState } from "react";
import { 
    FaBars,
    FaThLarge,
    FaBell,
    FaHandsHelping,
    FaUsersCog
} from "react-icons/fa";
import { Link } from "react-router-dom";

const navItems = [
    { to: "/dashboard", icon: <FaThLarge className="text-xl shrink-0" />, label: "Dashboard" },
    { to: "/incident-reports", icon: <FaBell className="text-xl shrink-0" />, label: "Incidents Report" },
    { to: "/counseling", icon: <FaHandsHelping className="text-xl shrink-0" />, label: "Counseling" },
    { to: "/user-management", icon: <FaUsersCog className="text-xl shrink-0" />, label: "Manage Users" },
];

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <aside className={`bg-[#4D2B8C] opacity-85 text-white p-4 transition-all duration-300 min-h-screen sticky top-0 flex flex-col ${isOpen ? "w-64" : "w-20"}`}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="mb-8 p-2 hover:bg-white/10 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 rounded-b-md flex items-center"
                aria-label="Toggle Sidebar"
            >
                <FaBars className="text-2xl cursor-pointer" />
            </button>

            <nav className="flex flex-col gap-1 flex-1">
                <ul className="flex flex-col gap-1">
                    {navItems.map(({ to, icon, label }, index) => (
                        <li key={to}>
                            <Link
                                to={to}
                                className={`flex items-center gap-3 p-2 rounded-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-white/10 ${index !== 0 ? "border-t border-white/20 pt-4 mt-2" : ""}`}
                            >
                                {icon}
                                <span className={`overflow-hidden whitespace-nowrap ${isOpen ? "opacity-100 max-w-xs" : "opacity-0 max-w-0"}`}>
                                    {label}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className={`p-2 text-sm text-gray-300 flex items-center gap-2 border-t border-white/20 pt-4 overflow-hidden`}>
                <span className="shrink-0 text-xs">👤</span>
                <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isOpen ? "opacity-100 max-w-xs" : "opacity-0 max-w-0"}`}>
                    <p className="text-xs">Logged in as:</p>
                    <span className="font-bold">User</span>
                </span>
            </div>
        </aside>
    );
}