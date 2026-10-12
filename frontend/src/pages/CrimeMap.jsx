import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  ShieldAlert, Activity, Clock, AlertTriangle, Target, Radio,
  Layers, Filter, ZoomIn, ZoomOut, Crosshair, Brain
} from 'lucide-react'
import { useStatistics } from '../hooks/useStatistics'
import { useHotspots } from '../hooks/useHotspots'
import { getMapPoints } from '../api/crimeApi'

const CHICAGO_CENTER = [41.8781, -87.6298]

const RISK_COLORS = {
  CRITICAL: '#ff4444',
  HIGH: '#ff8844',
  MEDIUM: '#ffcc00',
  LOW: '#00fc92',
}

export default function CrimeMap() {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapPoints, setMapPoints] = useState([])
  const [selectedHotspot, setSelectedHotspot] = useState(null)
  const { statistics: stats } = useStatistics()
  const { hotspots: hotspotsData } = useHotspots()
  const hotspots = hotspotsData?.hotspots || []

  // Load Leaflet dynamically
  useEffect(() => {
    if (mapInstance.current) return

    const loadLeaflet = async () => {
      // Add Leaflet CSS
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        document.head.appendChild(link)
      }

      // Load Leaflet JS
      if (!window.L) {
        await new Promise((resolve) => {
          const script = document.createElement('script')
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
          script.onload = resolve
          document.head.appendChild(script)
        })
      }

      // Load Leaflet.heat plugin
      if (!window.L.heatLayer) {
        await new Promise((resolve) => {
          const script = document.createElement('script')
          script.src = 'https://unpkg.com/leaflet.heat@0.2.0/dist/leaflet-heat.js'
          script.onload = resolve
          document.head.appendChild(script)
        })
      }

      // Initialize map
      const L = window.L
      const map = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
      }).setView(CHICAGO_CENTER, 11)

      // Dark tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(map)

      mapInstance.current = map

      // Fetch map points for heatmap
      try {
        const data = await getMapPoints()
        if (data.points) {
          setMapPoints(data.points)

          // Add heatmap layer
          const heatPoints = data.points.map(p => [p.lat, p.lng, p.cluster === -1 ? 0.3 : 0.8])
          L.heatLayer(heatPoints, {
            radius: 18,
            blur: 25,
            maxZoom: 15,
            gradient: {
              0.2: '#0a0c10',
              0.4: '#003543',
              0.5: '#004e60',
              0.7: '#4cd6ff',
              0.85: '#ffb3ae',
              1.0: '#ff4444'
            }
          }).addTo(map)
        }
      } catch (err) {
        console.warn('Could not load map points:', err)
      }

      setMapLoaded(true)
    }

    loadLeaflet()

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }
    }
  }, [])

  // Add hotspot markers when hotspots load
  useEffect(() => {
    if (!mapInstance.current || !window.L || hotspots.length === 0) return

    const L = window.L
    hotspots.forEach((h, i) => {
      const color = RISK_COLORS[h.risk_level] || RISK_COLORS.LOW

      // Diamond-shaped marker using DivIcon
      const icon = L.divIcon({
        html: `<div style="
          width: 16px; height: 16px;
          background: ${color};
          transform: rotate(45deg);
          border: 2px solid rgba(255,255,255,0.3);
          box-shadow: 0 0 12px ${color}88;
          cursor: pointer;
        "></div>`,
        className: '',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      })

      const marker = L.marker([h.latitude, h.longitude], { icon }).addTo(mapInstance.current)

      marker.bindPopup(`
        <div style="background:#1a1c20;color:#e2e2e8;padding:12px;border-radius:8px;min-width:200px;font-family:Inter,sans-serif;">
          <div style="font-size:10px;color:#859399;text-transform:uppercase;letter-spacing:0.05em;font-family:'JetBrains Mono',monospace;">
            ${h.rank_label || `Cluster ${h.cluster_id}`}
          </div>
          <div style="font-size:16px;font-weight:700;margin:4px 0;">${h.latitude.toFixed(4)}° N, ${Math.abs(h.longitude).toFixed(4)}° W</div>
          <div style="display:flex;gap:8px;margin-top:8px;">
            <span style="background:${color}22;color:${color};padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600;">${h.risk_level}</span>
            <span style="color:#859399;font-size:11px;">${h.crime_count} incidents</span>
          </div>
          <div style="margin-top:8px;font-size:11px;color:#859399;">Density: ${h.density_score}% | Intensity: ${h.intensity}</div>
        </div>
      `, {
        className: 'crime-popup',
        closeButton: false,
      })

      marker.on('click', () => setSelectedHotspot(h))
    })
  }, [hotspots, mapLoaded])

  const handleZoom = (dir) => {
    if (mapInstance.current) {
      dir === 'in' ? mapInstance.current.zoomIn() : mapInstance.current.zoomOut()
    }
  }

  const handleRecenter = () => {
    if (mapInstance.current) mapInstance.current.setView(CHICAGO_CENTER, 11)
  }

  return (
    <div className="relative h-[calc(100vh-3.5rem)] -m-6 overflow-hidden">
      {/* Map Container */}
      <div ref={mapRef} className="absolute inset-0 z-0" style={{ background: '#0a0c10' }} />

      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button onClick={() => handleZoom('in')} className="glass-card p-2 hover:bg-white/10 transition-colors" title="Zoom In">
          <ZoomIn className="w-4 h-4 text-white/70" />
        </button>
        <button onClick={() => handleZoom('out')} className="glass-card p-2 hover:bg-white/10 transition-colors" title="Zoom Out">
          <ZoomOut className="w-4 h-4 text-white/70" />
        </button>
        <button onClick={handleRecenter} className="glass-card p-2 hover:bg-white/10 transition-colors" title="Recenter">
          <Crosshair className="w-4 h-4 text-white/70" />
        </button>
      </div>

      {/* Left Panel — Risk Assessment */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-4 left-4 z-10 w-72 space-y-3"
      >
        {/* AI Risk Assessment Header */}
        <div className="glass-card p-1 text-center">
          <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">AI Risk Assessment</span>
        </div>

        {/* Risk Score */}
        <div className="glass-card p-4 glow-border-secondary">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-white/70 uppercase tracking-wider">Current Risk Score</span>
            <div className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center">
              <Activity className="w-4 h-4 text-white/60" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white font-mono">{stats?.hotspots ? Math.min(78 + stats.hotspots, 99) : 78}</span>
            <span className="text-sm font-semibold text-[#ffb3ae]">HIGH</span>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-white/70 font-mono uppercase tracking-wider">Active Hotspots</span>
              <span className="text-[#4cd6ff] font-bold">{stats?.hotspots || hotspots.length}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5">
              <div className="bg-[#4cd6ff] h-1.5 rounded-full transition-all" style={{ width: `${Math.min((hotspots.length / 20) * 100, 100)}%` }} />
            </div>

            <div className="flex justify-between text-xs mt-2">
              <span className="text-white/70 font-mono uppercase tracking-wider">Response Time Avg</span>
              <span className="text-[#00fc92] font-bold">4.2m</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5">
              <div className="bg-[#00fc92] h-1.5 rounded-full" style={{ width: '72%' }} />
            </div>
          </div>
        </div>

        {/* Sector Escalation */}
        {hotspots[0] && (
          <div className="glass-card p-4 border-l-2 border-[#ffb3ae] glow-border-secondary">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-[#ffb3ae]" />
              <span className="text-xs font-bold text-[#ffb3ae] uppercase tracking-wider">Sector Escalation</span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              Cluster of unusual activity detected near ({hotspots[0].latitude.toFixed(3)}, {hotspots[0].longitude.toFixed(3)}).
              {hotspots[0].crime_count} incidents in detection zone. {hotspots[0].density_score}% density score.
            </p>
          </div>
        )}
      </motion.div>

      {/* Bottom Bar — Live Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-4 left-4 right-80 z-10"
      >
        <div className="glass-card px-4 py-2.5 flex items-center gap-4">
          <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff4444]/20 border border-[#ff4444]/30">
            <span className="w-2 h-2 rounded-full bg-[#ff4444] animate-pulse" />
            <span className="text-xs font-bold text-[#ff4444] uppercase tracking-wider">Live Feed</span>
          </span>
          <span className="text-xs font-mono text-white/60">
            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span className="text-xs text-white/60 truncate">
            District {stats?.highest_risk_district || 8}: Active monitoring — {stats?.total_crimes?.toLocaleString() || '1.39M'} records analyzed
          </span>
        </div>
      </motion.div>

      {/* Right Panel — AI Recommendation */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-4 right-4 z-10 w-72"
      >
        <div className="glass-card p-4 glow-border-primary">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="w-4 h-4 text-[#4cd6ff]" />
            <span className="text-xs font-bold text-[#4cd6ff] uppercase tracking-wider font-mono">AI Recommendation</span>
          </div>
          <p className="text-xs text-white/70 leading-relaxed mb-3">
            <strong className="text-white/90">Priority Optimization:</strong> Redirect patrol units to {
              hotspots[0] ? `Sector near District ${selectedHotspot?.cluster_id || hotspots[0].cluster_id}` : 'high-risk sectors'
            } for Hotspot Mitigation.
          </p>
          <div className="flex gap-2">
            <button className="flex-1 px-3 py-2 rounded-lg bg-[#4cd6ff]/10 border border-[#4cd6ff]/30 text-[#4cd6ff] text-xs font-bold uppercase tracking-wider hover:bg-[#4cd6ff]/20 transition-colors">
              Accept & Dispatch
            </button>
            <button className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 text-xs font-semibold hover:bg-white/10 transition-colors">
              Ignore
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
