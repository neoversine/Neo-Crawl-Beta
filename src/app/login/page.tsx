'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [msg, setMsg] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setMsg("");

        try {
            const res = await fetch("https://fasttools.neoversine.in/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    username: email,
                    password,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem("token", data.access_token);
                setMsg("Login successful! Redirecting...");
                setTimeout(() => router.push("/dashboard"), 1500);
            } else {
                const data = await res.json();
                setMsg(data.detail || "Login failed");
            }
        } catch (error) {
            console.error("Error while logging in:", error);
            setMsg("Server error. Please try again later.");
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#f9fafb] relative flex flex-col">
            {/* Grid Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
            linear-gradient(to right, #0b4f4a30 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
                    backgroundSize: "40px 40px",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
                    maskImage:
                        "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
                }}
            />

            <div className="flex flex-1 justify-center items-center px-4 z-10">
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md bg-gradient-to-br from-lime-400/40 via-teal-500/40 to-cyan-400/40 p-2 rounded-3xl"
                >
                    <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-8">
                        <h2 className="text-3xl font-bold text-center text-gray-900">
                            Welcome Back 👋
                        </h2>
                        <p className="text-gray-500 text-center mt-2">
                            Login to access your account
                        </p>

                        <form onSubmit={handleLogin} className="mt-8 space-y-5">
                            {/* Email */}
                            <div className="bg-gradient-to-tl from-lime-400/40 via-teal-500/40 to-cyan-400/40 p-1 rounded-2xl overflow-hidden">
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl shadow-sm bg-white text-gray-800 focus:border-teal-500 outline-none"
                                    required
                                />
                            </div>

                            {/* Password with eye button */}
                            <div className="bg-gradient-to-tl from-lime-400/40 via-teal-500/40 to-cyan-400/40 p-1 rounded-2xl overflow-hidden relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    autoComplete="current-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 pr-12 rounded-xl shadow-sm bg-white text-gray-800 focus:border-teal-500 outline-none"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-teal-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            {/* Submit */}
                            <div className="z-10 w-fit mx-auto p-1 rounded-xl bg-white shadow border border-gray-400/10">
                                <button
                                    type="submit"
                                    className="flex justify-center items-center w-full px-10 py-2 rounded-lg bg-gradient-to-br from-lime-400/40 via-teal-500/40 to-cyan-400/40
 text-teal-900 font-bold hover:opacity-90 disabled:opacity-60 hover:shadow hover:shadow-green-800 hover:scale-[101%] active:shadow-none active:scale-[100%] uppercase"
                                >
                                    Login
                                </button>
                            </div>
                            {msg && <p className="text-center text-sm mt-2">{msg}</p>}
                        </form>

                        <p className="mt-6 text-sm text-center text-gray-600">
                            Don’t have an account?{" "}
                            <a href="/signup" className="text-teal-600 font-medium hover:underline">
                                Sign Up
                            </a>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
