import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/design.png";
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
        <div className="min-h-screen flex">

            <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-10 py-16">
                <div className="w-full max-w-md">
                    <div className="mb-10 text-center">
                        <span className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#8B5E83] to-[#C599B6]">PBIS</span>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm mb-4 bg-red-50 border border-red-200 rounded px-4 py-2">
                            {error}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleLogin}>
                        <div>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-3 border border-black-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#463b66] focus:border-transparent transition"
                                placeholder="Email"
                                required
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1">
                            </div>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-4 py-3 border border-black-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#463b66] focus:border-transparent transition"
                                placeholder="Password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#8B5E83] to-[#C599B6] text-white py-3 rounded-lg text-sm font-semibold hover:from-[#5a4d7f] hover:to-[#3a2d5f] active:scale-[0.98] transition-all duration-200 mt-2"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>

            <div className="hidden md:block w-1/2">
                <div className="h-full flex items-center justify-center">
                    <img src={Logo} alt="Login Illustration" className="w-3/4" />
                </div>
            </div>

            <footer className="absolute bottom-4 w-full text-sm text-gray-500 left-">
                    <img src={Westfields} alt="Westfields Logo" className="h-10" />
            </footer>
        </div>
    );
}