"use client"

import { useState, type FormEvent } from "react"

export function LoginCard() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <div className="w-full max-w-md mx-4 sm:mx-0">
      <form
        onSubmit={handleSubmit}
        className="
          relative overflow-hidden
          bg-white/[0.06] backdrop-blur-2xl
          border border-white/[0.1]
          rounded-3xl shadow-2xl shadow-black/30
          p-6 sm:p-10
          animate-card-in
        "
      >
        {/* Subtle inner glow */}
        <div
          className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-cyan-400/[0.08] blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 space-y-7">
          {/* Header */}
          <div className="space-y-1.5">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Sign in
            </h1>
            <p className="text-sm text-white/50 font-light tracking-wide">
              Welcome back. Enter your credentials to continue.
            </p>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-xs font-medium uppercase tracking-widest text-white/50"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full rounded-xl border border-white/[0.08] bg-white/[0.04]
                px-4 py-3 text-sm text-white
                placeholder:text-white/25
                outline-none
                transition-all duration-200
                focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/20 focus:bg-white/[0.06]
              "
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-xs font-medium uppercase tracking-widest text-white/50"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full rounded-xl border border-white/[0.08] bg-white/[0.04]
                px-4 py-3 text-sm text-white
                placeholder:text-white/25
                outline-none
                transition-all duration-200
                focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/20 focus:bg-white/[0.06]
              "
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className="
                  h-4 w-4 rounded border-white/20 bg-white/5
                  text-violet-500 accent-violet-500
                  focus:ring-2 focus:ring-violet-500/30 focus:ring-offset-0
                "
              />
              <span className="text-xs text-white/50 group-hover:text-white/70 transition-colors">
                Remember me
              </span>
            </label>
            <a
              href="#"
              className="text-xs text-violet-400/70 hover:text-violet-300 transition-colors focus:outline-none focus:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full rounded-xl py-3 text-sm font-semibold tracking-wide text-white
              bg-gradient-to-r from-violet-600 to-indigo-600
              shadow-lg shadow-violet-600/20
              transition-all duration-300
              hover:shadow-xl hover:shadow-violet-500/30 hover:brightness-110
              active:scale-[0.98]
              focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:ring-offset-2 focus:ring-offset-transparent
              cursor-pointer
            "
          >
            Sign in
          </button>

          {/* Sign up */}
          <p className="text-center text-xs text-white/45">
            Don&apos;t have an account?{" "}
            <a
              href="#"
              className="text-violet-400/80 hover:text-violet-300 transition-colors font-medium focus:outline-none focus:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}
