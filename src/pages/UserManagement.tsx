import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { 
    FaTrashAlt,
    FaPencilAlt
} from 'react-icons/fa'


export default function UserManagement() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-1 p-10 bg-gray-50">
                    <h1 className="text-3xl font-bold font-serif text-black tracking-wide mb-8">
                        User Management
                    </h1>
                    
                    <button className="bg-[#587a33] text-white px-4 py-2 rounded mb-6 hover:bg-[#D6B0B1] transition-colors">
                        Add User
                    </button>
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
        </div>
    )
}