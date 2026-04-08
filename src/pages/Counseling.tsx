import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Counseling(){
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-1 p-10 bg-gray-50">
                    <h1 className="text-3xl font-bold font-serif text-black tracking-wide mb-8">
                        Counseling
                    </h1>
                </main>
            </div>
        </div>
    )
}