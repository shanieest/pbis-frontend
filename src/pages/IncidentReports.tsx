import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface Incident {
    date: string;
    behavior: string;
}

interface UserIncident {
    name: string;
    incidents: Incident[];
}

const sampleData: UserIncident[] = [
    {
        name: "Dela Cruz, Juan",
        incidents: [
            { date: "2023-10-01", behavior: "Minor incident" },
            { date: "2023-10-05", behavior: "Another incident" }
        ]
    },
    {
        name: "Dela Cruz, Juan",
        incidents: [
            { date: "2023-09-15", behavior: "Report filed" }
        ]
    },
    {
        name: "Dela Cruz, Maria",
        incidents: [
            { date: "2023-08-20", behavior: "Safety concern" },
            { date: "2023-09-10", behavior: "Follow-up" },
            { date: "2023-10-02", behavior: "Resolution" }
        ]
    }
];

export default function Incidentreports() {
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

    const filteredData = sampleData.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleRow = (index: number) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedRows(newExpanded);
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-1 p-10 bg-gray-50">
                    <h1 className="text-3xl font-bold font-serif text-black tracking-wide mb-8">
                        Incident Reports
                    </h1>
                    <div className="flex flex-col gap-4 relative">
                        <button className="absolute right-24 top-0 bg-[#8B5E83] text-white px-4 py-2 rounded hover:bg-[#D6B0B1] transition-colors">
                            Add Report
                        </button>
                        <button className="absolute right-0 top-0 bg-[#486989] text-white px-4 py-2 rounded hover:bg-[#D6B0B1] transition-colors">
                            Export
                        </button>

                        <div className="mt-12">
                            <div className="flex items-center justify-between mb-3">
                                <p className="font-semibold text-gray-700">Incident Reports</p>
                                <input
                                    type="text"
                                    placeholder="Search by name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8B5E83] focus:border-transparent transition"
                                />
                            </div>

                            <table className="w-full border-collapse border border-gray-300">
                                <tbody>
                                    {filteredData.map((user, index) => (
                                        <>
                                            {/* Collapsible Header Row */}
                                            <tr
                                                key={index}
                                                className="cursor-pointer"
                                                style={{ backgroundColor: "#8B5E83", color: "white" }}
                                                onClick={() => toggleRow(index)}
                                            >
                                                <td className="border border-gray-300 p-3 font-semibold">
                                                    {user.name}
                                                </td>
                                                <td className="border border-gray-300 p-3 text-right w-10">
                                                    {expandedRows.has(index) ? <FaChevronUp className="ml-auto" /> : <FaChevronDown className="ml-auto" />}
                                                </td>
                                            </tr>

                                            {/* Expanded Incident Table */}
                                            {expandedRows.has(index) && (
                                                <tr>
                                                    <td colSpan={2} className="border border-gray-300 bg-gray-50 p-0">
                                                        <table className="w-full border-collapse">
                                                            <thead>
                                                                <tr className="bg-gray-200 text-gray-700 text-sm">
                                                                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Date</th>
                                                                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Behavior</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {user.incidents.map((incident, i) => (
                                                                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                                                        <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{incident.date}</td>
                                                                        <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{incident.behavior}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            )}
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}