import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
        <div className="min-h-screen flex duration-300 transition-all">

            <div className="flex-1 flex items-center justify-center bg-linear-to-r from-[#4D2B8C] to-[#85409D]">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                    <div className="flex flex-col items-center mb-6">
                        <img src={Westfields} alt="Logo" className="h-16 mb-4" />
                        <h2 className="text-1xl font-bold text-[#4D2B8C]">Positive Behavioral Interventions and Supports</h2>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5E83] focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5E83] focus:border-transparent"
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-gradient-to-r from-[#4D2B8C] to-[#85409D] text-white font-semibold rounded-lg hover:from-[#8B5E83] hover:to-gray-200 transition-colors"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}