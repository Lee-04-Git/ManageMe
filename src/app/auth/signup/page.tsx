"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update display name
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }

      // Redirect to Sign In page
      router.push("/auth/signin");
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already in use.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError("Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1d23] p-6">
      <div className="bg-[#2a2d35] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Create Your Account
        </h1>

        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-[#1a1d23] text-white border border-gray-600 focus:outline-none focus:border-[#ff6b6b]"
            />
          </div>

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
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-[#ff6b6b] hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
