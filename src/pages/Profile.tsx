import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

export default function Profile() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-1 p-10 bg-gray-50">
                    <h1 className="text-3xl font-bold font-serif text-black tracking-wide mb-8">
                        Profile
                    </h1>

                    <div className="bg-white rounded-lg shadow p-6 max-w-md">
                        <div className="flex items-center mb-6">
                            <img src="/profile-placeholder.png" alt="Profile" className="h-16 w-16 rounded-full mr-4" />
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">Dela Cruz, Juan</h2>
                                <p className="text-gray-600">delacruz.juan@wis.com</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 mt-6 max-w-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Settings</h2>
                        <p className="text-gray-600 mb-2">Role: Admin</p> 
                        <input type="old password"
                        placeholder="Current Password"
                        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#8B5E83]" 
                        />
                        <input 
                        type="new password" 
                        placeholder="New Password" 
                        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#8B5E83]" 
                        />
                        <button className="bg-[#587a33] text-white px-4 py-2 rounded hover:bg-[#D6B0B1] transition-colors">
                            Save Password
                        </button>                   
                    </div>
                </main>
            </div>
        </div>
    )
}