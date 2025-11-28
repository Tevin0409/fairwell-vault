'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/update-password`,
      })

      if (error) throw error

      alert('Password reset link sent to your email!')
    } catch (error: any) {
      console.error(error)
      alert(error.message || 'Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-concrete p-4 font-sans">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-dune tracking-tight">Farewell Vault</h1>
      </div>
      
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-dune/5 p-8 md:p-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-dune mb-3">
            Forgot Your Password?
          </h2>
          <p className="text-dune/60 text-base leading-relaxed max-w-xs mx-auto">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <form className="space-y-8" onSubmit={handleReset}>
          <div>
            <label className="block text-sm font-bold text-dune mb-2">Email Address</label>
            <input
              type="email"
              required
              className="block w-full px-5 py-4 rounded-xl border border-gray-200 bg-white text-dune placeholder-dune/30 focus:outline-none focus:ring-2 focus:ring-light-coral focus:border-transparent transition-all"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg shadow-light-coral/30 text-base font-bold text-white bg-light-coral hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-coral disabled:opacity-50 transition-all transform active:scale-[0.98]"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>

      <div className="mt-8 text-center">
        <Link href="/admin/login" className="text-sm font-bold text-dune/60 hover:text-dune underline decoration-2 decoration-dune/20 underline-offset-4 transition-all">
          Back to Login
        </Link>
      </div>
    </div>
  )
}
