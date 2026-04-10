import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Fragment, useState } from "react";
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

const defaultUser = sampleData[0]?.name || "";

export default function IncidentReports() {
    const [data, setData] = useState<UserIncident[]>(sampleData);
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [newReportUser, setNewReportUser] = useState(defaultUser);
    const [newReportDate, setNewReportDate] = useState("");
    const [newReportBehavior, setNewReportBehavior] = useState("");

    const filteredData = data.filter(user =>
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

    const handleAddReport = () => {
        if (!newReportUser.trim() || !newReportDate || !newReportBehavior.trim()) {
            return;
        }

        setData(prev => {
            const userExists = prev.some(user => user.name === newReportUser);
            if (userExists) {
                return prev.map(user =>
                    user.name === newReportUser
                        ? { ...user, incidents: [...user.incidents, { date: newReportDate, behavior: newReportBehavior }] }
                        : user
                );
            }

            return [...prev, { name: newReportUser, incidents: [{ date: newReportDate, behavior: newReportBehavior }] }];
        });

        setNewReportDate("");
        setNewReportBehavior("");
        setIsAddModalOpen(false);
    };

    const downloadCsv = () => {
        const header = ["Name", "Date", "Behavior"];
        const rows = filteredData.flatMap(user =>
            user.incidents.map(incident => [user.name, incident.date, incident.behavior])
        );
        const csvContent = [header, ...rows]
            .map(row => row.map(value => `"${value.replace(/"/g, '""')}"`).join(","))
            .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "incident-reports.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setIsExportModalOpen(false);
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
                        <div className="absolute right-0 top-0 flex gap-4">
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="bg-[#8B5E83] text-white px-4 py-2 rounded hover:bg-[#D6B0B1] transition-colors"
                            >
                                Add Report
                            </button>
                            <button
                                onClick={() => setIsExportModalOpen(true)}
                                className="bg-[#486989] text-white px-4 py-2 rounded hover:bg-[#D6B0B1] transition-colors"
                            >
                                Export
                            </button>
                        </div>

                        <div className="mt-16">
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
                                        <Fragment key={index}>
                                            <tr
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
                                        </Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {isAddModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                            <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-2xl font-semibold">Add Incident Report</h2>
                                        <p className="text-sm text-gray-600">Add a new report to any student record.</p>
                                    </div>
                                    <button
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        Close
                                    </button>
                                </div>
                                <div className="grid gap-4">
                                    <label className="block">
                                        <span className="text-sm font-medium text-gray-700">Last Name</span>
                                        <input
                                            type="text"
                                            value={newReportUser}
                                            onChange={(e) => setNewReportUser(e.target.value)}
                                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83]"
                                            placeholder="Enter last name"
                                        />
                                    </label>
                                    <label className="block">
                                        <span className="text-sm font-medium text-gray-700">First Name</span>
                                        <input
                                            type="text"
                                            value={newReportUser}
                                            onChange={(e) => setNewReportUser(e.target.value)}
                                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83]"
                                            placeholder="Enter first name"
                                        />
                                    </label>
                                    <label className="block">
                                        <span className="text-sm font-medium text-gray-700">Middle Name</span>
                                        <input
                                            type="text"
                                            value={newReportUser}
                                            onChange={(e) => setNewReportUser(e.target.value)}
                                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83]"
                                            placeholder="Enter middle name"
                                        />
                                    </label>
                                    <label className="block">
                                        <span className="text-sm font-medium text-gray-700">Date</span>
                                        <input
                                            type="date"
                                            value={newReportDate}
                                            onChange={(e) => setNewReportDate(e.target.value)}
                                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83]"
                                        />
                                    </label>
                                    <label className="block">
                                        <span className="text-sm font-medium text-gray-700">Behavior</span>
                                        <textarea
                                            value={newReportBehavior}
                                            onChange={(e) => setNewReportBehavior(e.target.value)}
                                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83]"
                                            rows={4}
                                            placeholder="Describe the incident"
                                        />
                                    </label>
                                </div>
                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="rounded bg-[#587a33] px-4 py-2 text-white hover:bg-[#6e4765]"
                                    >
                                        Minor
                                    </button>
                                    <button
                                        onClick={handleAddReport}
                                        className="rounded bg-[#ff7800] px-4 py-2 text-white hover:bg-[#6e4765]"
                                    >
                                        Moderate/Severe
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {isExportModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-2xl font-semibold">Export Reports</h2>
                                        <p className="text-sm text-gray-600">Export the current visible report data to CSV.</p>
                                    </div>
                                    <button
                                        onClick={() => setIsExportModalOpen(false)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        Minor
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-gray-700">This will export {filteredData.length} student record{filteredData.length === 1 ? "" : "s"} and their incidents.</p>
                                    <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-600">
                                        The exported file includes Name, Date, and Behavior.
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        onClick={() => setIsExportModalOpen(false)}
                                        className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={downloadCsv}
                                        className="rounded bg-[#486989] px-4 py-2 text-white hover:bg-[#2d4f69]"
                                    >
                                        Download CSV
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}