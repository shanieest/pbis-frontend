import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Fragment, useState } from "react";
import { FaChevronDown, FaChevronUp, FaWindowClose, FaEdit, FaExternalLinkAlt, FaCheckCircle } from "react-icons/fa";

interface Incident {
    date: string;
    behavior: string;
    id?: number;
}

interface UserIncident {
    id: number;
    name: string;
    lastName: string;
    firstName: string;
    middleName: string;
    incidents: Incident[];
    caseStatus: "active" | "referred" | "closed";
    referralNotes?: string;
    closureNotes?: string;
}

const sampleData: UserIncident[] = [
    {
        id: 1,
        name: "Dela Cruz, Juan",
        lastName: "Dela Cruz",
        firstName: "Juan",
        middleName: "Santos",
        caseStatus: "active",
        incidents: [
            { id: 1, date: "2023-10-01", behavior: "Minor incident - disruptive behavior" },
            { id: 2, date: "2023-10-05", behavior: "Another incident - inappropriate language" }
        ]
    },
    {
        id: 2,
        name: "Dela Cruz, Maria",
        lastName: "Dela Cruz",
        firstName: "Maria",
        middleName: "Reyes",
        caseStatus: "active",
        incidents: [
            { id: 3, date: "2023-08-20", behavior: "Safety concern - bullying reported" },
            { id: 4, date: "2023-09-10", behavior: "Follow-up counseling session" },
            { id: 5, date: "2023-10-02", behavior: "Resolution - behavior improvement noted" }
        ]
    },
    {
        id: 3,
        name: "Reyes, Jose",
        lastName: "Reyes",
        firstName: "Jose",
        middleName: "Garcia",
        caseStatus: "active",
        incidents: [
            { id: 6, date: "2023-09-15", behavior: "Report filed - academic concerns" }
        ]
    }
];

