'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'

export default function AdminRegister() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/admin/login`,
        },
      })

      if (error) throw error

      if (data.user) {
        alert('Registration successful! Please check your email to confirm your account.')
        router.push('/admin/login')
      }
    } catch (error: any) {
      console.error(error)
      alert(error.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-concrete font-sans">
      {/* Left Side - Image & Quote */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-light-coral text-white">
        <div className="absolute inset-0">
           {/* Using gallery-1.jpg as background */}
          <Image 
            src="/gallery-2.jpg" 
            alt="Friends" 
            fill 
            className="object-cover opacity-40 mix-blend-multiply"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-light-coral/80 to-rose-600/80 mix-blend-multiply" />
        </div>
        <div className="relative z-10 flex flex-col justify-end p-16 pb-24 h-full">
          <blockquote className="font-serif text-5xl font-medium leading-tight mb-8">
            "Saying goodbye doesn't mean anything. It's the time we spent together that matters."
          </blockquote>

        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 overflow-y-auto bg-concrete">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
               <div className="w-10 h-10 bg-light-coral rounded-full flex items-center justify-center shadow-lg shadow-light-coral/30">
                  <div className="w-5 h-5 bg-white rounded-full" />
               </div>
               <span className="font-bold text-2xl text-dune tracking-tight">Farewell Vault</span>
            </div>
            <h2 className="text-4xl font-bold text-dune tracking-tight mb-3">
              Join the Farewell Vault for Njambi
            </h2>
            <p className="text-dune/60 text-lg">
              Leave a message she'll cherish forever.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleRegister}>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-dune mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  className="block w-full px-5 py-4 rounded-xl border border-gray-200 bg-white text-dune placeholder-dune/30 focus:outline-none focus:ring-2 focus:ring-light-coral focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-dune mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="block w-full px-5 py-4 rounded-xl border border-gray-200 bg-white text-dune placeholder-dune/30 focus:outline-none focus:ring-2 focus:ring-light-coral focus:border-transparent transition-all"
                  placeholder="Enter your email address"
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
                    minLength={6}
                    className="block w-full px-5 py-4 rounded-xl border border-gray-200 bg-white text-dune placeholder-dune/30 focus:outline-none focus:ring-2 focus:ring-light-coral focus:border-transparent transition-all pr-12"
                    placeholder="Create a password"
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

              <div>
                <label className="block text-sm font-bold text-dune mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    className="block w-full px-5 py-4 rounded-xl border border-gray-200 bg-white text-dune placeholder-dune/30 focus:outline-none focus:ring-2 focus:ring-light-coral focus:border-transparent transition-all pr-12"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-dune/40 hover:text-dune/60 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg shadow-light-coral/30 text-base font-bold text-white bg-light-coral hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-coral disabled:opacity-50 transition-all transform active:scale-[0.98]"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>

            <div className="text-center">
              <p className="text-dune/60">
                Already have an account?{' '}
                <Link href="/admin/login" className="font-bold text-light-coral hover:text-rose-600 underline decoration-2 underline-offset-4">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
