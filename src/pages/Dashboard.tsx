import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Dashboard() {
    return (
        <div className="flex min-h-screen">      
            <Sidebar />
            
            <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-1 p-10 bg-gray-50">                            
                    <h1 className="text-3xl font-bold font-serif text-black tracking-wide">
                        Dashboard
                    </h1>


                </main>
            </div>
        </div>
    );
}