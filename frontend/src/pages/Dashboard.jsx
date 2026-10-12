import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ShieldAlert, MapPin, TrendingUp, Clock, Target, Siren,
  Map, Brain, BarChart3, ArrowRight, Activity, Crosshair
} from 'lucide-react'
import {
  AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts'
import { useStatistics } from '../hooks/useStatistics'
import { useAnalytics } from '../hooks/useAnalytics'
import DashboardCard from '../components/ui/DashboardCard'
import ChartCard from '../components/ui/ChartCard'
import { CardSkeleton } from '../components/ui/SkeletonLoader'

const COLORS = ['#4cd6ff', '#ffb3ae', '#00fc92', '#f97316', '#a78bfa', '#f472b6', '#38bdf8', '#fbbf24', '#34d399', '#fb923c']

const CUSTOM_TOOLTIP = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card px-3 py-2 text-xs border border-white/10">
      <p className="text-white/50 mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} className="font-semibold" style={{ color: p.color }}>{p.name}: {p.value?.toLocaleString()}</p>
      ))}
    </div>
  )
}

const stagger = {
  animate: { transition: { staggerChildren: 0.07 } }
}
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } }
}

export default function Dashboard() {
  const { statistics: stats, loading: statsLoading } = useStatistics()
  const { analytics, loading: analyticsLoading } = useAnalytics()
  const navigate = useNavigate()

  const loading = statsLoading || analyticsLoading

  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Command Overview</h1>
          <p className="text-white/60 text-sm mt-0.5">AI-powered crime intelligence dashboard — Chicago Metro</p>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/crime-map')}
            className="btn-primary"
          >
            <Map className="w-4 h-4" />
            Live Crime Map
          </motion.button>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {loading ? Array(6).fill(0).map((_, i) => <CardSkeleton key={i} />) : <>
          <DashboardCard title="Crimes Analyzed" value={stats?.total_crimes?.toLocaleString() || '—'} icon={ShieldAlert}
            iconBg="bg-blue-500/20" iconColor="text-blue-400"
            gradient="from-blue-500/20 to-blue-600/10" subtitle="Total dataset" />
          <DashboardCard title="Active Hotspots" value={stats?.hotspots || '—'} icon={Target}
            iconBg="bg-red-500/20" iconColor="text-red-400"
            gradient="from-red-500/20 to-red-600/10" subtitle="DBSCAN clusters"
            trend="AI Detected" trendUp={false} />
          <DashboardCard title="Top Crime" value={stats?.highest_crime || '—'} icon={Siren}
            iconBg="bg-orange-500/20" iconColor="text-orange-400"
            gradient="from-orange-500/20 to-orange-600/10" subtitle={`${stats?.highest_crime_count?.toLocaleString() || ''} cases`} />
          <DashboardCard title="Peak Hour" value={stats?.peak_hour !== undefined ? `${stats.peak_hour}:00` : '—'} icon={Clock}
            iconBg="bg-indigo-500/20" iconColor="text-indigo-400"
            gradient="from-indigo-500/20 to-indigo-600/10" subtitle="Highest activity" />
          <DashboardCard title="Model Accuracy" value={stats?.model_accuracy ? `${stats.model_accuracy}%` : '—'} icon={Brain}
            iconBg="bg-emerald-500/20" iconColor="text-emerald-400"
            gradient="from-emerald-500/20 to-emerald-600/10" subtitle="XGBoost model" />
          <DashboardCard title="Arrest Rate" value={stats?.arrest_rate ? `${stats.arrest_rate}%` : '—'} icon={Crosshair}
            iconBg="bg-purple-500/20" iconColor="text-purple-400"
            gradient="from-purple-500/20 to-purple-600/10" subtitle="Overall rate" />
        </>}
      </motion.div>

      {/* Charts Row 1 */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Crime Trend Over Years */}
        <ChartCard title="Crime Trend Over Years" subtitle="Annual crime volume" className="lg:col-span-2">
          {analytics?.yearly_trends?.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={analytics.yearly_trends}>
                <defs>
                  <linearGradient id="grad-trend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4cd6ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4cd6ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="year" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
                <Tooltip content={<CUSTOM_TOOLTIP />} />
                <Area type="monotone" dataKey="count" name="Crimes" stroke="#4cd6ff" strokeWidth={2} fill="url(#grad-trend)" dot={{ fill: '#4cd6ff', r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex items-center justify-center text-white/60 text-sm">Loading trend data...</div>
          )}
        </ChartCard>

        {/* Crime Category Distribution */}
        <ChartCard title="Crime Types" subtitle="Top categories">
          {analytics?.crime_distribution?.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={analytics.crime_distribution.slice(0, 8)} cx="50%" cy="50%" innerRadius={50} outerRadius={78}
                  dataKey="count" nameKey="type" stroke="none">
                  {analytics.crime_distribution.slice(0, 8).map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip content={<CUSTOM_TOOLTIP />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex items-center justify-center text-white/60 text-sm">Loading...</div>
          )}
          <div className="flex flex-wrap gap-2 mt-1">
            {analytics?.crime_distribution?.slice(0, 4).map((d, i) => (
              <span key={i} className="flex items-center gap-1 text-xs text-white/50">
                <span className="w-2 h-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                {d.type}
              </span>
            ))}
          </div>
        </ChartCard>
      </motion.div>

      {/* Charts Row 2 */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Hourly Crime Pattern */}
        <ChartCard title="Hourly Crime Pattern" subtitle="Crime distribution by hour of day">
          {analytics?.hourly_pattern?.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={analytics.hourly_pattern} barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="hour" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
                <Tooltip content={<CUSTOM_TOOLTIP />} />
                <Bar dataKey="count" name="Crimes" radius={[3, 3, 0, 0]}>
                  {analytics.hourly_pattern.map((d, i) => (
                    <Cell key={i} fill={d.hour >= 18 || d.hour <= 5 ? '#ffb3ae' : '#4cd6ff'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex items-center justify-center text-white/60 text-sm">Loading...</div>
          )}
        </ChartCard>

        {/* District Comparison */}
        <ChartCard title="District Comparison" subtitle="Top 15 districts by crime volume">
          {analytics?.district_comparison?.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={analytics.district_comparison} barSize={18} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="district" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `D${v}`} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
                <Tooltip content={<CUSTOM_TOOLTIP />} />
                <Bar dataKey="count" name="Crimes" fill="#a78bfa" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex items-center justify-center text-white/60 text-sm">Loading...</div>
          )}
        </ChartCard>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={fadeUp}>
        <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Live Crime Map',      icon: Map,       to: '/crime-map', color: 'blue' },
            { label: 'Hotspot Detection',   icon: Target,    to: '/hotspots',  color: 'red' },
            { label: 'Predict Crime Risk',  icon: Brain,     to: '/prediction', color: 'indigo' },
            { label: 'Patrol Strategy',     icon: Crosshair, to: '/patrol',    color: 'emerald' },
          ].map(({ label, icon: Icon, to, color }) => (
            <motion.button key={to} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => navigate(to)}
              className="glass-card p-4 flex items-center gap-3 text-left w-full group"
            >
              <div className={`p-2.5 rounded-xl bg-${color}-500/20 group-hover:bg-${color}-500/30 transition-colors`}>
                <Icon className={`w-4 h-4 text-${color}-400`} />
              </div>
              <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{label}</span>
              <ArrowRight className="w-4 h-4 text-white/20 ml-auto group-hover:text-white/50 transition-colors" />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
