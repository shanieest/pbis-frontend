import { useState, useEffect } from 'react';
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import IncidentAnalytics from "../components/IncidentAnalytics";

export default function Dashboard() {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setDateTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex min-h-screen font-sans">
        <Sidebar />
        <div className="flex flex-col flex-1">
            <Header />
            
            <main className="flex-1 p-10 bg-slate-50">
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

                <div className="text-left md:text-right mt-4 md:mt-0">
                    <div className="text-2xl font-black text-slate-900 tabular-nums">
                    {dateTime.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    {dateTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })}
                    </div>
                </div>
                </div>
            </div>

            <IncidentAnalytics />

            <div className="mt-10 p-8 bg-white border-4 border-slate-900">
                <div className="border-b-2 border-slate-100 pb-2 mb-6">
                <h2 className="text-xl font-black uppercase tracking-tight text-slate-800">
                    Activity Logs
                </h2>
                </div>
                <div className="mt-4">
                <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">
                    No recent activity recorded.
                </p>
                </div>
            </div>
            </main>
        </div>
        </div>
    );
}
