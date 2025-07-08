import { useState } from "react";
import { AuthAction, AuthPrompt } from "../constants/authConstants";
import type { AuthType } from "../types/types";
import { supabase } from "../utils/supabaseClient";
import GenericForm from "../components/forms/GenericForm";

export default function AuthForm() {
  const [isSignIn, setIsSignIn] = useState(false);
  const [message, setMessage] = useState("");

  // fields for the GenericForm
  const fields = {
    email: { type: "email", placeholder: "Email" },
    password: { type: "password", placeholder: "Password" },
  };

  const title = isSignIn ? AuthAction.SignIn : AuthAction.Register;

  const actionColor = isSignIn
    ? "bg-red-600 hover:bg-red-700"
    : "bg-orange-500 hover:bg-orange-600";

  const toggleText = isSignIn
    ? AuthPrompt.NoAccount
    : AuthPrompt.AlreadyHaveAccount;

  // supbase auth
  const handleAuth = async ({ email, password }: Record<string, string>) => {
    const type: AuthType = isSignIn ? "signIn" : "signUp";

    const authFn =
      type === "signUp"
        ? supabase.auth.signUp
        : supabase.auth.signInWithPassword;

    const { data, error } = await authFn({ email, password });

    if (error) {
      setMessage(error.message);
    } else {
      const successMsg =
        type === "signUp"
          ? "Signup successful! Please check your email to confirm."
          : "Signed in successfully!";
      setMessage(successMsg);

      if (type === "signUp") {
        console.log("User signed up:", data);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 text-white sm:p-12">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 border border-gray-800 shadow-lg rounded-2xl">
        <h1 className="text-3xl font-semibold text-center">Jobs Tracker App</h1>
        <h2 className="text-xl font-medium text-center">{title}</h2>

        <GenericForm
          fields={fields}
          onSubmit={handleAuth}
          buttonText={title}
          buttonClassName={actionColor}
        />

        {message && (
          <p className="text-sm text-center text-red-400">{message}</p>
        )}

        <div className="pt-2 text-center">
          <button
            className="text-sm text-blue-400 hover:underline"
            onClick={() => {
              setIsSignIn((prev) => !prev);
              setMessage("");
            }}
          >
            {toggleText}
          </button>
        </div>
      </div>
    </div>
  );
}
