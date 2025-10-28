"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Email/password sign-up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }

      // Redirect to profile page after sign-up
      router.push("/profile");
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

  // Google Sign-Up / Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Logged in with Google:", result.user);

      // Redirect to profile page
      router.push("/profile");
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError("Failed to sign in with Google.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1d23] p-6">
      <div className="bg-[#2a2d35] p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-white text-center">
          Create Your Account
        </h1>

        {/* Google Sign-Up */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
        >
          Sign up with Google
        </button>

        <div className="text-gray-400 text-center">or</div>

        {/* Email/Password Sign-Up */}
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

        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-[#ff6b6b] hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
