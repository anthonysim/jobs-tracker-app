import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AuthAction, AuthPrompt } from "../constants/authConstants";
import { handleLogin, handleRegister } from "../utils/auth";
import GenericForm from "../components/forms/GenericForm";

export default function AuthForm() {
  const [isSignIn, setIsSignIn] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values: Record<string, string>) => {
    const success = isSignIn
      ? await handleLogin(values)
      : await handleRegister(values);

    if (success) {
      navigate({ to: "/jobslist" });
    }
  };

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
        onClick={() => setIsSignIn((prev) => !prev)}
      >
        {isSignIn ? AuthPrompt.NoAccount : AuthPrompt.AlreadyHaveAccount}
      </button>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen p-6 text-white sm:p-12">
      <GenericForm
        key={isSignIn ? "login" : "register"} // 👈 Force re-render
        fields={{
          email: { type: "email", placeholder: "Email" },
          password: { type: "password", placeholder: "Password" },
        }}
        onSubmit={onSubmit}
        appName={"Jobs Tracker App"}
        button={button}
        buttonText={isSignIn ? AuthAction.SignIn : AuthAction.Register}
        footer={footer}
      />
    </div>
  );
}
