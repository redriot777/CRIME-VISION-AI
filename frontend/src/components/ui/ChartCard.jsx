import { motion } from 'framer-motion';

export default function ChartCard({ title, subtitle, children, action }) {
  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="font-semibold text-white">{title}</h3>
          {subtitle && <p className="text-xs text-white/60 mt-0.5">{subtitle}</p>}
        </div>
        {action && action}
      </div>
      {children}
    </motion.div>
  );
}
