import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black font-sans">
      <main className="w-full max-w-md bg-white dark:bg-zinc-900 p-10 rounded-2xl shadow-sm">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-center text-black dark:text-zinc-50 mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-8">
          Sign in
        </p>
        <Link href="/dashboard">Go to Dashboard</Link>
      </main>
    </div>
  );
}
