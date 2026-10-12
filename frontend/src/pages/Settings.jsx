import { motion } from 'framer-motion'
import { Server, Database, Shield, Brain, Activity, RotateCw, Save } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getModelInfo } from '../api/crimeApi'

const stagger = { animate: { transition: { staggerChildren: 0.05 } } }
const fadeUp = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }

export default function Settings() {
  const [modelInfo, setModelInfo] = useState(null)
  
  useEffect(() => {
    getModelInfo().then(setModelInfo).catch(console.error)
  }, [])

  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="max-w-4xl mx-auto space-y-6">
      <motion.div variants={fadeUp} className="mb-8">
        <h1 className="text-2xl font-bold text-white">System Settings</h1>
        <p className="text-white/60 text-sm mt-1">Configure ML models, data sources, and system preferences</p>
      </motion.div>

      {/* Model Status */}
      <motion.div variants={fadeUp} className="glass-card p-6">
        <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Brain className="w-4 h-4 text-[#4cd6ff]" />
          Machine Learning Models
        </h2>
        
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00fc92] animate-pulse" />
                <h3 className="font-semibold text-white">XGBoost Predictive Model</h3>
              </div>
              <p className="text-xs text-white/60 mt-1 font-mono">
                Accuracy: {modelInfo?.accuracy || '--'}% | Trained on: {modelInfo?.n_training_samples?.toLocaleString() || '--'} records
              </p>
            </div>
            <button className="btn-secondary text-xs py-1.5">Retrain</button>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00fc92] animate-pulse" />
                <h3 className="font-semibold text-white">DBSCAN Hotspot Engine</h3>
              </div>
              <p className="text-xs text-white/60 mt-1 font-mono">
                Epsilon: 500m | MinPts: 50 | Metric: Haversine
              </p>
            </div>
            <button className="btn-secondary text-xs py-1.5">Adjust Parameters</button>
          </div>
        </div>
      </motion.div>

      {/* Database Status */}
      <motion.div variants={fadeUp} className="glass-card p-6">
        <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Database className="w-4 h-4 text-[#a78bfa]" />
          Data Source
        </h2>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-xl bg-white/5">
            <span className="text-white/60 font-mono text-[10px] uppercase block mb-1">Active Dataset</span>
            <span className="font-semibold text-white truncate block">crime_ml_dataset.csv</span>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <span className="text-white/60 font-mono text-[10px] uppercase block mb-1">Record Count</span>
            <span className="font-semibold text-white">1,391,466</span>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <span className="text-white/60 font-mono text-[10px] uppercase block mb-1">Time Range</span>
            <span className="font-semibold text-white">2020 — 2025</span>
          </div>
          <div className="p-4 rounded-xl bg-white/5">
            <span className="text-white/60 font-mono text-[10px] uppercase block mb-1">Last Sync</span>
            <span className="font-semibold text-white">Today, 08:00 AM</span>
          </div>
        </div>
        
        <button className="w-full mt-4 btn-secondary flex justify-center py-2">
          <RotateCw className="w-4 h-4 mr-2" /> Sync Latest Records
        </button>
      </motion.div>

      {/* Preferences */}
      <motion.div variants={fadeUp} className="glass-card p-6">
        <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#f97316]" />
          System Preferences
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-white text-sm">Real-time Telemetry</div>
              <div className="text-xs text-white/60">Stream live crime events to the map</div>
            </div>
            <div className="w-10 h-6 bg-[#4cd6ff] rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 bg-white w-4 h-4 rounded-full" />
            </div>
          </div>
          <hr className="border-white/5" />
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-white text-sm">Auto-dispatch Recommendations</div>
              <div className="text-xs text-white/60">Automatically prompt dispatch for CRITICAL hotspots</div>
            </div>
            <div className="w-10 h-6 bg-white/10 rounded-full relative cursor-pointer">
              <div className="absolute left-1 top-1 bg-white/50 w-4 h-4 rounded-full" />
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button className="btn-primary">
            <Save className="w-4 h-4" /> Save Preferences
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
