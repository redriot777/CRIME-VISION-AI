import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function JsonNode({ data, depth = 0 }) {
  const [collapsed, setCollapsed] = useState(depth > 1);

  if (data === null) return <span className="text-white/40">null</span>;
  if (typeof data === 'boolean') return <span className="text-orange-400">{String(data)}</span>;
  if (typeof data === 'number') return <span className="text-emerald-400">{data}</span>;
  if (typeof data === 'string') return <span className="text-blue-300">"{data}"</span>;

  const isArray = Array.isArray(data);
  const entries = isArray ? data.map((v, i) => [i, v]) : Object.entries(data);

  if (entries.length === 0) return <span className="text-white/40">{isArray ? '[]' : '{}'}</span>;

  return (
    <span>
      <button
        onClick={() => setCollapsed(c => !c)}
        className="inline-flex items-center text-white/60 hover:text-white transition-colors"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        <span className="text-white/40 ml-0.5">{isArray ? '[' : '{'}</span>
        {collapsed && <span className="text-white/30 ml-1">{entries.length} items</span>}
        {collapsed && <span className="text-white/40 ml-0.5">{isArray ? ']' : '}'}</span>}
      </button>
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="block"
          >
            {entries.map(([k, v]) => (
              <span key={k} className="block" style={{ paddingLeft: `${(depth + 1) * 16}px` }}>
                <span className="text-indigo-400">
                  {isArray ? '' : `"${k}"`}
                </span>
                {!isArray && <span className="text-white/40">: </span>}
                <JsonNode data={v} depth={depth + 1} />
                <span className="text-white/20">,</span>
              </span>
            ))}
            <span style={{ paddingLeft: `${depth * 16}px` }} className="block text-white/40">
              {isArray ? ']' : '}'}
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export default function JsonViewer({ data }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
      >
        <span className="text-sm font-semibold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          Raw JSON Response
        </span>
        <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronRight className="w-4 h-4 text-white/40" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 font-mono text-xs leading-6 text-white/70 bg-black/20 rounded-b-2xl max-h-96 overflow-y-auto">
              <JsonNode data={data} depth={0} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
