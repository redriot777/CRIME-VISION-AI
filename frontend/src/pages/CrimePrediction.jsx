import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Brain, Clock, MapPin, Calendar, Compass, ShieldAlert,
  Activity, ArrowRight, Server, AlertTriangle, AlertCircle
} from 'lucide-react'
import { predictCrime } from '../api/crimeApi'
import { useStatistics } from '../hooks/useStatistics'
import { useAnalytics } from '../hooks/useAnalytics'

const stagger = { animate: { transition: { staggerChildren: 0.05 } } }
const fadeUp = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }

const RISK_COLORS = {
  CRITICAL: 'text-[#ff4444] bg-[#ff4444]/10 border-[#ff4444]/30',
  HIGH:     'text-[#ffb3ae] bg-[#ffb3ae]/10 border-[#ffb3ae]/30',
  MEDIUM:   'text-[#ffcc00] bg-[#ffcc00]/10 border-[#ffcc00]/30',
  LOW:      'text-[#00fc92] bg-[#00fc92]/10 border-[#00fc92]/30',
}

export default function CrimePrediction() {
  const { statistics: stats } = useStatistics()
  
  const [formData, setFormData] = useState({
    district: 1,
    hour: 12,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    weekday: 'Mon',
    latitude: 41.8781,
    longitude: -87.6298
  })

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handlePredict = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const data = await predictCrime({
        district: parseInt(formData.district),
        hour: parseInt(formData.hour),
        month: parseInt(formData.month),
        year: parseInt(formData.year),
        weekday: formData.weekday,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude)
      })
      setResult(data)
    } catch (err) {
      setError(err.message || 'Failed to generate prediction')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-[#4cd6ff]/10">
          <Brain className="w-6 h-6 text-[#4cd6ff]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">XGBoost Crime Risk Predictor</h1>
          <p className="text-white/60 text-sm mt-1 font-mono">
            Model Accuracy: {stats?.model_accuracy || '--'}% | Classes: {stats?.unique_crime_types || 32}
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Form */}
        <motion.div variants={fadeUp} className="lg:col-span-5 space-y-4">
          <div className="glass-card p-6 glow-border-primary">
            <h2 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
              <Server className="w-4 h-4 text-[#4cd6ff]" />
              Simulation Parameters
            </h2>

            <form onSubmit={handlePredict} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-white/70 uppercase tracking-wider block">District</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="number" min="1" max="31"
                      className="w-full bg-[#010409] border border-white/10 rounded-lg py-2 pl-9 pr-3 text-white text-sm focus:outline-none focus:border-[#4cd6ff] focus:ring-1 focus:ring-[#4cd6ff] transition-all"
                      value={formData.district}
                      onChange={e => setFormData({ ...formData, district: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-white/70 uppercase tracking-wider block">Hour of Day (0-23)</label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="number" min="0" max="23"
                      className="w-full bg-[#010409] border border-white/10 rounded-lg py-2 pl-9 pr-3 text-white text-sm focus:outline-none focus:border-[#4cd6ff] focus:ring-1 focus:ring-[#4cd6ff] transition-all"
                      value={formData.hour}
                      onChange={e => setFormData({ ...formData, hour: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-white/70 uppercase tracking-wider block">Month (1-12)</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="number" min="1" max="12"
                      className="w-full bg-[#010409] border border-white/10 rounded-lg py-2 pl-9 pr-3 text-white text-sm focus:outline-none focus:border-[#4cd6ff] focus:ring-1 focus:ring-[#4cd6ff] transition-all"
                      value={formData.month}
                      onChange={e => setFormData({ ...formData, month: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-white/70 uppercase tracking-wider block">Day of Week</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      className="w-full bg-[#010409] border border-white/10 rounded-lg py-2 pl-9 pr-3 text-white text-sm focus:outline-none focus:border-[#4cd6ff] focus:ring-1 focus:ring-[#4cd6ff] transition-all appearance-none"
                      value={formData.weekday}
                      onChange={e => setFormData({ ...formData, weekday: e.target.value })}
                    >
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-white/70 uppercase tracking-wider block">Latitude</label>
                  <div className="relative">
                    <Compass className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="number" step="0.0001"
                      className="w-full bg-[#010409] border border-white/10 rounded-lg py-2 pl-9 pr-3 text-white text-sm focus:outline-none focus:border-[#4cd6ff] focus:ring-1 focus:ring-[#4cd6ff] transition-all"
                      value={formData.latitude}
                      onChange={e => setFormData({ ...formData, latitude: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-white/70 uppercase tracking-wider block">Longitude</label>
                  <div className="relative">
                    <Compass className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="number" step="0.0001"
                      className="w-full bg-[#010409] border border-white/10 rounded-lg py-2 pl-9 pr-3 text-white text-sm focus:outline-none focus:border-[#4cd6ff] focus:ring-1 focus:ring-[#4cd6ff] transition-all"
                      value={formData.longitude}
                      onChange={e => setFormData({ ...formData, longitude: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 px-4 py-3 rounded-lg bg-[#4cd6ff] text-[#003543] font-bold text-sm uppercase tracking-wider hover:bg-[#8ee4ff] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(76,214,255,0.3)]"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Activity className="w-5 h-5 animate-spin" />
                    Processing Tensor...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Generate Prediction
                  </span>
                )}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Right: Results Panel */}
        <motion.div variants={fadeUp} className="lg:col-span-7">
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-start gap-3 mb-6">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div>
                <h4 className="font-bold">Prediction Failed</h4>
                <p className="text-sm opacity-80 mt-1">{error}</p>
              </div>
            </div>
          )}

          {result ? (
            <div className="space-y-6">
              {/* Primary Assessment */}
              <div className={`glass-card p-6 border-t-4 ${RISK_COLORS[result.risk_level].replace('text', 'border').split(' ')[2]}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-[10px] font-mono text-white/70 uppercase tracking-wider mb-2">Primary Risk Assessment</h3>
                    <div className="text-4xl font-bold text-white">{result.risk_score} <span className="text-xl text-white/30 font-normal">/100</span></div>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full border text-sm font-bold tracking-wider ${RISK_COLORS[result.risk_level]}`}>
                    {result.risk_level} RISK
                  </div>
                </div>
                
                <div className="mt-6 p-4 rounded-lg bg-[#010409]/50 border border-white/5">
                  <div className="flex gap-3">
                    <AlertTriangle className={`w-5 h-5 shrink-0 ${RISK_COLORS[result.risk_level].split(' ')[0]}`} />
                    <div>
                      <h4 className="font-semibold text-white">AI Recommendation</h4>
                      <p className="text-sm text-white/70 mt-1 leading-relaxed">{result.recommendation}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Crime Type Probabilities */}
              <div className="glass-card p-6">
                <h3 className="text-[10px] font-mono text-white/70 uppercase tracking-wider mb-4">Probability Distribution</h3>
                <div className="space-y-4">
                  {result.top_predictions.map((pred, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-white/90">{pred.crime_type}</span>
                        <span className="font-mono text-[#4cd6ff]">{pred.probability}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${pred.probability}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className={`h-full rounded-full ${i === 0 ? 'bg-[#ffb3ae]' : 'bg-[#4cd6ff]'}`} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] glass-card flex flex-col items-center justify-center text-white/30 border-dashed border-2 border-white/10 p-8 text-center">
              <Brain className="w-16 h-16 mb-4 opacity-20" />
              <h3 className="font-bold text-white/70 mb-2">Awaiting Parameters</h3>
              <p className="text-sm max-w-sm">Enter simulation parameters on the left to generate predictive risk assessment and crime probability distributions.</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
