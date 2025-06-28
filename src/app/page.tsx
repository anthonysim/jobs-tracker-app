export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="max-w-md mx-auto mt-10 p-6 rounded shadow bg-gray-900 text-white space-y-4 border border-gray-700">
          <h1 className="text-3xl text-center">Jobs Status Tracker</h1>
          <h2 className="text-2xl font-bold text-center">Sign In</h2>
          <input
            type="email"
            placeholder="Email"
            // value={email}
            className="w-full bg-gray-800 border border-gray-600 p-2 mb-2 rounded text-white placeholder-gray-400"
            // onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            // value={password}
            className="w-full bg-gray-800 border border-gray-600 p-2 mb-4 rounded text-white placeholder-gray-400"
            // onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white w-full px-4 py-2 rounded hover:bg-blue-600 hover:cursor-pointer"
            // onClick={() => console.log('Sign In Clicked')}
          >
            Sign In
          </button>
          <div className="mt-4 text-center">
            <button
              className="text-sm text-blue-400 hover:underline hover:cursor-pointer"
              // onClick={() => console.log("Register Clicked")}
            >
              {`Don't have an account? Register`}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
