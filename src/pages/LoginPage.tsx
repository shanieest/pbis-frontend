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

            {/* ── LEFT: Login Form ── */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-10 py-16">
                <div className="w-full max-w-md">
                    {/* Logo / Brand */}
                    <div className="mb-10">
                        <span className="text-3xl font-extrabold tracking-widest text-[#463b66]">PBIS</span>
                        <p className="text-gray-400 text-sm mt-1 tracking-wide">Admin Portal</p>
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome back</h2>
                    <p className="text-gray-400 text-sm mb-8">Sign in to your account to continue</p>

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
                                <a href="#" className="text-xs text-[#463b66] hover:underline">
                                    Forgot password?
                                </a>
                            </div>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#463b66] focus:border-transparent transition"
                                placeholder="••••••••"
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

            {/* ── RIGHT: Visual Panel ── */}
            <div className="hidden md:flex w-1/2 bg-[#463b66] items-center justify-center relative overflow-hidden">
                {/* Decorative background circles */}
                <div className="absolute w-96 h-96 rounded-full bg-white opacity-5 -top-20 -right-20" />
                <div className="absolute w-72 h-72 rounded-full bg-white opacity-5 bottom-10 -left-16" />
                <div className="absolute w-48 h-48 rounded-full bg-[#9F8383] opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

                {/* Center content */}
                <div className="relative z-10 text-center px-12">
                    {/* SVG Logo / Illustration */}
                    <div className="flex justify-center mb-8">
                        <svg
                            width="120"
                            height="120"
                            viewBox="0 0 120 120"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="60" cy="60" r="58" stroke="white" strokeOpacity="0.3" strokeWidth="2" />
                            <circle cx="60" cy="60" r="44" stroke="white" strokeOpacity="0.5" strokeWidth="2" />
                            {/* Shield shape */}
                            <path
                                d="M60 22L82 32V58C82 72 72 83 60 88C48 83 38 72 38 58V32L60 22Z"
                                fill="white"
                                fillOpacity="0.15"
                                stroke="white"
                                strokeWidth="2"
                            />
                            {/* Checkmark */}
                            <path
                                d="M50 60L57 67L72 52"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <h3 className="text-white text-2xl font-bold tracking-wide mb-3">
                        PBIS Admin System
                    </h3>
                    <p className="text-white text-opacity-70 text-sm leading-relaxed opacity-70 max-w-xs mx-auto">
                        Manage behavior intervention and support programs securely from one place.
                    </p>

                    {/* Decorative dots */}
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