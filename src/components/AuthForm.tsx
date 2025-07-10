import { useState } from "react";
import { AuthAction, AuthPrompt } from "../constants/authConstants";
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

  const button = (
    <button
      type="submit"
      className={`w-full py-2 font-semibold text-white transition rounded ${
        isSignIn
          ? "bg-blue-600 hover:bg-blue-700"
          : "bg-red-600 hover:bg-red-700"
      }`}
    >
      {isSignIn ? AuthAction.SignIn : AuthAction.Register}
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
        {isSignIn ? AuthPrompt.NoAccount : AuthPrompt.AlreadyHaveAccount}
      </button>
    </div>
  );

  // supbase auth
  const handleAuth = async ({ email, password }: Record<string, string>) => {
    let data, error;

    if (isSignIn) {
      ({ data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      }));
    } else {
      ({ data, error } = await supabase.auth.signUp({
        email,
        password,
      }));
    }

    if (error) {
      setMessage(error.message);
    } else {
      setMessage(
        isSignIn
          ? "Signed in successfully!"
          : "Signup successful! Please check your email to confirm."
      );
      console.log("Auth success:", data);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 text-white sm:p-12">
      <GenericForm
        fields={fields}
        onSubmit={handleAuth}
        appName={"Jobs Tracker App"}
        button={button}
        buttonText={title}
        footer={footer}
      />

      {message && <p className="text-sm text-center text-red-400">{message}</p>}
    </div>
  );
}
