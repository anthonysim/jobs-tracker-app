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

  const button = (
    <button
      type="submit"
      className={`w-full py-2 font-semibold text-white transition rounded ${actionColor || "bg-blue-600 hover:bg-blue-700"}`}
    >
      {title}
    </button>
  );

  const footer = (
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
  );

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
      <GenericForm
        fields={fields}
        onSubmit={handleAuth}
        appName={"Jobs Tracker App"}
        title={title}
        button={button}
        buttonText={title}
        footer={footer}
      />

      {message && <p className="text-sm text-center text-red-400">{message}</p>}
    </div>
  );
}
