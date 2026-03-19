import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Loader2, MessageSquare, User, Mail, Lock } from 'lucide-react'
import toast from 'react-hot-toast'

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  })

  const { signup, isSigningUp } = useAuthStore()

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error('Full name is required')
    if (!formData.email.trim()) return toast.error('Email is required')
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Invalid email format')
    if (!formData.password) return toast.error('Password is required')
    if (formData.password.length < 6) return toast.error('Password must be at least 6 characters')
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const success = validateForm()
    if (success === true) signup(formData)
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/10">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2 text-white">Create Account</h1>
              <p className="text-gray-400">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-300">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10 bg-white/5 border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary h-12 rounded-lg`}
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-300">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10 bg-white/5 border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary h-12 rounded-lg`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-300">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-gray-500" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`input input-bordered w-full pl-10 bg-white/5 border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary h-12 rounded-lg`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-gray-500" />
                  ) : (
                    <Eye className="size-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full h-12 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="link link-primary text-indigo-400 hover:text-indigo-300 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Visual placeholder */}
      <div className="hidden lg:flex items-center justify-center bg-indigo-600/10 p-12">
        <div className="max-w-md text-center">
             <div className="grid grid-cols-3 gap-3 mb-8">
                {[...Array(9)].map((_, i) => (
                   <div key={i} className={`aspect-square rounded-2xl bg-indigo-500/10 flex items-center justify-center animate-pulse`} style={{ animationDelay: `${i * 100}ms` }}>
                      <MessageSquare className="size-8 text-indigo-500/20" />
                   </div>
                ))}
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Join our community</h2>
            <p className="text-gray-400 text-lg">
                Connect with friends, share moments, and stay in touch with the people who matter most.
            </p>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
