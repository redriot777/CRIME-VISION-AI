const RISK_STYLES = {
  high:    { bg: 'bg-red-500/20',     border: 'border-red-500/30',    text: 'text-red-400',    dot: 'bg-red-400'    },
  medium:  { bg: 'bg-orange-500/20',  border: 'border-orange-500/30', text: 'text-orange-400', dot: 'bg-orange-400' },
  low:     { bg: 'bg-emerald-500/20', border: 'border-emerald-500/30',text: 'text-emerald-400',dot: 'bg-emerald-400' },
  pending: { bg: 'bg-blue-500/20',    border: 'border-blue-500/30',   text: 'text-blue-400',   dot: 'bg-blue-400'   },
  success: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/30',text: 'text-emerald-400',dot: 'bg-emerald-400' },
  error:   { bg: 'bg-red-500/20',     border: 'border-red-500/30',    text: 'text-red-400',    dot: 'bg-red-400'    },
  info:    { bg: 'bg-indigo-500/20',  border: 'border-indigo-500/30', text: 'text-indigo-400', dot: 'bg-indigo-400' },
};

export default function StatusBadge({ status = 'info', label, dot = true, size = 'sm' }) {
  const key = (status || '').toLowerCase();
  const s = RISK_STYLES[key] || RISK_STYLES.info;
  const sz = size === 'lg' ? 'px-4 py-1.5 text-sm' : 'px-2.5 py-0.5 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${sz} ${s.bg} ${s.border} ${s.text}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />}
      {label || status}
    </span>
  );
}
