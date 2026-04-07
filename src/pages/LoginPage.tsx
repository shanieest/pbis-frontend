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
            navigate("/Dashboard");
        }
    };

    return (
        <div className="bg-white min-h-screen flex  justify-center p-10 rounded shadow-md radius-lg col-span-12">
            <div className="flex items-center  bg-white inset-x-0 top-0">
                <div className="bg-white p-8 w-full max-w-md flex flex-col">
                    <h2 className="text-2xl font-bold mb-6 ">PBIS</h2>
                    {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div className="mb-4">
                            <input
                                type="email"
                                id="email"
                                className="w-full px-3 py-2 border rounded"
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                id="password"
                                className="w-full px-3 py-2 border rounded"
                                placeholder="Password"
                                required
                            />
                        </div>
                        <button type="submit" onClick={handleLogin}
                            className="w-full bg-[#463b66] text-white py-2 rounded hover:bg-[#9F8383] transition duration-300">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}