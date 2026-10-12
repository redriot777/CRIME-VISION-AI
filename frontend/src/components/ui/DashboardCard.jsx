import { motion } from 'framer-motion';

export default function DashboardCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendUp,
  gradient = 'from-blue-500/20 to-indigo-500/20',
  iconColor = 'text-blue-400',
  iconBg = 'bg-blue-500/20',
}) {
  return (
    <motion.div
      className="glass-card p-6 group cursor-default"
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${iconBg} ring-1 ring-white/10`}>
            {Icon && <Icon className={`w-5 h-5 ${iconColor}`} />}
          </div>
          {trend && (
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trendUp ? 'text-emerald-400 bg-emerald-500/20' : 'text-red-400 bg-red-500/20'}`}>
              {trendUp ? '↑' : '↓'} {trend}
            </span>
          )}
        </div>
        <div>
          <p className="text-sm text-white/70 font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
          {subtitle && <p className="text-xs text-white/60 mt-1">{subtitle}</p>}
        </div>
      </div>
    </motion.div>
  );
}
