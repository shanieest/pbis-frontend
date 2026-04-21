import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Westfields from "../assets/Westfields.png";

export default function LoginPage() {
    const navigate = useNavigate();
    const [error, setError] = useState<string>("");

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

   <div className="w-full py-4 overflow-hidden bg-white/10 backdrop-blur-sm border-b border-white/20">
                <div className="flex w-[200%]">
                    <div className="flex animate-loop-scroll space-x-12 items-center px-6">
                        <span className="text-white font-bold whitespace-nowrap">WESTFIELDS INTERNATIONAL SCHOOL</span>
                        <span className="text-white/70 whitespace-nowrap">★</span>
                        <span className="text-white font-bold whitespace-nowrap">WESTFIELDS INTERNATIONAL SCHOOL</span>
                        <span className="text-white/70 whitespace-nowrap">★</span>                        
                        <span className="text-white font-bold whitespace-nowrap">WESTFIELDS INTERNATIONAL SCHOOL</span>
                        <span className="text-white/70 whitespace-nowrap">★</span>                        
                        <span className="text-white font-bold whitespace-nowrap">WESTFIELDS INTERNATIONAL SCHOOL</span>
                        <span className="text-white/70 whitespace-nowrap">★</span>                        
                        <span className="text-white font-bold whitespace-nowrap">WESTFIELDS INTERNATIONAL SCHOOL</span>
                        <span className="text-white/70 whitespace-nowrap">★</span>
                    </div>

                </div>
            </div>

            <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                    <div className="flex flex-col items-center mb-6">
                        <img src={Westfields} alt="Logo" className="h-16 mb-4" />
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