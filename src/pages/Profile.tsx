import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { FaUserEdit, FaSave, FaLock, FaEnvelope, FaUserTag} from "react-icons/fa";

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
 
    // User profile state
    const [profile, setProfile] = useState({
        firstName: "Juan",
        lastName: "Dela Cruz",
        email: "delacruz.juan@wis.com",
        role: "Admin",
    });
    
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [editForm, setEditForm] = useState({ ...profile });

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveProfile = () => {
        setProfile({ ...editForm });
        setIsEditing(false);

    };


    const handleCancelEdit = () => {
        setEditForm({ ...profile });
        setIsEditing(false);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-1 p-10">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-bold font-serif text-gray-800 tracking-wide mb-8">
                            My Profile
                        </h1>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                            <div className="bg-gradient-to-r from-[#8B5E83] to-[#6e4765] px-6 py-4 flex justify-between items-center">
                                <h2 className="text-xl font-semibold text-white">Profile Information</h2>
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        <FaUserEdit /> Edit Profile
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleCancelEdit}
                                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSaveProfile}
                                            className="bg-[#587a33] hover:bg-[#456128] text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                                        >
                                            <FaSave /> Save Changes
                                        </button>
                                    </div>
                                )}
                            </div>
                            
                            <div className="p-6">
                                <div className="flex items-center mb-8 pb-6 border-b border-gray-200">
                                    <div className="ml-6">
                                        <h3 className="text-2xl font-bold text-gray-800">{profile.firstName} {profile.lastName}</h3>
                                        <p className="text-gray-600 flex items-center gap-2 mt-1">
                                            <FaEnvelope className="text-[#8B5E83]" /> {profile.email}
                                        </p>
                                        <div className="flex gap-2 mt-2">
                                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-semibold flex items-center gap-1">
                                                <FaUserTag size={10} /> {profile.role}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            First Name
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={editForm.firstName}
                                                onChange={handleEditChange}
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83]"
                                            />
                                        ) : (
                                            <p className="text-gray-900 py-2">{profile.firstName}</p>
                                        )}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Last Name
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={editForm.lastName}
                                                onChange={handleEditChange}
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83]"
                                            />
                                        ) : (
                                            <p className="text-gray-900 py-2">{profile.lastName}</p>
                                        )}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={editForm.email}
                                                onChange={handleEditChange}
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83]"
                                            />
                                        ) : (
                                            <p className="text-gray-900 py-2">{profile.email}</p>
                                        )}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Role
                                        </label>
                                        {isEditing ? (
                                            <select
                                                name="role"
                                                value={editForm.role}
                                                onChange={handleEditChange}
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5E83]"
                                            >
                                                <option value="Admin">Admin</option>
                                                <option value="Counselor">Counselor</option>
                                                <option value="Teacher">Teacher</option>
                                            </select>
                                        ) : (
                                            <p className="text-gray-900 py-2">{profile.role}</p>
                                        )}
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-[#587a33] to-[#456128] px-6 py-4">
                                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                    <FaLock /> Change Password
                                </h2>
                            </div>
                            
                            <div className="p-6">
                                <div className="max-w-md">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Current Password
                                        </label>
                                        <input
                                            type="password"
                                            name="currentPassword"
                                            value={passwordData.currentPassword}
                                            onChange={handlePasswordChange}
                                            placeholder="Enter your current password"
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#587a33]"
                                        />
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={passwordData.newPassword}
                                            onChange={handlePasswordChange}
                                            placeholder="Enter new password"
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#587a33]"
                                        />
                                    </div>
                                    
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Confirm New Password
                                        </label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={passwordData.confirmPassword}
                                            onChange={handlePasswordChange}
                                            placeholder="Confirm your new password"
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#587a33]"
                                        />
                                    </div>
                                    
                                    <button
                                        className="bg-[#587a33] text-white px-6 py-2 rounded-lg hover:bg-[#456128] transition-colors flex items-center gap-2"
                                    >
                                        <FaLock /> Update Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

        </div>
    );
}
