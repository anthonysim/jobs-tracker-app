import { useState } from "react";
import "./App.css";
import { AuthAction, AuthPrompt } from "./types/types";
// import { useNavigate } from "@tanstack/react-router";
// import { SupabaseClient } from "@supabase/supabase-js";

export default function App() {
  const [isSignIn, setIsSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();

  // const signUp = async (email: string, password: string) => {
  //   const { data, error } = await supabase.auth.signUp({ email, password });
  //   if (error) {
  //     console.error(error.message);
  //   } else {
  //     console.log("User signed up:", data);
  //   }
  // };

  const title = isSignIn ? AuthAction.SignIn : AuthAction.Register;
  const actionColor = isSignIn
    ? "bg-red-600 hover:bg-red-700"
    : "bg-orange-500 hover:bg-orange-600";
  const toggleText = isSignIn
    ? AuthPrompt.NoAccount
    : AuthPrompt.AlreadyHaveAccount;

  return (
    <div className="flex items-center justify-center min-h-screen p-6 text-white sm:p-12">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 border border-gray-800 shadow-lg rounded-2xl">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold">Jobs Tracker App</h1>
          <p className="text-sm text-gray-400"></p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-medium text-center">{title}</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 placeholder-gray-400 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 placeholder-gray-400 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            className={`w-full py-2 rounded text-white font-semibold transition ${actionColor}`}
            onClick={() => console.log("")}
          >
            {title}
          </button>
        </div>

        <div className="pt-2 text-center">
          <button
            className="text-sm text-blue-400 hover:underline"
            onClick={() => setIsSignIn((prev) => !prev)}
          >
            {toggleText}
          </button>
        </div>
      </div>
    </div>
  );
}
