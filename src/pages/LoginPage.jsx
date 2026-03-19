import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Loader2, MessageSquare, Mail, Lock } from 'lucide-react'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { login, isLoggingIn } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    login(formData)
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <div className="mesh-gradient" />
      
      <div className="glass-card w-full max-w-5xl rounded-[2.5rem] overflow-hidden grid lg:grid-cols-2 shadow-2xl animate-fade-in transition-all duration-700">
        {/* Left side - Form */}
        <div className="flex flex-col justify-center items-center p-8 sm:p-12 lg:p-16 border-r border-white/5">
          <div className="w-full max-w-sm space-y-10">
            {/* LOGO & Header */}
            <div className="text-center space-y-3">
              <div className="flex flex-col items-center gap-4 group">
                <div className="size-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-indigo-500/10">
                  <MessageSquare className="size-7 text-indigo-400" />
                </div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">Welcome Home</h1>
                <p className="text-slate-400 text-sm font-medium">Step back into your conversations</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-400">
                    <Mail className="size-5 text-slate-500" />
                  </div>
                  <input
                    type="email"
                    className="w-full pl-12 pr-4 bg-white/5 border border-white/5 text-white placeholder:text-slate-600 focus:bg-white/10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 h-14 rounded-2xl transition-all outline-none"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Security Key</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-400">
                    <Lock className="size-5 text-slate-500" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-12 pr-12 bg-white/5 border border-white/5 text-white placeholder:text-slate-600 focus:bg-white/10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 h-14 rounded-2xl transition-all outline-none"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-indigo-400 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg transition-all duration-300 shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3" 
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="size-6 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  'Enter Chat'
                )}
              </button>
            </form>

            <div className="text-center">
              <p className="text-slate-400 text-sm">
                New to the community?{' '}
                <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors">
                  Create Space
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Visual Experience */}
        <div className="hidden lg:flex flex-col items-center justify-center bg-indigo-600/5 p-16 space-y-12 relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 blur-[100px] -ml-32 -mb-32" />
          
          <div className="grid grid-cols-3 gap-5 relative z-10 w-full max-w-xs mx-auto">
            {[...Array(9)].map((_, i) => (
              <div 
                key={i} 
                className="aspect-square rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:bg-indigo-500/10 hover:border-indigo-500/20 shadow-sm shadow-black/20"
                style={{ animation: `pulse 4s infinite ${i * 0.2}s ease-in-out` }}
              >
                <div className="size-3 rounded-full bg-indigo-500/20" />
              </div>
            ))}
          </div>
          
          <div className="space-y-3 relative z-10">
            <h2 className="text-4xl font-black text-white leading-tight">Syncing Hearts, <br /> One Message At A Time.</h2>
            <p className="text-slate-400 text-lg font-medium">Experience the next generation of social connectivity.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default LoginPage