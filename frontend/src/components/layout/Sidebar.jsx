import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ShieldAlert, Shield, Map, Target, Brain, BarChart3,
  Crosshair, FileText, Settings as SettingsIcon, LogOut, Hexagon
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useState } from 'react'

const navItems = [
  { path: '/dashboard', icon: Shield, label: 'Command Center' },
  { path: '/crime-map', icon: Map, label: 'Live Crime Map' },
  { path: '/hotspots', icon: Target, label: 'Hotspot Detection' },
  { path: '/prediction', icon: Brain, label: 'Risk Prediction' },
  { path: '/analytics', icon: BarChart3, label: 'Intelligence' },
  { path: '/patrol', icon: Crosshair, label: 'Patrol Optimizer' },
  { path: '/reports', icon: FileText, label: 'Reports' },
]

export default function Sidebar() {
  const { logout, user } = useAuth()
  const [hovered, setHovered] = useState(null)

  return (
    <div className="w-64 h-screen bg-[#0a0c10]/80 backdrop-blur-2xl border-r border-white/5 flex flex-col pt-6 pb-6 relative z-50 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
      {/* Brand */}
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="relative">
          <Hexagon className="w-8 h-8 text-[#4cd6ff] drop-shadow-[0_0_12px_rgba(76,214,255,0.6)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <ShieldAlert className="w-4 h-4 text-[#003543]" />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">CrimeVision</h1>
          <p className="text-[10px] font-mono font-medium tracking-widest text-[#4cd6ff] uppercase">AI Platform</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onMouseEnter={() => setHovered(item.path)}
            onMouseLeave={() => setHovered(null)}
            className={({ isActive }) => `
              relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
              ${isActive ? 'text-[#4cd6ff] bg-[#4cd6ff]/10 shadow-[inset_0_0_0_1px_rgba(76,214,255,0.2)]' : 'text-white/50 hover:text-white hover:bg-white/5'}
            `}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl bg-[#4cd6ff]/5 border border-[#4cd6ff]/20"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <item.icon className={`w-5 h-5 relative z-10 ${isActive ? 'drop-shadow-[0_0_8px_rgba(76,214,255,0.6)]' : ''}`} />
                <span className="font-semibold text-sm relative z-10">{item.label}</span>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#4cd6ff] rounded-r-full shadow-[0_0_10px_rgba(76,214,255,1)]" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="px-4 mt-auto space-y-2">
        <NavLink
          to="/settings"
          className={({ isActive }) => `
            flex items-center gap-3 px-4 py-3 rounded-xl transition-all
            ${isActive ? 'text-white bg-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]' : 'text-white/50 hover:text-white hover:bg-white/5'}
          `}
        >
          <SettingsIcon className="w-5 h-5" />
          <span className="font-medium text-sm">System Settings</span>
        </NavLink>
        
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-[#ff4444] hover:bg-[#ff4444]/10 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Terminate Session</span>
        </button>
      </div>

      {/* User Info */}
      <div className="px-6 pt-6 mt-4 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#4cd6ff] to-[#00fc92] flex items-center justify-center shadow-[0_0_15px_rgba(0,252,146,0.3)]">
            <span className="font-bold text-[#003543] text-sm">{user?.name?.charAt(0) || 'O'}</span>
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-white truncate">{user?.name || 'Officer'}</p>
            <p className="text-[10px] font-mono text-white/60 uppercase truncate">{user?.email || 'Badge #4928'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
