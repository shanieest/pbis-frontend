import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { Fragment, useState } from "react";
import { FaChevronDown, FaChevronUp, FaWindowClose, FaEdit, FaTrashAlt, FaFileExport, FaPlus } from "react-icons/fa";

interface Incident {
    id?: number;
    date: string;
    behavior: string;
    reportedBy: string;
    severity: "minor" | "moderate" | "severe";
}

interface UserIncident {
    id: number;
    name: string;
    lastName: string;
    firstName: string;
    middleName: string;
    incidents: Incident[];
}

const sampleData: UserIncident[] = [
    {
        id: 1,
        name: "Dela Cruz, Juan",
        lastName: "Dela Cruz",
        firstName: "Juan",
        middleName: "Santos",
        incidents: [
            { id: 1, date: "2023-10-01", behavior: "Disruptive behavior in class", severity: "minor", reportedBy: "Sinukuan, Maria" },
            { id: 2, date: "2023-10-05", behavior: "Inappropriate language", severity: "moderate", reportedBy: "Sinukuan, Maria" }
        ]
    },
    {
        id: 2,
        name: "Dela Cruz, Maria",
        lastName: "Dela Cruz",
        firstName: "Maria",
        middleName: "Reyes",
        incidents: [
            { id: 3, date: "2023-08-20", behavior: "Physical altercation", severity: "severe", reportedBy: "Jusmiyo, Marimar" },
            { id: 4, date: "2023-09-10", behavior: "Verbal warning", severity: "minor", reportedBy: "Jusmiyo, Marimar" },
            { id: 5, date: "2023-10-02", behavior: "Detention assigned", severity: "moderate", reportedBy: "Jusmiyo, Marimar" }
        ]
    },
    {
        id: 3,
        name: "Reyes, Jose",
        lastName: "Reyes",
        firstName: "Jose",
        middleName: "Garcia",
        incidents: [
            { id: 6, date: "2023-09-15", behavior: "Tardiness", severity: "minor", reportedBy: "Pusong Sinaktan" }
        ]
    }
];

