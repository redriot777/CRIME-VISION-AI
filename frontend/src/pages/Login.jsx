import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldAlert, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, Hexagon } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { toast } from 'sonner'

function FloatingBlob({ className }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
      animate={{
        scale:  [1, 1.2, 1],
        x:      [0, 30, 0],
        y:      [0, -20, 0],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)

  const onSubmit = async (data) => {
    await new Promise(r => setTimeout(r, 800))
    login(data)
    toast.success('Authentication successful! Initializing Command Center…')
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: '#0a0c10' }}
    >
      {/* Animated Blobs using new branding colors */}
      <FloatingBlob className="w-96 h-96 bg-[#4cd6ff] -top-20 -left-20" />
      <FloatingBlob className="w-72 h-72 bg-[#ffb3ae] bottom-10 right-10" />
      <FloatingBlob className="w-60 h-60 bg-[#00fc92] top-1/2 right-1/4" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0,  scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="glass-card p-8 border border-white/10 glow-border-primary" style={{ background: 'rgba(255,255,255,0.02)' }}>
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <Hexagon className="w-16 h-16 text-[#4cd6ff] drop-shadow-[0_0_12px_rgba(76,214,255,0.6)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <ShieldAlert className="w-8 h-8 text-[#003543]" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">CrimeVision AI</h1>
            <p className="text-[#4cd6ff] text-[10px] font-mono mt-1 uppercase tracking-widest">Predictive Intelligence Platform</p>
          </div>

          <h2 className="text-lg font-semibold text-white mb-1">Agent Authentication</h2>
          <p className="text-white/40 text-sm mb-6">Enter your credentials to access the secure network</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-[10px] font-mono text-white/60 mb-1.5 uppercase tracking-wider">Agent ID / Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                <input
                  type="email"
                  placeholder="officer@cpd.gov"
                  className="w-full bg-[#010409] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#4cd6ff] focus:ring-1 focus:ring-[#4cd6ff] transition-all"
                  {...register('email', {
                    required: 'Email is required',
                    pattern:  { value: /\S+@\S+\.\S+/, message: 'Invalid format' }
                  })}
                />
              </div>
              {errors.email && <p className="text-[#ff4444] text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] font-mono text-white/60 mb-1.5 uppercase tracking-wider">Security Clearance Phrase</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full bg-[#010409] border border-white/10 rounded-lg py-2.5 pl-10 pr-10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#4cd6ff] focus:ring-1 focus:ring-[#4cd6ff] transition-all"
                  {...register('password', { required: 'Clearance phrase is required', minLength: { value: 4, message: 'Min 4 characters' } })}
                />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-[#ff4444] text-xs mt-1">{errors.password.message}</p>}
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded accent-[#4cd6ff] border-white/10 bg-[#010409]" {...register('remember')} />
                <span className="text-xs text-white/50">Keep me connected</span>
              </label>
              <button type="button" className="text-xs text-[#4cd6ff] hover:text-[#8ee4ff] transition-colors">
                Request override?
              </button>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-6 px-4 py-3 rounded-lg bg-[#4cd6ff] text-[#003543] font-bold text-sm uppercase tracking-wider hover:bg-[#8ee4ff] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(76,214,255,0.3)]"
            >
              {isSubmitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Authenticating…</>
              ) : (
                <><span>Access Terminal</span><ArrowRight className="w-4 h-4" /></>
              )}
            </motion.button>
          </form>

          <p className="text-center text-[10px] font-mono text-white/25 mt-6 uppercase tracking-wider">
            Secure connection to Chicago Metro Grid
          </p>
        </div>

        {/* Version tag */}
        <p className="text-center text-[#00fc92]/60 text-[10px] font-mono mt-4 uppercase tracking-widest flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00fc92] animate-pulse" />
          CrimeVision System Online v1.0
        </p>
      </motion.div>
    </div>
  )
}
