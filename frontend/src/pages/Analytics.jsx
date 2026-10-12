import { motion } from 'framer-motion'
import {
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts'
import { Activity, BarChart3, TrendingUp, Calendar, MapPin } from 'lucide-react'
import { useAnalytics } from '../hooks/useAnalytics'
import { useStatistics } from '../hooks/useStatistics'
import ChartCard from '../components/ui/ChartCard'

const COLORS = ['#4cd6ff', '#ffb3ae', '#00fc92', '#f97316', '#a78bfa', '#f472b6', '#38bdf8', '#fbbf24']

const CUSTOM_TOOLTIP = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card px-3 py-2 text-xs border border-white/10">
      <p className="text-white/50 mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} className="font-semibold" style={{ color: p.color || p.fill }}>
          {p.name}: {p.value?.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

const stagger = { animate: { transition: { staggerChildren: 0.05 } } }
const fadeUp = { initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 } }

export default function Analytics() {
  const { analytics, loading } = useAnalytics()
  const { statistics: stats } = useStatistics()

  if (loading || !analytics) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="h-8 w-64 bg-white/5 rounded animate-pulse mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="h-[400px] bg-white/5 rounded-xl animate-pulse" />)}
        </div>
      </div>
    )
  }

  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-[#00fc92]/10">
          <BarChart3 className="w-6 h-6 text-[#00fc92]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Comprehensive Intelligence Analytics</h1>
          <p className="text-white/60 text-sm mt-1 font-mono">
            Analyzed Records: {stats?.total_crimes?.toLocaleString() || '--'} | Temporal Range: 2020-2025
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend (Area) */}
        <motion.div variants={fadeUp}>
          <ChartCard title="Monthly Crime Volume" subtitle="Aggregate across all years" icon={Calendar}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analytics.monthly_pattern}>
                <defs>
                  <linearGradient id="colorMonth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4cd6ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4cd6ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
                <Tooltip content={<CUSTOM_TOOLTIP />} />
                <Area type="monotone" dataKey="count" name="Incidents" stroke="#4cd6ff" fillOpacity={1} fill="url(#colorMonth)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>

        {/* Day of Week (Bar) */}
        <motion.div variants={fadeUp}>
          <ChartCard title="Day of Week Distribution" subtitle="Crime frequency by weekday" icon={Activity}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.weekday_pattern}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="weekday" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
                <Tooltip content={<CUSTOM_TOOLTIP />} />
                <Bar dataKey="count" name="Incidents" fill="#a78bfa" radius={[4, 4, 0, 0]}>
                  {analytics.weekday_pattern.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.weekday === 'Fri' || entry.weekday === 'Sat' ? '#ffb3ae' : '#a78bfa'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>

        {/* District Risk Profile (Radar) */}
        <motion.div variants={fadeUp} className="lg:col-span-2">
          <ChartCard title="Top Locations by Crime Volume" subtitle="Where crimes occur most frequently" icon={MapPin}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.location_analysis} layout="vertical" margin={{ left: 80 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
                <YAxis type="category" dataKey="location" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CUSTOM_TOOLTIP />} />
                <Bar dataKey="count" name="Incidents" fill="#00fc92" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>

      </div>
    </motion.div>
  )
}