export default function IncidentReports() {
    const [data, setData] = useState<UserIncident[]>(sampleData);
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Form states
    const [selectedUser, setSelectedUser] = useState<UserIncident | null>(null);
    const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [incidentDate, setIncidentDate] = useState("");
    const [incidentBehavior, setIncidentBehavior] = useState("");
    const [incidentSeverity, setIncidentSeverity] = useState<"minor" | "moderate" | "severe">("minor");
    const [reportedBy, setReportedBy] = useState("");

    const filteredData = data.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleRow = (userId: number) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(userId)) {
            newExpanded.delete(userId);
        } else {
            newExpanded.add(userId);
        }
        setExpandedRows(newExpanded);
    };

    const handleAddReport = () => {
        if (!lastName.trim() || !firstName.trim() || !incidentDate || !incidentBehavior.trim() || !reportedBy.trim()) {
            alert("Please fill in all required fields");
            return;
        }

        const fullName = `${lastName}, ${firstName}${middleName ? ` ${middleName}` : ''}`;
        const newIncident: Incident = {
            id: Date.now(),
            date: incidentDate,
            behavior: incidentBehavior,
            severity: incidentSeverity,
            reportedBy: reportedBy
        };

        setData(prev => {
            const userExists = prev.find(user =>
                user.lastName.toLowerCase() === lastName.toLowerCase() &&
                user.firstName.toLowerCase() === firstName.toLowerCase()
            );

            if (userExists) {
                return prev.map(user =>
                    user.id === userExists.id
                        ? { ...user, incidents: [...user.incidents, newIncident] }
                        : user
                );
            }

            const newUser: UserIncident = {
                id: Date.now(),
                name: fullName,
                lastName,
                firstName,
                middleName: middleName || "",
                incidents: [newIncident]
            };
            return [...prev, newUser];
        });

        resetForm();
        setIsAddModalOpen(false);
    };

    const handleEditIncident = () => {
        if (!selectedUser || !selectedIncident) return;

        setData(prev => prev.map(user => {
            if (user.id === selectedUser.id) {
                return {
                    ...user,
                    incidents: user.incidents.map(incident =>
                        incident.id === selectedIncident.id
                            ? { ...incident, date: incidentDate, behavior: incidentBehavior, severity: incidentSeverity, reportedBy: reportedBy }
                            : incident
                    )
                };
            }
            return user;
        }));

        resetForm();
        setIsEditModalOpen(false);
        setSelectedUser(null);
        setSelectedIncident(null);
    };

    const handleDeleteIncident = () => {
        if (!selectedUser || !selectedIncident) return;

        setData(prev => prev.map(user => {
            if (user.id === selectedUser.id) {
                return {
                    ...user,
                    incidents: user.incidents.filter(incident => incident.id !== selectedIncident.id)
                };
            }
            return user;
        }));

        setIsDeleteModalOpen(false);
        setSelectedUser(null);
        setSelectedIncident(null);
    };

    const openEditModal = (user: UserIncident, incident: Incident) => {
        setSelectedUser(user);
        setSelectedIncident(incident);
        setLastName(user.lastName);
        setFirstName(user.firstName);
        setMiddleName(user.middleName);
        setIncidentDate(incident.date);
        setIncidentBehavior(incident.behavior);
        setIncidentSeverity(incident.severity);
        setReportedBy(incident.reportedBy);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (user: UserIncident, incident: Incident) => {
        setSelectedUser(user);
        setSelectedIncident(incident);
        setIsDeleteModalOpen(true);
    };

    const resetForm = () => {
        setLastName("");
        setFirstName("");
        setMiddleName("");
        setIncidentDate("");
        setIncidentBehavior("");
        setIncidentSeverity("minor");
        setReportedBy("");
    };

    const downloadCSV = () => {
        const header = ["Name", "Date", "Behavior", "Severity", "Reported By"];
        const rows = filteredData.flatMap(user =>
            user.incidents.map(incident => [
                user.name,
                incident.date,
                incident.behavior,
                incident.severity.toUpperCase(),
                incident.reportedBy
            ])
        );

        const csvContent = [header, ...rows]
            .map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(","))
            .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `incident-reports-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setIsExportModalOpen(false);
    };

    const downloadExcel = () => {
        // Prepare data for Excel
        const excelData = filteredData.flatMap(user =>
            user.incidents.map(incident => ({
                "Student Name": user.name,
                "Last Name": user.lastName,
                "First Name": user.firstName,
                "Middle Name": user.middleName,
                "Incident Date": incident.date,
                "Behavior": incident.behavior,
                "Severity": incident.severity.toUpperCase(),
                "Reported By": incident.reportedBy
            }))
        );

    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'minor': return 'bg-green-100 text-green-800';
            case 'moderate': return 'bg-yellow-100 text-yellow-800';
            case 'severe': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-1 p-10 bg-gray-50">
                    <div className="w-full max-w-6xl mx-auto px-6 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 items-end border-b-4 border-slate-900 pb-4 mb-8">
                            <div>
                                <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
                                    Incident Reports
                                </h1>
                                <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mt-1">
                                    <Link to="/dashboard">
                                        Dashboard/
                                    </Link>
                                    Incident Reports
                                </p>
                            </div>
                            <div className="flex justify-end gap-3 mt-4 md:mt-0">
                                <button
                                    onClick={() => setIsAddModalOpen(true)}
                                    className="bg-[#4D2B8C] hover:bg-[#3a1f6e] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                >
                                    <FaPlus /> Add Report
                                </button>
                                <button
                                    onClick={() => setIsExportModalOpen(true)}
                                    className="bg-[#5B7E3C] hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                >
                                    <FaFileExport /> Export
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="p-4 bg-gradient-to-r from-[#4D2B8C] to-[#85409D]">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                <p className="font-semibold text-white text-lg">Incident Reports</p>
                                <input
                                    type="text"
                                    placeholder="Search by name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="text-white w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5E83] focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse container mx-auto">
                                <tbody>
                                    {filteredData.map((user) => (
                                        <Fragment key={user.id}>
                                            <tr
                                                className="cursor-pointer hover:bg-gray-100 transition-colors"
                                                onClick={() => toggleRow(user.id)}
                                            >
                                                <td className="border-b border-gray-200 p-4 font-semibold text-gray-800">
                                                    {user.name}
                                                    <span className="ml-2 text-sm text-gray-500">
                                                        ({user.incidents.length} incident{user.incidents.length !== 1 ? 's' : ''})
                                                    </span>
                                                </td>
                                                <td className="border-b border-gray-200 p-4 text-right w-10">
                                                    {expandedRows.has(user.id) ?
                                                        <FaChevronUp className="ml-auto text-gray-600" /> :
                                                        <FaChevronDown className="ml-auto text-gray-600" />
                                                    }
                                                </td>
                                            </tr>

                                            {expandedRows.has(user.id) && (
                                                <tr>
                                                    <td colSpan={2} className="border-b border-gray-200 bg-gray-50 p-0">
                                                        <table className="w-full">
                                                            <thead>
                                                                <tr className="bg-gray-100">
                                                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                                                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Behavior</th>
                                                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Severity</th>
                                                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Reported By</th>
                                                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {user.incidents.map((incident) => (
                                                                    <tr key={incident.id} className="border-b border-gray-200">
                                                                        <td className="px-4 py-3 text-sm text-gray-700">{incident.date}</td>
                                                                        <td className="px-4 py-3 text-sm text-gray-700">{incident.behavior}</td>
                                                                        <td className="px-4 py-3">
                                                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(incident.severity)}`}>
                                                                                {incident.severity.toUpperCase()}
                                                                            </span>
                                                                        </td>
                                                                        <td className="px-4 py-3 text-sm text-gray-700">{incident.reportedBy}</td>
                                                                        <td className="px-4 py-3 text-right">
                                                                            <button
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    openEditModal(user, incident);
                                                                                }}
                                                                                className="bg-[#ff7800] text-white px-3 py-1 rounded text-sm hover:bg-[#e06600] transition-colors mr-2"
                                                                            >
                                                                                <FaEdit />
                                                                            </button>
                                                                            <button
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    openDeleteModal(user, incident);
                                                                                }}
                                                                                className="bg-[#ff4d4d] text-white px-3 py-1 rounded text-sm hover:bg-[#e60000] transition-colors"
                                                                            >
                                                                                <FaTrashAlt />
                                                                            </button>
                                                                        </td>
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

                    {/* Add Modal */}
                    {isAddModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 bg-black/60 backdrop-blur-sm transition-opacity">
                            <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl">
                                <div className="bg-[#8B5E83] text-white p-6 rounded-t-2xl">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-2xl font-semibold">Add Incident Report</h2>
                                            <p className="text-sm text-white/90 mt-1">Add a new incident report to a student record.</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setIsAddModalOpen(false);
                                                resetForm();
                                            }}
                                            className="text-white/80 hover:text-white transition-colors"
                                        >
                                            <FaWindowClose className="text-2xl" />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="grid gap-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Last Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5E83] focus:border-transparent"
                                                    placeholder="Dela Cruz"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    First Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5E83] focus:border-transparent"
                                                    placeholder="Juan"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Middle Name
                                            </label>
                                            <input
                                                type="text"
                                                value={middleName}
                                                onChange={(e) => setMiddleName(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5E83] focus:border-transparent"
                                                placeholder="Santos"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Incident Date *
                                            </label>
                                            <input
                                                type="date"
                                                value={incidentDate}
                                                onChange={(e) => setIncidentDate(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5E83] focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Behavior *
                                            </label>
                                            <textarea
                                                value={incidentBehavior}
                                                onChange={(e) => setIncidentBehavior(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5E83] focus:border-transparent"
                                                rows={3}
                                                placeholder="Describe the incident behavior..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Reported By *
                                            </label>
                                            <input
                                                type="text"
                                                value={reportedBy}
                                                onChange={(e) => setReportedBy(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5E83] focus:border-transparent"
                                                placeholder="Name of reporter"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Severity *
                                            </label>
                                            <select
                                                value={incidentSeverity}
                                                onChange={(e) => setIncidentSeverity(e.target.value as "minor" | "moderate" | "severe")}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5E83] focus:border-transparent"
                                            >
                                                <option value="minor">Minor</option>
                                                <option value="moderate">Moderate</option>
                                                <option value="severe">Severe</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3 mt-6">
                                        <button
                                            onClick={() => {
                                                setIsAddModalOpen(false);
                                                resetForm();
                                            }}
                                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleAddReport}
                                            className="px-4 py-2 bg-[#4D2B8C] text-white rounded-lg hover:bg-[#3a1f6e] transition-colors"
                                        >
                                            Add Incident
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Edit Modal */}
                    {isEditModalOpen && selectedUser && selectedIncident && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 bg-black/60 backdrop-blur-sm transition-opacity">
                            <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl">
                                <div className="bg-[#ff7800] text-white p-6 rounded-t-2xl">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-2xl font-semibold">Edit Incident Report</h2>
                                            <p className="text-sm text-white/90 mt-1">Editing incident for {selectedUser.name}</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setIsEditModalOpen(false);
                                                resetForm();
                                            }}
                                            className="text-white/80 hover:text-white transition-colors"
                                        >
                                            <FaWindowClose className="text-2xl" />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="grid gap-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                                <input type="text" value={lastName} disabled className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                                <input type="text" value={firstName} disabled className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Incident Date *</label>
                                            <input type="date" value={incidentDate} onChange={(e) => setIncidentDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7800]" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Behavior *</label>
                                            <textarea value={incidentBehavior} onChange={(e) => setIncidentBehavior(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7800]" rows={3} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Reported By *</label>
                                            <input type="text" value={reportedBy} onChange={(e) => setReportedBy(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7800]" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Severity *</label>
                                            <select value={incidentSeverity} onChange={(e) => setIncidentSeverity(e.target.value as "minor" | "moderate" | "severe")} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7800]">
                                                <option value="minor">Minor</option>
                                                <option value="moderate">Moderate</option>
                                                <option value="severe">Severe</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3 mt-6">
                                        <button onClick={() => { setIsEditModalOpen(false); resetForm(); }} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                                        <button onClick={handleEditIncident} className="px-4 py-2 bg-[#ff7800] text-white rounded-lg hover:bg-[#e06600]">Save Changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Delete Modal */}
                    {isDeleteModalOpen && selectedUser && selectedIncident && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 bg-black/60 backdrop-blur-sm transition-opacity">
                            <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
                                <div className="bg-[#ff4d4d] text-white p-6 rounded-t-2xl">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-semibold">Delete Incident</h2>
                                        <button onClick={() => setIsDeleteModalOpen(false)} className="text-white/80 hover:text-white"><FaWindowClose className="text-2xl" /></button>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-gray-700 mb-2">Are you sure you want to delete this incident?</p>
                                    <p className="text-sm text-gray-500"><strong>Student:</strong> {selectedUser.name}</p>
                                    <p className="text-sm text-gray-500"><strong>Behavior:</strong> {selectedIncident.behavior}</p>
                                    <p className="text-sm text-gray-500"><strong>Date:</strong> {selectedIncident.date}</p>
                                    <div className="flex justify-end gap-3 mt-6">
                                        <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                                        <button onClick={handleDeleteIncident} className="px-4 py-2 bg-[#ff4d4d] text-white rounded-lg hover:bg-[#e60000]">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Export Modal */}
                    {isExportModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 bg-black/60 backdrop-blur-sm transition-opacity">
                            <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
                                <div className="bg-[#5B7E3C] text-white p-6 rounded-t-2xl">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-semibold">Export Reports</h2>
                                        <button onClick={() => setIsExportModalOpen(false)} className="text-white/80 hover:text-white"><FaWindowClose className="text-2xl" /></button>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-gray-700 mb-4">Choose your export format:</p>
                                    <div className="flex gap-4">
                                        <button onClick={downloadCSV} className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center">CSV Format</button>
                                        <button onClick={downloadExcel} className="flex-1 px-4 py-3 bg-[#5B7E3C] text-white rounded-lg hover:bg-green-700 transition-colors text-center">Excel Format</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}