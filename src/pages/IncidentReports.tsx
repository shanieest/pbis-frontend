import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useState } from "react";

interface Incident {
    date: string;
    description: string;
}

interface UserIncident {
    name: string;
    incidents: Incident[];
}

const sampleData: UserIncident[] = [
    {
        name: "Dela Cruz, Juan",
        incidents: [
            { date: "2023-10-01", description: "Minor incident" },
            { date: "2023-10-05", description: "Another incident" }
        ]
    },
    {
        name: "Dela Cruz, Juan",
        incidents: [
            { date: "2023-09-15", description: "Report filed" }
        ]
    },
    {
        name: "Dela Cruz, Maria",
        incidents: [
            { date: "2023-08-20", description: "Safety concern" },
            { date: "2023-09-10", description: "Follow-up" },
            { date: "2023-10-02", description: "Resolution" }
        ]
    }
];

export default function Incidentreports(){
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
                    <div className="relative">
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Search by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8B5E83] focus:border-transparent transition"
                            />
                        </div>
                        
                        <table className="w-full border-collapse border border-gray-300 mt-12">
                            <thead>
                                <tr style={{ backgroundColor: "#8B5E83", color: "white" }}>
                                    <th className="border border-gray-300 p-2">Name</th>
                                    <th className="border border-gray-300 p-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((user, index) => (
                                    <>
                                        <tr key={index} style={{ backgroundColor: "#8B5E83", color: "white" }}>
                                            <td className="border border-gray-300 p-2">{user.name}</td>
                                            <td className="border border-gray-300 p-2">
                                                <button
                                                    onClick={() => toggleRow(index)}
                                                    className="bg-white text-black px-2 py-1 rounded"
                                                >
                                                    {expandedRows.has(index) ? "Collapse" : "Expand"}
                                                </button>
                                            </td>
                                        </tr>
                                        {expandedRows.has(index) && (
                                            <tr>
                                                <td colSpan={2} className="border border-gray-300 p-2 bg-gray-100">
                                                    <div>
                                                        <h3 className="font-bold">Incidents:</h3>
                                                        <ul>
                                                            {user.incidents.map((incident, i) => (
                                                                <li key={i}>
                                                                    <strong>{incident.date}:</strong> {incident.description}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    )
}