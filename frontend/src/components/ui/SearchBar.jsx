import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SearchBar({ placeholder = 'Search...', value, onChange, onClear, className = '' }) {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      className={`relative ${className}`}
      animate={{ scale: focused ? 1.01 : 1 }}
      transition={{ duration: 0.15 }}
    >
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={e => onChange && onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all"
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </motion.div>
  );
}
