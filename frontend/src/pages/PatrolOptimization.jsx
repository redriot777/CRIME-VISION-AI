import { motion } from 'framer-motion'
import {
  Crosshair, Navigation, Shield, Clock, AlertTriangle,
  CheckCircle2, Radio, MapPin, ChevronRight, Map, FastForward
} from 'lucide-react'
import { usePatrol } from '../hooks/usePatrol'

const RISK_COLORS = {
  CRITICAL: 'text-[#ff4444] bg-[#ff4444]/10 border-[#ff4444]/30',
  HIGH:     'text-[#ffb3ae] bg-[#ffb3ae]/10 border-[#ffb3ae]/30',
  MEDIUM:   'text-[#ffcc00] bg-[#ffcc00]/10 border-[#ffcc00]/30',
  LOW:      'text-[#00fc92] bg-[#00fc92]/10 border-[#00fc92]/30',
}

const stagger = { animate: { transition: { staggerChildren: 0.05 } } }
const fadeUp = { initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 } }

export default function PatrolOptimization() {
  const { patrol, loading } = usePatrol()

  if (loading || !patrol) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="h-8 w-64 bg-white/5 rounded animate-pulse mb-8" />
        <div className="h-32 bg-white/5 rounded-xl animate-pulse" />
        <div className="space-y-4">
          {[1,2,3].map(i => <div key={i} className="h-24 bg-white/5 rounded-xl animate-pulse" />)}
        </div>
      </div>
    )
  }

  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-[#00fc92]/10">
          <Crosshair className="w-6 h-6 text-[#00fc92]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Patrol Optimization Engine</h1>
          <p className="text-white/60 text-sm mt-1 font-mono">
            AI-driven route calculation based on DBSCAN hotspots and XGBoost risk predictions.
          </p>
        </div>
      </motion.div>

      {/* KPI Stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Units', value: patrol.stats.total_active_units, icon: Radio, color: 'text-[#4cd6ff]' },
          { label: 'Optimized Routes', value: patrol.stats.optimized_routes, icon: Navigation, color: 'text-[#00fc92]' },
          { label: 'Predictive Strike Rate', value: `${patrol.stats.predictive_strike_rate}%`, icon: Crosshair, color: 'text-[#ffb3ae]' },
          { label: 'Coverage Efficiency', value: `${patrol.stats.coverage_efficiency}%`, icon: Shield, color: 'text-[#a78bfa]' }
        ].map((stat, i) => (
          <div key={i} className="glass-card p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-white/70 uppercase tracking-wider">{stat.label}</span>
              <stat.icon className={`w-4 h-4 ${stat.color} opacity-80`} />
            </div>
            <div className={`text-2xl font-bold mt-auto ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </motion.div>

      {/* Recommendations List */}
      <motion.div variants={fadeUp} className="space-y-4">
        <h2 className="text-sm font-bold text-white mb-2 mt-4 flex items-center gap-2">
          <FastForward className="w-4 h-4 text-white/70" />
          Recommended Deployments
        </h2>
        
        {patrol.recommendations.map((rec, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className={`glass-card p-0 overflow-hidden border-l-4 ${RISK_COLORS[rec.risk_level].replace('text', 'border').split(' ')[2]}`}
          >
            <div className="p-5 flex flex-col md:flex-row gap-6">
              {/* Left Column: District & Priority */}
              <div className="md:w-48 shrink-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-white/60" />
                    <span className="text-sm font-bold text-white">District {rec.district}</span>
                  </div>
                  <div className="text-[10px] font-mono text-white/60">
                    {rec.latitude.toFixed(4)}° N, {Math.abs(rec.longitude).toFixed(4)}° W
                  </div>
                </div>
                <div className="mt-4">
                  <div className={`inline-flex px-3 py-1 rounded-full border text-[10px] font-bold tracking-wider ${RISK_COLORS[rec.risk_level]}`}>
                    {rec.priority} PRIORITY
                  </div>
                </div>
              </div>

              {/* Middle Column: Action & Details */}
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white/90">{rec.recommended_action}</h3>
                  <p className="text-xs text-white/70 mt-1">{rec.reason}</p>
                </div>
                
                <div className="flex flex-wrap gap-4 text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-[#4cd6ff]">
                    <Shield className="w-3.5 h-3.5" />
                    <span>+{rec.recommended_units} Units</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#a78bfa]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{rec.shift} ({rec.time_window})</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#ffb3ae]">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{rec.total_incidents} predicted incidents</span>
                  </div>
                </div>
                
                {/* Top Crimes tags */}
                <div className="flex gap-2">
                  {rec.top_crimes.map((tc, idx) => (
                    <span key={idx} className="px-2 py-1 bg-white/5 rounded text-[10px] text-white/60 font-mono">
                      {tc.type} ({tc.count})
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="md:w-48 shrink-0 flex flex-col justify-center gap-2 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                {rec.status === 'OPTIMIZED' ? (
                  <div className="flex items-center justify-center gap-2 px-4 py-3 bg-[#00fc92]/10 text-[#00fc92] rounded-lg border border-[#00fc92]/20 font-bold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" />
                    Deployed
                  </div>
                ) : (
                  <>
                    <button className="w-full px-4 py-2.5 rounded-lg bg-[#4cd6ff] text-[#003543] font-bold text-xs uppercase tracking-wider hover:bg-[#8ee4ff] transition-colors flex items-center justify-center gap-2">
                      <Radio className="w-4 h-4" />
                      Dispatch
                    </button>
                    <button className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white/60 font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors">
                      Modify
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
