import { motion } from 'framer-motion';

export default function EntityCard({ label, value, type }) {
  const colors = {
    person:       'from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-300',
    organization: 'from-indigo-500/20 to-indigo-600/20 border-indigo-500/30 text-indigo-300',
    date:         'from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-300',
    amount:       'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 text-emerald-300',
    location:     'from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-300',
    default:      'from-white/10 to-white/5 border-white/10 text-white/70',
  };

  const colorClass = colors[(type || '').toLowerCase()] || colors.default;

  return (
    <motion.div
      className={`p-3 rounded-xl border bg-gradient-to-br ${colorClass} backdrop-blur-sm`}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <p className="text-[10px] uppercase tracking-widest font-semibold opacity-60 mb-1">{label || type}</p>
      <p className="text-sm font-medium leading-snug">{value}</p>
    </motion.div>
  );
}
