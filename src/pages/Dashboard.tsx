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
                    <h1 className="text-3xl font-bold font-serif text-black tracking-wide mb-8">
                        Dashboard
                    </h1>
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