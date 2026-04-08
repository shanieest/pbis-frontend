import { useState } from "react";

export default function AdminLoginPage() {
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
            // navigate("/Dashboard");
        } 
    };

    return (
        <div className="min-h-screen flex">

            <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-10 py-16">
                <div className="w-full max-w-md">
                    <div className="mb-10">
                        <span className="text-3xl font-extrabold tracking-widest text-[#463b66]">PBIS</span>
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome back</h2>

                    {error && (
                        <div className="text-red-500 text-sm mb-4 bg-red-50 border border-red-200 rounded px-4 py-2">
                            {error}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#463b66] focus:border-transparent transition"
                                placeholder="you@example.com"
                                  required
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                                    Password
                                </label>
                            </div>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#463b66] focus:border-transparent transition"
                                placeholder="Password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#463b66] text-white py-3 rounded-lg text-sm font-semibold hover:bg-[#5a4d7f] active:scale-[0.98] transition-all duration-200 mt-2"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>

            <div className="hidden md:flex w-1/2 bg-[#463b66] items-center justify-center relative overflow-hidden">
                <div className="absolute w-96 h-96 rounded-full bg-white opacity-5 -top-20 -right-20" />
                <div className="absolute w-72 h-72 rounded-full bg-white opacity-5 bottom-10 -left-16" />
                <div className="absolute w-48 h-48 rounded-full bg-[#9F8383] opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

                <div className="relative z-10 text-center px-12">
                    <div className="flex justify-center mb-8">
    
                    </div>

                    <div className="flex justify-center gap-2 mt-10">
                        <span className="w-2 h-2 rounded-full bg-white opacity-80 inline-block" />
                        <span className="w-2 h-2 rounded-full bg-white opacity-40 inline-block" />
                        <span className="w-2 h-2 rounded-full bg-white opacity-40 inline-block" />
                    </div>
                </div>
            </div>

        </div>
    );
}