export default function Counseling() {
    const [data, setData] = useState<UserIncident[]>(sampleData);
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
    const [selectedUser, setSelectedUser] = useState<UserIncident | null>(null);
    
    // Modal states
    const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
    const [isReferModalOpen, setIsReferModalOpen] = useState(false);
    const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
    
    // Form states
    const [modifyNotes, setModifyNotes] = useState("");
    const [referralReason, setReferralReason] = useState("");
    const [referralDestination, setReferralDestination] = useState("");
    const [closureReason, setClosureReason] = useState("");
    const [closureOutcome, setClosureOutcome] = useState("");

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

    const handleModify = () => {
        if (!selectedUser) return;
        
        // Add modification note as a new incident
        const newIncident: Incident = {
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            behavior: `Modification: ${modifyNotes}`
        };
        
        setData(prev => prev.map(user =>
            user.id === selectedUser.id
                ? { ...user, incidents: [...user.incidents, newIncident] }
                : user
        ));
        
        setModifyNotes("");
        setIsModifyModalOpen(false);
        setSelectedUser(null);
    };

    const handleReferOut = () => {
        if (!selectedUser) return;
        
        // Add referral note as an incident
        const newIncident: Incident = {
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            behavior: `REFERRED OUT: ${referralReason} - Referred to: ${referralDestination}`
        };
        
        setData(prev => prev.map(user =>
            user.id === selectedUser.id
                ? { 
                    ...user, 
                    caseStatus: "referred",
                    referralNotes: referralReason,
                    incidents: [...user.incidents, newIncident]
                  }
                : user
        ));
        
        setReferralReason("");
        setReferralDestination("");
        setIsReferModalOpen(false);
        setSelectedUser(null);
    };

    const handleCaseClosed = () => {
        if (!selectedUser) return;
        
        // Add closure note as an incident
        const newIncident: Incident = {
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            behavior: `CASE CLOSED: ${closureReason} - Outcome: ${closureOutcome}`
        };
        
        setData(prev => prev.map(user =>
            user.id === selectedUser.id
                ? { 
                    ...user, 
                    caseStatus: "closed",
                    closureNotes: closureReason,
                    incidents: [...user.incidents, newIncident]
                  }
                : user
        ));
        
        setClosureReason("");
        setClosureOutcome("");
        setIsCloseModalOpen(false);
        setSelectedUser(null);
    };

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'referred': return 'bg-yellow-100 text-yellow-800';
            case 'closed': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: string) => {
        switch(status) {
            case 'active': return 'Active';
            case 'referred': return 'Referred Out';
            case 'closed': return 'Case Closed';
            default: return status;
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
                            Counseling Management
                        </h1>
                    </div>

                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="bg-[#8B5E83] p-4">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                <p className="font-semibold text-white text-lg">Counseling Cases</p>
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
                                                <td className="border-b border-gray-200 p-4">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <span className="font-semibold text-gray-800">{user.name}</span>
                                                            <span className={`ml-3 px-2 py-1 rounded text-xs font-semibold ${getStatusColor(user.caseStatus)}`}>
                                                                {getStatusText(user.caseStatus)}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm text-gray-500">
                                                                {user.incidents.length} incident{user.incidents.length !== 1 ? 's' : ''}
                                                            </span>
                                                            {expandedRows.has(user.id) ? 
                                                                <FaChevronUp className="text-gray-600" /> : 
                                                                <FaChevronDown className="text-gray-600" />
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                            {expandedRows.has(user.id) && (
                                                <tr>
                                                    <td className="border-b border-gray-200 bg-gray-50 p-0">
                                                        <div className="p-6">
                                                            {/* Incidents Table */}
                                                            <div className="mb-6">
                                                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Incident History</h3>
                                                                <table className="w-full border-collapse">
                                                                    <thead>
                                                                        <tr className="bg-gray-200">
                                                                            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Date</th>
                                                                            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Behavior/Notes</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {user.incidents.map((incident, i) => (
                                                                            <tr key={incident.id || i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                                                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{incident.date}</td>
                                                                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{incident.behavior}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            
                                                            {/* Action Buttons */}
                                                            <div className="flex gap-3 justify-end flex-wrap">
                                                                <button
                                                                    onClick={() => {
                                                                        setSelectedUser(user);
                                                                        setIsModifyModalOpen(true);
                                                                    }}
                                                                    className="bg-[#ff7800] text-white px-4 py-2 rounded-lg hover:bg-[#e06600] transition-colors text-sm font-medium flex items-center gap-2"
                                                                >
                                                                    <FaEdit /> Modify
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        setSelectedUser(user);
                                                                        setIsReferModalOpen(true);
                                                                    }}
                                                                    disabled={user.caseStatus === "closed"}
                                                                    className="bg-[#ff3131] text-white px-4 py-2 rounded-lg hover:bg-[#cc0000] transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                >
                                                                    <FaExternalLinkAlt /> Refer Out
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        setSelectedUser(user);
                                                                        setIsCloseModalOpen(true);
                                                                    }}
                                                                    disabled={user.caseStatus !== "active"}
                                                                    className="bg-[#587a33] text-white px-4 py-2 rounded-lg hover:bg-[#456128] transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                >
                                                                    <FaCheckCircle /> Case Closed
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Modify Modal */}
                    {isModifyModalOpen && selectedUser && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                            <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
                                <div className="bg-[#ff7800] text-white p-6 rounded-t-2xl">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-2xl font-semibold">Modify Case</h2>
                                            <p className="text-sm text-white/90 mt-1">Add modification notes for {selectedUser.name}</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setIsModifyModalOpen(false);
                                                setSelectedUser(null);
                                                setModifyNotes("");
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
                                                Modification Notes *
                                            </label>
                                            <textarea
                                                value={modifyNotes}
                                                onChange={(e) => setModifyNotes(e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff7800]"
                                                rows={5}
                                                placeholder="Describe the modifications or interventions being made..."
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                                    <button
                                        onClick={() => {
                                            setIsModifyModalOpen(false);
                                            setSelectedUser(null);
                                            setModifyNotes("");
                                        }}
                                        className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleModify}
                                        disabled={!modifyNotes.trim()}
                                        className="rounded-lg bg-[#ff7800] px-4 py-2 text-white hover:bg-[#e06600] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Save Modification
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Refer Out Modal */}
                    {isReferModalOpen && selectedUser && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                            <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
                                <div className="bg-[#ff3131] text-white p-6 rounded-t-2xl">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-2xl font-semibold">Refer Out</h2>
                                            <p className="text-sm text-white/90 mt-1">Refer {selectedUser.name} to external services</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setIsReferModalOpen(false);
                                                setSelectedUser(null);
                                                setReferralReason("");
                                                setReferralDestination("");
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
                                                Referral Destination *
                                            </label>
                                            <select
                                                value={referralDestination}
                                                onChange={(e) => setReferralDestination(e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff3131]"
                                            >
                                                <option value="">Select destination</option>
                                                <option value="School Psychologist">School Psychologist</option>
                                                <option value="External Therapist">External Therapist</option>
                                                <option value="Social Services">Social Services</option>
                                                <option value="Medical Professional">Medical Professional</option>
                                                <option value="Special Education">Special Education</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Referral Reason *
                                            </label>
                                            <textarea
                                                value={referralReason}
                                                onChange={(e) => setReferralReason(e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff3131]"
                                                rows={4}
                                                placeholder="Explain why this student needs to be referred out..."
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                                    <button
                                        onClick={() => {
                                            setIsReferModalOpen(false);
                                            setSelectedUser(null);
                                            setReferralReason("");
                                            setReferralDestination("");
                                        }}
                                        className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleReferOut}
                                        disabled={!referralReason.trim() || !referralDestination}
                                        className="rounded-lg bg-[#ff3131] px-4 py-2 text-white hover:bg-[#cc0000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Confirm Referral
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Case Closed Modal */}
                    {isCloseModalOpen && selectedUser && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                            <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
                                <div className="bg-[#587a33] text-white p-6 rounded-t-2xl">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-2xl font-semibold">Close Case</h2>
                                            <p className="text-sm text-white/90 mt-1">Close counseling case for {selectedUser.name}</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setIsCloseModalOpen(false);
                                                setSelectedUser(null);
                                                setClosureReason("");
                                                setClosureOutcome("");
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
                                                Closure Reason *
                                            </label>
                                            <select
                                                value={closureReason}
                                                onChange={(e) => setClosureReason(e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#587a33]"
                                            >
                                                <option value="">Select reason</option>
                                                <option value="Goals Achieved">Goals Achieved</option>
                                                <option value="Improved Behavior">Improved Behavior</option>
                                                <option value="Transferred School">Transferred School</option>
                                                <option value="Parent Request">Parent Request</option>
                                                <option value="No Further Need">No Further Need</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Outcome Summary *
                                            </label>
                                            <textarea
                                                value={closureOutcome}
                                                onChange={(e) => setClosureOutcome(e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#587a33]"
                                                rows={4}
                                                placeholder="Summarize the outcomes and progress made..."
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                                    <button
                                        onClick={() => {
                                            setIsCloseModalOpen(false);
                                            setSelectedUser(null);
                                            setClosureReason("");
                                            setClosureOutcome("");
                                        }}
                                        className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleCaseClosed}
                                        disabled={!closureReason || !closureOutcome.trim()}
                                        className="rounded-lg bg-[#587a33] px-4 py-2 text-white hover:bg-[#456128] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Close Case
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