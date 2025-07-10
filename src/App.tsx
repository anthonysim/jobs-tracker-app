import { useEffect } from "react";
import { supabase } from "./utils/supabaseClient";
import { useNavigate } from "@tanstack/react-router";
import AuthForm from "./components/AuthForm";
import "./App.css";

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        navigate({ to: "/jobslist" }); // ✅ Redirect
      }
    };

    getSession();
  }, []);

  return (
    <div>
      <AuthForm />
    </div>
  );
}
