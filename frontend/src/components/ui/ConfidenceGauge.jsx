import { motion, useSpring, useTransform, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

function AnimatedNumber({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, v => Math.round(v));

  useEffect(() => {
    if (inView) spring.set(value);
  }, [inView, value, spring]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export default function ConfidenceGauge({ score = 0, size = 200, strokeWidth = 14 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(Math.max(score, 0), 100);
  const offset = circumference - (pct / 100) * circumference;

  const getColor = (s) => {
    if (s >= 85) return '#10b981'; // emerald
    if (s >= 65) return '#3b82f6'; // blue
    if (s >= 40) return '#f97316'; // orange
    return '#ef4444';              // red
  };

  const color = getColor(pct);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg]">
          {/* Track */}
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
          />
          {/* Progress */}
          <motion.circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 8px ${color}80)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-white">
            <AnimatedNumber value={pct} />%
          </span>
          <span className="text-xs text-white/40 mt-1 uppercase tracking-widest">Confidence</span>
        </div>
      </div>
      <div className="flex gap-2 text-xs text-white/50">
        <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
          {pct >= 85 ? 'High' : pct >= 65 ? 'Medium' : pct >= 40 ? 'Low' : 'Very Low'} Confidence
        </span>
      </div>
    </div>
  );
}
