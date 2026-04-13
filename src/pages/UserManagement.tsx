import { useState } from 'react';
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { 
    FaTrashAlt,
    FaPencilAlt,
    FaWindowClose,
    FaExclamationTriangle
} from 'react-icons/fa'

type User = {
    id: number;
    lastName: string;
    firstName: string;
    middleName: string;
    name: string;
    email: string;
    role: string;
};

export default function UserManagement() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const [users, setUsers] = useState([
        { id: 1, lastName: "Dela Cruz", firstName: "Juan", middleName: "Santos", name: "Dela Cruz, Juan", email: "delacruz.juan@wis.com", role: "Admin" },
        { id: 2, lastName: "Dela Cruz", firstName: "Maria", middleName: "Reyes", name: "Dela Cruz, Maria", email: "delacruz.maria@wis.com", role: "Counselor" },
        { id: 3, lastName: "Dela Cruz", firstName: "Jose", middleName: "Garcia", name: "Dela Cruz, Jose", email: "delacruz.jose@wis.com", role: "Teacher" }
    ]);

    const handleAddUser = () => {
        const newUser = {
            id: users.length + 1,
            lastName,
            firstName,
            middleName,
            name: `${lastName}, ${firstName}`,
            email,
            role: role.charAt(0).toUpperCase() + role.slice(1),
        };
        setUsers([...users, newUser]);
        resetForm();
        setIsAddModalOpen(false);
    };

    const handleEditUser = () => {
        if (!selectedUser) return;

        const updatedUsers = users.map(user => 
            user.id === selectedUser.id 
                ? { 
                    ...user, 
                    lastName,
                    firstName,
                    middleName,
                    name: `${lastName}, ${firstName}`,
                    email,
                    role: role.charAt(0).toUpperCase() + role.slice(1)
                  }
                : user
        );
        setUsers(updatedUsers);
        resetForm();
        setIsEditModalOpen(false);
        setSelectedUser(null);
    };

    const handleDeleteUser = () => {
        if (!selectedUser) return;

        const filteredUsers = users.filter(user => user.id !== selectedUser.id);
        setUsers(filteredUsers);
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
    };

    const openEditModal = (user: User) => {
        setSelectedUser(user);
        setLastName(user.lastName);
        setFirstName(user.firstName);
        setMiddleName(user.middleName || '');
        setEmail(user.email);
        setRole(user.role.toLowerCase());
        setPassword('');
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (user: User) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const resetForm = () => {
        setLastName('');
        setFirstName('');
        setMiddleName('');
        setEmail('');
        setPassword('');
        setRole('');
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-1 p-10 bg-gray-50">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold font-serif text-black tracking-wide">
                            Manage Users
                        </h1>
                        <button 
                            onClick={() => setIsAddModalOpen(true)} 
                            className="bg-[#587a33] text-white px-4 py-2 rounded hover:bg-[#456128] transition-colors"
                        >
                            Add User
                        </button>
                    </div>

                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto border-collapse">
                                <thead>
                                    <tr className="bg-[#8B5E83] text-white text-sm">
                                        <th className="px-4 py-3 text-left font-semibold">Name</th>
                                        <th className="px-4 py-3 text-left font-semibold">Email</th>
                                        <th className="px-4 py-3 text-left font-semibold">Role</th>
                                        <th className="px-4 py-3 text-right font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                                            <td className="text-black px-4 py-3">{user.name}</td>
                                            <td className="text-black px-4 py-3">{user.email}</td>
                                            <td className="text-black px-4 py-3">
                                                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                                    user.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                                                    user.role === 'Counselor' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-green-100 text-green-800'
                                                }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button 
                                                    onClick={() => openEditModal(user)}
                                                    className="bg-[#ff7800] text-white px-3 py-1.5 rounded text-sm hover:bg-[#e06600] transition-colors"
                                                >
                                                    <FaPencilAlt />
                                                </button>
                                                <button 
                                                    onClick={() => openDeleteModal(user)}
                                                    className="bg-[#ff4d4d] text-white px-3 py-1.5 rounded text-sm hover:bg-[#e60000] transition-colors ml-2"
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>

            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-xl">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800">Add PBIS User</h2>
                                <p className="text-sm text-gray-600 mt-1">Add a new user to the PBIS system.</p>
                            </div>
                            <button
                                onClick={() => {
                                    setIsAddModalOpen(false);
                                    resetForm();
                                }}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <FaWindowClose className="text-2xl" />
                            </button>
                        </div>
                        
                        <div className="p-6">
                            <div className="grid gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83] focus:border-transparent"
                                        placeholder="Enter last name"
                                        required
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
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83] focus:border-transparent"
                                        placeholder="Enter first name"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Middle Name
                                    </label>
                                    <input
                                        type="text"
                                        value={middleName}
                                        onChange={(e) => setMiddleName(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83] focus:border-transparent"
                                        placeholder="Enter middle name"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83] focus:border-transparent"
                                        placeholder="Enter email"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Password *
                                    </label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83] focus:border-transparent"
                                        placeholder="Enter password"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Role *
                                    </label>
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83] focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select a role</option>
                                        <option value="admin">Admin</option>
                                        <option value="teacher">Teacher</option>
                                        <option value="counselor">Counselor</option>
                                    </select>
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
                                onClick={handleAddUser}
                                disabled={!lastName || !firstName || !email || !password || !role}
                                className="rounded-lg bg-[#587a33] px-4 py-2 text-white hover:bg-[#456128] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Add User
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isEditModalOpen && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-xl">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800">Edit User</h2>
                                <p className="text-sm text-gray-600 mt-1">Update user information.</p>
                            </div>
                            <button
                                onClick={() => {
                                    setIsEditModalOpen(false);
                                    resetForm();
                                    setSelectedUser(null);
                                }}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <FaWindowClose className="text-2xl" />
                            </button>
                        </div>
                        
                        <div className="p-6">
                            <div className="grid gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83] focus:border-transparent"
                                        placeholder="Enter last name"
                                        required
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
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83] focus:border-transparent"
                                        placeholder="Enter first name"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Middle Name
                                    </label>
                                    <input
                                        type="text"
                                        value={middleName}
                                        onChange={(e) => setMiddleName(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83] focus:border-transparent"
                                        placeholder="Enter middle name"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83] focus:border-transparent"
                                        placeholder="Enter email"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Password (leave blank to keep current)
                                    </label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83] focus:border-transparent"
                                        placeholder="Enter new password"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Role *
                                    </label>
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83] focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select a role</option>
                                        <option value="admin">Admin</option>
                                        <option value="teacher">Teacher</option>
                                        <option value="counselor">Counselor</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                            <button
                                onClick={() => {
                                    setIsEditModalOpen(false);
                                    resetForm();
                                    setSelectedUser(null);
                                }}
                                className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleEditUser}
                                disabled={!lastName || !firstName || !email || !role}
                                className="rounded-lg bg-[#587a33] px-4 py-2 text-white hover:bg-[#456128] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Update User
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800">Delete User</h2>
                                <p className="text-sm text-gray-600 mt-1">Are you sure you want to delete this user?</p>
                            </div>
                            <button
                                onClick={() => {
                                    setIsDeleteModalOpen(false);
                                    setSelectedUser(null);
                                }}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <FaWindowClose className="text-2xl" />
                            </button>
                        </div>
                        
                        <div className="p-6">
                            <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
                                <FaExclamationTriangle className="text-red-500 text-2xl flex-shrink-0" />
                                <div>
                                    <p className="text-gray-800 font-medium">You are about to delete:</p>
                                    <p className="text-gray-600 mt-1">
                                        <span className="font-semibold">{selectedUser.name}</span><br />
                                        <span className="text-sm">{selectedUser.email}</span>
                                    </p>
                                    <p className="text-red-600 text-sm mt-2">This action cannot be undone.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                            <button
                                onClick={() => {
                                    setIsDeleteModalOpen(false);
                                    setSelectedUser(null);
                                }}
                                className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleDeleteUser}
                                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition-colors"
                            >
                                Delete User
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}