import { useLocation } from 'react-router-dom'
import { Bell, Search, Activity } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'

const getPageTitle = (pathname) => {
  switch (pathname) {
    case '/dashboard': return 'Command Center'
    case '/crime-map': return 'Live Crime Map'
    case '/hotspots':  return 'Hotspot Detection'
    case '/prediction': return 'Risk Prediction'
    case '/analytics':  return 'Intelligence'
    case '/patrol':    return 'Patrol Optimizer'
    case '/reports':   return 'Reports'
    case '/settings':  return 'System Settings'
    default: return 'Overview'
  }
}

export default function Navbar() {
  const { pathname } = useLocation()
  const { user } = useAuth()
  const title = getPageTitle(pathname)

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-[#0c0e12]/50 backdrop-blur-md border-b border-white/5 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-bold text-white tracking-tight">{title}</h2>
        <div className="h-4 w-px bg-white/10" />
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-[#00fc92]" />
          <span className="text-[10px] font-mono font-medium text-[#00fc92] uppercase tracking-widest bg-[#00fc92]/10 px-2 py-0.5 rounded-sm border border-[#00fc92]/20 shadow-[0_0_10px_rgba(0,252,146,0.2)]">
            System Online
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group hidden md:block">
          <Search className="w-4 h-4 text-white/60 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-[#4cd6ff] transition-colors" />
          <input
            type="text"
            placeholder="Search records, districts..."
            className="w-64 bg-[#111318] border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#4cd6ff] focus:ring-1 focus:ring-[#4cd6ff] transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative p-2 text-white/50 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ff4444] rounded-full border border-[#0c0e12] animate-pulse" />
          </motion.button>
        </div>
      </div>
    </header>
  )
}
