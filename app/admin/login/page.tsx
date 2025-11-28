'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.session) {
        router.push('/admin/dashboard')
      }
    } catch (error: any) {
      console.error(error)
      alert(error.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-concrete font-sans">
      {/* Left Side - Image & Text */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-dune text-white">
        <div className="absolute inset-0">
          <Image 
            src="/hero-bg.png" 
            alt="City" 
            fill 
            className="object-cover opacity-40 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-dune/40" />
        </div>
        <div className="relative z-10 flex flex-col justify-center p-16 h-full max-w-2xl mx-auto text-center lg:text-left">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Farewell Vault</h1>
          <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed">
            Cherish the moments. Your memories, all in one place.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 overflow-y-auto bg-concrete">
        <div className="max-w-md w-full space-y-10">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-bold text-dune tracking-tight mb-3">
              Welcome Back
            </h2>
            <p className="text-dune/60 text-lg">
              Log in to your vault to cherish the moments.
            </p>
          </div>

          <form className="space-y-8" onSubmit={handleLogin}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-dune mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  className="block w-full px-5 py-4 rounded-xl border border-gray-200 bg-white text-dune placeholder-dune/30 focus:outline-none focus:ring-2 focus:ring-light-coral focus:border-transparent transition-all"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-dune mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="block w-full px-5 py-4 rounded-xl border border-gray-200 bg-white text-dune placeholder-dune/30 focus:outline-none focus:ring-2 focus:ring-light-coral focus:border-transparent transition-all pr-12"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-dune/40 hover:text-dune/60 transition-colors"
                  >
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Link href="/admin/forgot-password" className="text-sm font-bold text-light-coral hover:text-rose-600 underline decoration-2 underline-offset-4">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg shadow-light-coral/20 text-base font-bold text-white bg-light-coral hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-coral disabled:opacity-50 transition-all transform active:scale-[0.98]"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className="text-center pt-4">
              <p className="text-dune/60">
                New here?{' '}
                <Link href="/admin/register" className="font-bold text-light-coral hover:text-rose-600 underline decoration-2 underline-offset-4">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
