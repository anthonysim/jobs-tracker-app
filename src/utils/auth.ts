import { supabase } from "./supabaseClient";

export const handleLogin = async ({
  email,
  password,
}: Record<string, string>) => {
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
};

export const handleRegister = async ({
  email,
  password,
}: Record<string, string>) => {
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
};
