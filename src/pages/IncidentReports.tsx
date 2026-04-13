import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Fragment, useState } from "react";
import { FaChevronDown, FaChevronUp, FaWindowClose, FaEdit, FaTrashAlt } from "react-icons/fa";

interface Incident {
    id?: number;
    date: string;
    behavior: string;
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
            { id: 1, date: "2023-10-01", behavior: "Disruptive behavior in class", severity: "minor" },
            { id: 2, date: "2023-10-05", behavior: "Inappropriate language", severity: "moderate" }
        ]
    },
    {
        id: 2,
        name: "Dela Cruz, Maria",
        lastName: "Dela Cruz",
        firstName: "Maria",
        middleName: "Reyes",
        incidents: [
            { id: 3, date: "2023-08-20", behavior: "Physical altercation", severity: "severe" },
            { id: 4, date: "2023-09-10", behavior: "Verbal warning", severity: "minor" },
            { id: 5, date: "2023-10-02", behavior: "Detention assigned", severity: "moderate" }
        ]
    },
    {
        id: 3,
        name: "Reyes, Jose",
        lastName: "Reyes",
        firstName: "Jose",
        middleName: "Garcia",
        incidents: [
            { id: 6, date: "2023-09-15", behavior: "Tardiness", severity: "minor" }
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
        if (!lastName.trim() || !firstName.trim() || !incidentDate || !incidentBehavior.trim()) {
            alert("Please fill in all required fields");
            return;
        }

        const fullName = `${lastName}, ${firstName}`;
        const newIncident: Incident = {
            id: Date.now(),
            date: incidentDate,
            behavior: incidentBehavior,
            severity: incidentSeverity
        };

        setData(prev => {
            const userExists = prev.find(user => 
                user.lastName === lastName && user.firstName === firstName
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
                            ? { ...incident, date: incidentDate, behavior: incidentBehavior, severity: incidentSeverity }
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
    };

    const downloadCsv = () => {
        const header = ["Name", "Date", "Behavior", "Severity"];
        const rows = filteredData.flatMap(user =>
            user.incidents.map(incident => [
                user.name, 
                incident.date, 
                incident.behavior,
                incident.severity.toUpperCase()
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

    const getSeverityColor = (severity: string) => {
        switch(severity) {
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
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold font-serif text-black tracking-wide">
                            Incident Reports
                        </h1>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="bg-[#8B5E83] text-white px-4 py-2 rounded hover:bg-[#6e4765] transition-colors"
                            >
                                Add Report
                            </button>
                            <button
                                onClick={() => setIsExportModalOpen(true)}
                                className="bg-[#58b2ed] text-white px-4 py-2 rounded hover:bg-[#3a8ec9] transition-colors"
                            >
                                Export
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="p-4 bg-gradient-to-r from-[#8B5E83] to-gray-200">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                <p className="font-semibold text-white text-lg">Incident Reports</p>
                                <input
                                    type="text"
                                    placeholder="Search by name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5E83] focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
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
                                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83]"
                                                    placeholder="Enter last name"
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
                                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83]"
                                                    placeholder="Enter first name"
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
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83]"
                                                placeholder="Enter middle name"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Date *
                                            </label>
                                            <input
                                                type="date"
                                                value={incidentDate}
                                                onChange={(e) => setIncidentDate(e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83]"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Severity *
                                            </label>
                                            <select
                                                value={incidentSeverity}
                                                onChange={(e) => setIncidentSeverity(e.target.value as any)}
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83]"
                                            >
                                                <option value="minor">Minor</option>
                                                <option value="moderate">Moderate</option>
                                                <option value="severe">Severe</option>
                                            </select>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Behavior Description *
                                            </label>
                                            <textarea
                                                value={incidentBehavior}
                                                onChange={(e) => setIncidentBehavior(e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83]"
                                                rows={4}
                                                placeholder="Describe the incident in detail..."
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                                    <button
                                        onClick={() => {
                                            setIsAddModalOpen(false);
                                            resetForm();
                                        }}
                                        className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAddReport}
                                        className="rounded-lg bg-[#8B5E83] px-4 py-2 text-white hover:bg-[#6e4765] transition-colors"
                                    >
                                        Add Report
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {isEditModalOpen && selectedIncident && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 bg-black/60 backdrop-blur-sm transition-opacity">
                            <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl">
                                <div className="bg-[#ff7800] text-white p-6 rounded-t-2xl">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-2xl font-semibold">Edit Incident Report</h2>
                                            <p className="text-sm text-white/90 mt-1">Update incident details for {selectedUser?.name}</p>
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
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Date *
                                            </label>
                                            <input
                                                type="date"
                                                value={incidentDate}
                                                onChange={(e) => setIncidentDate(e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff7800]"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Severity *
                                            </label>
                                            <select
                                                value={incidentSeverity}
                                                onChange={(e) => setIncidentSeverity(e.target.value as any)}
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff7800]"
                                            >
                                                <option value="minor">Minor</option>
                                                <option value="moderate">Moderate</option>
                                                <option value="severe">Severe</option>
                                            </select>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Behavior Description *
                                            </label>
                                            <textarea
                                                value={incidentBehavior}
                                                onChange={(e) => setIncidentBehavior(e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff7800]"
                                                rows={4}
                                                placeholder="Describe the incident in detail..."
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                                    <button
                                        onClick={() => {
                                            setIsEditModalOpen(false);
                                            resetForm();
                                        }}
                                        className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleEditIncident}
                                        className="rounded-lg bg-[#ff7800] px-4 py-2 text-white hover:bg-[#e06600] transition-colors"
                                    >
                                        Update Incident
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Delete Incident Modal */}
                    {isDeleteModalOpen && selectedIncident && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 bg-black/60 backdrop-blur-sm transition-opacity">
                            <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
                                <div className="bg-red-600 text-white p-6 rounded-t-2xl">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-2xl font-semibold">Delete Incident Report</h2>
                                            <p className="text-sm text-white/90 mt-1">This action cannot be undone</p>
                                        </div>
                                        <button
                                            onClick={() => setIsDeleteModalOpen(false)}
                                            className="text-white/80 hover:text-white transition-colors"
                                        >
                                            <FaWindowClose className="text-2xl" />
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="p-6">
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                        <p className="text-gray-800 font-medium">You are about to delete this incident:</p>
                                        <div className="mt-3 space-y-2">
                                            <p className="text-sm text-gray-600">
                                                <span className="font-semibold">Student:</span> {selectedUser?.name}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-semibold">Date:</span> {selectedIncident.date}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-semibold">Behavior:</span> {selectedIncident.behavior}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-semibold">Severity:</span> 
                                                <span className={`ml-2 px-2 py-0.5 rounded text-xs ${getSeverityColor(selectedIncident.severity)}`}>
                                                    {selectedIncident.severity.toUpperCase()}
                                                </span>
                                            </p>
                                        </div>
                                        <p className="text-red-600 text-sm mt-3">⚠️ This action cannot be undone.</p>
                                    </div>
                                </div>
                                
                                <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                                    <button
                                        onClick={() => setIsDeleteModalOpen(false)}
                                        className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDeleteIncident}
                                        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition-colors"
                                    >
                                        Delete Incident
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {isExportModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 bg-black/60 backdrop-blur-sm transition-opacity">
                            <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
                                <div className="bg-[#58b2ed] text-white p-6 rounded-t-2xl">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-2xl font-semibold">Export Reports</h2>
                                            <p className="text-sm text-white/90 mt-1">Export incident data to CSV</p>
                                        </div>
                                        <button
                                            onClick={() => setIsExportModalOpen(false)}
                                            className="text-white/80 hover:text-white transition-colors"
                                        >
                                            <FaWindowClose className="text-2xl" />
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="p-6">
                                    <div className="space-y-4">
                                        <p className="text-gray-700">
                                            This will export <span className="font-semibold">{filteredData.length}</span> student record{filteredData.length !== 1 ? 's' : ''} and their incidents.
                                        </p>
                                        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4">
                                            <p className="text-sm font-medium text-gray-700 mb-2">The exported file includes:</p>
                                            <ul className="text-sm text-gray-600 space-y-1">
                                                <li>• Student Name</li>
                                                <li>• Incident Date</li>
                                                <li>• Behavior Description</li>
                                                <li>• Severity Level</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                                    <button
                                        onClick={() => setIsExportModalOpen(false)}
                                        className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={downloadCsv}
                                        className="rounded-lg bg-[#58b2ed] px-4 py-2 text-white hover:bg-[#3a8ec9] transition-colors"
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