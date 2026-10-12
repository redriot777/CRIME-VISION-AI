import { motion } from 'framer-motion';

export default function SkeletonLoader({ className = '', lines = 3 }) {
  return (
    <div className={`animate-pulse space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 rounded-lg bg-white/10 dark:bg-white/5"
          style={{ width: `${85 - i * 10}%` }}
        />
      ))}
    </div>
  );
}

export function CardSkeleton({ className = '' }) {
  return (
    <div className={`glass-card p-6 animate-pulse ${className}`}>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-white/10" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-white/10 rounded-lg w-24" />
          <div className="h-5 bg-white/10 rounded-lg w-16" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-white/10 rounded-lg" />
        <div className="h-3 bg-white/10 rounded-lg w-4/5" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 p-4 glass-card">
          <div className="w-8 h-8 rounded-lg bg-white/10 shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-white/10 rounded w-1/3" />
            <div className="h-3 bg-white/10 rounded w-1/2" />
          </div>
          <div className="w-16 h-6 rounded-full bg-white/10" />
        </div>
      ))}
    </div>
  );
}
