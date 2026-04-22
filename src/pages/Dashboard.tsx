import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import IncidentAnalytics from "../components/IncidentAnalytics";

export default function Dashboard() {
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
                                Dashboard
                            </h1>
                            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mt-1">
                                Overview & Analytics
                            </p>
                            </div>
                            
                        </div>
                    </div>

                    <IncidentAnalytics />

                    <div className="mt-10 p-6 bg-white rounded-lg shadow-md">
                        <div>
                            <h2>Activity Logs</h2>
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-600 text-sm">No recent activity.</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}