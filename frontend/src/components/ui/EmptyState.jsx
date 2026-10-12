import { motion } from 'framer-motion';

export default function EmptyState({ icon: Icon, title, description, action, actionLabel }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      {Icon && (
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-white/10 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/10">
          <Icon className="w-9 h-9 text-blue-400" />
        </div>
      )}
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      {description && <p className="text-white/50 max-w-sm text-sm leading-relaxed mb-6">{description}</p>}
      {action && (
        <button
          onClick={action}
          className="btn-primary"
        >
          {actionLabel || 'Get Started'}
        </button>
      )}
    </motion.div>
  );
}
