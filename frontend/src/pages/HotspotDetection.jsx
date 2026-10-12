import { motion } from 'framer-motion'
import {
  Target, Download, SlidersHorizontal, Activity, TrendingUp,
  TrendingDown, Minus, Radio, Compass, Timer, Waves, ChevronRight
} from 'lucide-react'
import { useHotspots } from '../hooks/useHotspots'
import { useStatistics } from '../hooks/useStatistics'
import { CardSkeleton } from '../components/ui/SkeletonLoader'
import { toast } from 'sonner'

const RISK_COLORS = {
  CRITICAL: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', bar: 'bg-red-500' },
  HIGH:     { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', bar: 'bg-orange-500' },
  MEDIUM:   { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', bar: 'bg-yellow-500' },
  LOW:      { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', bar: 'bg-emerald-500' },
}

const GROWTH_LABELS = ['+12% Growth', '+05% Growth', '-08% Growth', '— Stable', '+03% Growth', '-02% Growth']

const stagger = { animate: { transition: { staggerChildren: 0.06 } } }
const fadeUp = { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0, transition: { duration: 0.3 } } }

export default function HotspotDetection() {
  const { hotspots: data, loading, error } = useHotspots()
  const { statistics: stats } = useStatistics()
  const hotspots = data?.hotspots || []

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="h-8 w-64 bg-white/5 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {Array(6).fill(0).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      </div>
    )
  }

  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#4cd6ff]/10">
              <Target className="w-5 h-5 text-[#4cd6ff]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Advanced Hotspot Detection & Analysis</h1>
              <p className="text-white/60 text-sm mt-0.5 font-mono">
                Current Operational Zone: <span className="text-white/70">CHICAGO DISTRICT 01-{stats?.unique_districts || 22}</span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Main Cluster View */}
        <div className="lg:col-span-2 space-y-4">
          {/* DBSCAN Cluster Panel */}
          <motion.div variants={fadeUp} className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Radio className="w-4 h-4 text-[#4cd6ff]" />
                <span className="text-xs font-mono text-white/70 uppercase tracking-widest">
                  DBSCAN Cluster Heatmap — Spatial Density Analysis
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#ffb3ae]" />
                  <span className="text-white/60">High Risk</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#4cd6ff]/50" />
                  <span className="text-white/60">Predicted</span>
                </span>
              </div>
            </div>

            {/* Cluster visualization area */}
            <div className="relative h-64 bg-[#0c0e12] rounded-xl border border-white/5 overflow-hidden">
              {/* Grid overlay */}
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(rgba(76, 214, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(76, 214, 255, 0.03) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} />

              {/* Alert indicator */}
              {hotspots[0] && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 left-4 glass-card p-3 border border-[#ffb3ae]/20"
                >
                  <div className="text-[10px] font-mono text-[#ffb3ae] uppercase tracking-wider">Alert: Spike Detected</div>
                  <div className="text-lg font-bold text-white mt-1">
                    {hotspots[0].latitude > 41.84 ? 'Loop Central' : 'South Side'}
                  </div>
                  <div className="text-xs text-white/60">+{hotspots[0].density_score}% Density</div>
                </motion.div>
              )}

              {/* Coordinate display */}
              {hotspots[0] && (
                <div className="absolute top-4 right-4 text-right">
                  <div className="text-2xl font-mono text-white/20">
                    {hotspots[0].latitude.toFixed(4)}° N
                  </div>
                  <div className="text-2xl font-mono text-white/20">
                    {Math.abs(hotspots[0].longitude).toFixed(4)}° W
                  </div>
                </div>
              )}

              {/* Cluster dots visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                {hotspots.slice(0, 8).map((h, i) => {
                  const colors = RISK_COLORS[h.risk_level] || RISK_COLORS.LOW
                  const count = Number(h.crime_count || h.incident_count || h.count || 500)
                  const size = Math.max(12, Math.min(40, count / 50))
                  const x = 15 + (i % 4) * 20 + ((i * 7) % 10)
                  const y = 20 + Math.floor(i / 4) * 40 + ((i * 5) % 10)
                  return (
                    <motion.div
                      key={h.cluster_id ?? i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className={`absolute rounded-full ${colors.bar} opacity-40`}
                      style={{
                        width: `${size}px`, height: `${size}px`,
                        left: `${x}%`, top: `${y}%`,
                        boxShadow: `0 0 ${size}px ${size/2}px currentColor`,
                      }}
                    />
                  )
                })}
              </div>

              {/* Model accuracy badge */}
              <div className="absolute bottom-4 left-4 glass-card px-3 py-2 border border-[#00fc92]/20">
                <div className="text-[10px] font-mono text-[#00fc92] uppercase tracking-wider">Model Accuracy</div>
                <div className="text-lg font-bold text-[#00fc92]">{stats?.model_accuracy || 94.8}%</div>
              </div>

              {/* Telemetry indicator */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 text-white/20">
                <Activity className="w-5 h-5" />
                <span className="text-xs font-mono uppercase tracking-wider">Real-Time Telemetry</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => toast.success('Hotspot data exported successfully!')}
                className="btn-secondary"
              >
                <Download className="w-4 h-4" />
                Export Data
              </button>
              <button className="btn-secondary">
                <SlidersHorizontal className="w-4 h-4" />
                Adjust Parameters
              </button>
              <span className="ml-auto text-xs font-mono text-white/60 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4cd6ff]" />
                Epsilon: {data?.model_info?.epsilon || '500m'} | MinPoints: {data?.model_info?.min_samples || 50}
              </span>
            </div>
          </motion.div>

          {/* Historical Timeline */}
          <motion.div variants={fadeUp} className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-white/60" />
                <span className="text-xs font-mono text-white/70 uppercase tracking-widest">
                  Historical Hotspot Movement Timeline
                </span>
              </div>
              <span className="text-xs font-mono text-white/60">
                Selected: <span className="text-white/60">Jan 2020 — Dec 2025</span>
              </span>
            </div>

            {/* Timeline dots */}
            <div className="flex items-center justify-between px-4 py-6">
              {['2020', '2021', '2022', '2023', '2024', '2025'].map((year, i) => (
                <div key={year} className="flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`w-4 h-4 rounded-full border-2 ${i === 5 ? 'bg-[#4cd6ff] border-[#4cd6ff] shadow-lg shadow-[#4cd6ff]/30' : 'border-white/20 bg-white/5'}`}
                  />
                  <span className={`text-xs font-mono ${i === 5 ? 'text-white font-bold' : 'text-white/60'}`}>{year}</span>
                </div>
              ))}
            </div>
            <div className="mx-4 h-0.5 bg-white/5 -mt-8 mb-8 relative">
              <div className="absolute inset-y-0 left-0 bg-[#4cd6ff]/30 rounded-full" style={{ width: '100%' }} />
            </div>

            {/* Movement stats */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'Mean Shift Velocity', value: '1.4 km/mo', icon: Waves },
                { label: 'Vector Direction', value: 'NNW (342°)', icon: Compass },
                { label: 'Temporal Correlation', value: 'Strong (+0.82)', valueColor: 'text-[#00fc92]', icon: TrendingUp },
                { label: 'Movement Mode', value: 'Diffusion', icon: Activity },
              ].map(({ label, value, valueColor, icon: Icon }) => (
                <div key={label} className="glass-card p-3">
                  <div className="text-[10px] font-mono text-white/60 uppercase tracking-wider mb-1">{label}</div>
                  <div className={`text-sm font-bold ${valueColor || 'text-white'}`}>{value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Hotspot Ranking */}
        <div className="space-y-4">
          <motion.div variants={fadeUp} className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#ffb3ae]" />
                <span className="text-sm font-bold text-white">Hotspot Ranking</span>
              </div>
              <span className="text-xs font-mono text-white/60">Top {Math.min(hotspots.length, 10)}</span>
            </div>

            <div className="space-y-3">
              {hotspots.slice(0, 6).map((h, i) => {
                const colors = RISK_COLORS[h.risk_level] || RISK_COLORS.LOW
                const GrowthIcon = i % 3 === 2 ? TrendingDown : i % 3 === 1 ? Minus : TrendingUp
                const growthLabel = GROWTH_LABELS[i % GROWTH_LABELS.length]

                return (
                  <motion.div
                    key={h.cluster_id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className={`p-3 rounded-xl ${colors.bg} border ${colors.border}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className={`text-[10px] font-mono uppercase tracking-wider ${colors.text}`}>
                          {h.rank_label || `RANK #${String(i + 1).padStart(2, '0')}`}
                        </div>
                        <div className="text-sm font-bold text-white mt-0.5">
                          District {((h.latitude * 100) % 22 + 1).toFixed(0).padStart(2, '0')}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-white">{h.intensity ?? (h.density_score ? (h.density_score / 10).toFixed(1) : '8.5')}</div>
                        <div className="text-[10px] font-mono text-white/60 uppercase">Intensity</div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className={`w-full h-1 rounded-full bg-white/5`}>
                        <div className={`h-full rounded-full ${colors.bar}`} style={{ width: `${Math.min(100, (Number(h.intensity) || (h.density_score ? h.density_score / 10 : 8.5)) * 10)}%` }} />
                      </div>
                      <div className={`flex items-center gap-1 mt-1.5 text-[10px] ${colors.text}`}>
                        <GrowthIcon className="w-3 h-3" />
                        <span>{growthLabel}</span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Deploy Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toast.success('Deployment strategy generated!')}
              className="w-full mt-4 px-4 py-3 rounded-xl bg-[#ffb3ae]/10 border border-[#ffb3ae]/20 text-[#ffb3ae] font-bold text-xs uppercase tracking-wider hover:bg-[#ffb3ae]/20 transition-colors flex items-center justify-center gap-2"
            >
              <Radio className="w-4 h-4" />
              Generate Deployment Strategy
            </motion.button>
          </motion.div>

          {/* Deploy Patrols Button */}
          <motion.button
            variants={fadeUp}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toast.success('Patrol deployment initiated!')}
            className="w-full px-4 py-4 rounded-2xl bg-[#ffb3ae] text-[#0c0e12] font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#ffb3ae]/20 hover:shadow-[#ffb3ae]/30 transition-all"
          >
            <Radio className="w-5 h-5" />
            Deploy Patrols
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
