"use client";

import { useState } from "react";
import { AuthAction, AuthPrompt } from "@/types/enums";

export default function Home() {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);

  const title = isSignIn ? AuthAction.SignIn : AuthAction.Register;
  const actionColor = isSignIn
    ? "bg-blue-500 hover:bg-blue-600"
    : "bg-orange-600 hover:bg-orange-700";
  const toggleText = isSignIn
    ? AuthPrompt.NoAccount
    : AuthPrompt.AlreadyHaveAccount;

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <form
          onSubmit={submitHandler}
          className="max-w-md mx-auto mt-10 p-6 rounded shadow bg-gray-900 text-white space-y-4 border border-gray-700"
        >
          <h1 className="text-3xl text-center">Jobs Status Tracker</h1>
          <h2 className="text-2xl font-bold text-center">{title}</h2>

          <input
            type="email"
            placeholder="Email"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 p-2 mb-2 rounded text-white placeholder-gray-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 p-2 mb-4 rounded text-white placeholder-gray-400"
            required
          />

          <button
            className={`text-white w-full px-4 py-2 rounded hover:cursor-pointer ${actionColor}`}
            type="submit"
          >
            {title}
          </button>

          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-sm text-blue-400 hover:underline hover:cursor-pointer"
              onClick={() => setIsSignIn((prev) => !prev)}
            >
              {toggleText}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
