import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Westfields from "../assets/Westfields.png";

export default function LoginPage() {
    const navigate = useNavigate();
    const [error, setError] = useState<string>("");
    const [clickCount, setClickCount] = useState(0);

    const validateForm = (email: string, password: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return false;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return false;
        }
        setError("");
        return true;
    };

    const handleClick = () => {
    setClickCount((prev) => prev + 1);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const emailInput = (document.getElementById("email") as HTMLInputElement).value;
        const passwordInput = (document.getElementById("password") as HTMLInputElement).value;

        if (validateForm(emailInput, passwordInput)) {
            navigate("/Dashboard");
        } 
    };

    return (
        <div className="min-h-screen flex flex-col duration-300 transition-all bg-linear-to-r from-[#4D2B8C] to-[#85409D] items-center justify-center">

            <div 
            onClick={handleClick} 
            className="relative w-full py-4 overflow-hidden bg-[#4D2B8C] border-b border-white/20 cursor-pointer select-none"
            >
            <div className="flex w-max animate-loop-scroll items-center gap-12 px-6">
                {[...Array(10)].map((_,i) => (
                <div key={i} className="flex items-center gap-12">
                    <span className="text-white font-bold whitespace-nowrap uppercase tracking-widest">
                    WESTFIELDS INTERNATIONAL SCHOOL
                    </span>
                    <span className="text-white/20">★</span>
                </div>
                ))}
            </div>

            {clickCount >= 5 &&   (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-700">
                <h2 className="text-white font-black text-1xl tracking-tighter mix-blend-overlay opacity-80">
                    Jarshane
                </h2>
                </div>
            )}
            </div>

            <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                    <div className="flex flex-col items-center mb-6">
                            <Link to="https://westfields.edu.ph/">
                                <img src={Westfields} alt="Logo" className="h-16 mb-4" />
                            </Link>
                        <h2 className="text-1xl font-bold text-[#4D2B8C] text-justify">Positive Behavioral Interventions and Supports</h2>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5E83] focus:border-transparent"
                                placeholder="@westfields.edu.ph"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5E83] focus:border-transparent"
                                placeholder="password"
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-[#4D2B8C] focus:ring-[#8B5E83] border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-700">Remember me</span>
                            </label>

                            <Link to="#" 
                                className="text-sm text-[#4D2B8C] hover:text-[#8B5E83] transition-colors">
                                Forgot password?
                            </Link>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-[#4D2B8C] text-white font-semibold rounded-lg hover:bg-[#8B5E83]"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>

        
    );
}