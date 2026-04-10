import { useState } from 'react';
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { 
    FaTrashAlt,
    FaPencilAlt
} from 'react-icons/fa'

export default function UserManagement() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-1 p-10 bg-gray-50">
                    <h1 className="text-3xl font-bold font-serif text-black tracking-wide mb-8">
                        Manage Users
                    </h1>
                    <div className="absolute right-10 mb-6 top-30">
                        <button onClick={() => setIsAddModalOpen(true) } className="bg-[#587a33] text-white px-4 py-2 rounded mb-6 hover:bg-[#D6B0B1] transition-colors">
                            Add User
                        </button>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <table className="w-full table-auto border-collapse  text-white rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-[#8B5E83] text-white text-sm">
                                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Name</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Email</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Role</th>
                                    <th className="border border-gray-300 px-4 py-2 text-right font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { name: "Dela Cruz, Juan", email: "delacruz.juan@wis.com", role: "Admin" },
                                    { name: "Dela Cruz, Maria", email: "delacruz.maria@wis.com", role: "Counselor" },
                                    { name: "Dela Cruz, Jose", email: "delacruz.jose@wis.com", role: "Teacher" }
                                ].map((user, index) => (
                                    <tr key={index} className="border-b border-gray-300">
                                        <td className="text-black border border-gray-300 px-4 py-2">{user.name}</td>
                                        <td className="text-black border border-gray-300 px-4 py-2">{user.email}</td>
                                        <td className="text-black border border-gray-300 px-4 py-2">{user.role}</td>
                                        <td className="text-blackborder border-gray-300 px-4 py-2 text-right">
                                            <button className="bg-[#ff7800] text-white px-3 py-1 rounded text-sm hover:bg-gray-300 transition-colors">
                                                <FaPencilAlt />
                                            </button>
                                            <button className="bg-[#ff4d4d] text-white px-3 py-1 rounded text-sm hover:bg-gray-300 transition-colors ml-2">
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            {isAddModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                            <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-2xl font-semibold">Add PBIS User</h2>
                                        <p className="text-sm text-gray-600">Add a new user to the PBIS system.</p>
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
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83]"
                                            placeholder="Enter last name"
                                        />
                                    </label>
                                    <label className="block">
                                        <span className="text-sm font-medium text-gray-700">First Name</span>
                                        <input
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83]"
                                            placeholder="Enter first name"
                                        />
                                    </label>
                                    <label className="block">
                                        <span className="text-sm font-medium text-gray-700">Middle Name</span>
                                        <input
                                            type="text"
                                            value={middleName}
                                            onChange={(e) => setMiddleName(e.target.value)}
                                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83]"
                                            placeholder="Enter middle name"
                                        />
                                    </label>
                                    <label className="block">
                                        <span className="text-sm font-medium text-gray-700">Email</span>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83]"
                                            placeholder="Enter email"
                                        />
                                    </label>
                                    <label className="block">
                                        <span className="text-sm font-medium text-gray-700">Password</span>
                                        <input
                                            type="password"                                       
                                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83]"
                                            placeholder="Enter password"
                                        />
                                    </label>
                                    <label className="block">
                                        <span className="text-sm font-medium text-gray-700">Role</span>
                                        <select
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83]"
                                        >
                                            <option value="">Select a role</option>
                                            <option value="admin">Admin</option>
                                            <option value="user">Teacher</option>
                                            <option value="counselor">Counselor</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                    <button className="rounded bg-[#587a33] px-4 py-2 text-white hover:bg-[#6e4765]">
                                        Add User
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                    }
        </div>
    )
}