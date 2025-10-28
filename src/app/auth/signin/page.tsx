"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Logged in user:", userCredential.user);

      // Redirect to profile page
      router.push("/profile");
    } catch (err: any) {
      console.error(err);
      if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found"
      ) {
        setError("Invalid email or password.");
      } else {
        setError("Failed to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1d23] p-6">
      <div className="bg-[#2a2d35] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Welcome Back 👋
        </h1>

        <form onSubmit={handleSignIn} className="space-y-5">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-[#1a1d23] text-white border border-gray-600 focus:outline-none focus:border-[#ff6b6b]"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-[#1a1d23] text-white border border-gray-600 focus:outline-none focus:border-[#ff6b6b]"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff6b6b] hover:bg-[#ff5252] text-white py-2 rounded-lg transition-colors disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className="text-[#ff6b6b] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
