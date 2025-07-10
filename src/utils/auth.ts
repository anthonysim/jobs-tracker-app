import { supabase } from "./supabaseClient";
import { useNavigate } from "@tanstack/react-router";

export const handleLogin = async ({
  email,
  password,
}: Record<string, string>) => {
  const navigate = useNavigate();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", error.message);
    return;
  }
  console.log("Signed in successfully!");
  console.log("Auth success:", data);
  navigate({ to: "/jobslist" }); // ✅ Redirect
};

export const handleRegister = async ({
  email,
  password,
}: Record<string, string>) => {
  const navigate = useNavigate();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (data.user) {
    console.log("This email is already registered or awaiting confirmation.");
    return;
  }

  if (error) {
    console.error("Registration error:", error.message);
    return;
  }

  console.log("Signup successful! Please check your email to confirm.");
  console.log("Auth success:", data);
  navigate({ to: "/jobslist" }); // ✅ Redirect
};
