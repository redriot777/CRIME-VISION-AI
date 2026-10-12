import { motion } from 'framer-motion'
import { FileText, Download, Filter, Search, Calendar, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

const stagger = { animate: { transition: { staggerChildren: 0.05 } } }
const fadeUp = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }

const REPORTS = [
  { id: 'REP-2025-01', type: 'Hotspot Analysis', district: 'District 08', date: '2025-10-24', status: 'Generated' },
  { id: 'REP-2025-02', type: 'Predictive Risk', district: 'Chicago Metro', date: '2025-10-23', status: 'Generated' },
  { id: 'REP-2025-03', type: 'Patrol Efficiency', district: 'District 01', date: '2025-10-20', status: 'Archived' },
  { id: 'REP-2025-04', type: 'Crime Trend YTD', district: 'Chicago Metro', date: '2025-10-15', status: 'Generated' },
  { id: 'REP-2025-05', type: 'Sector Escalation', district: 'District 11', date: '2025-10-12', status: 'Archived' },
]

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Intelligence Reports</h1>
          <p className="text-white/60 text-sm mt-1">Exported analysis and predictive models</p>
        </div>
        
        <div className="flex gap-3">
          <button className="btn-secondary">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="btn-primary">
            <FileText className="w-4 h-4" /> Generate New
          </button>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div variants={fadeUp} className="flex gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-white/60 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search report ID, type, or district..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#4cd6ff] transition-colors"
          />
        </div>
      </motion.div>

      {/* List */}
      <motion.div variants={fadeUp} className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-[10px] font-mono text-white/50 uppercase tracking-wider">
                <th className="p-4 font-medium">Report ID</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Scope</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {REPORTS.filter(r => r.type.toLowerCase().includes(searchTerm.toLowerCase()) || r.id.toLowerCase().includes(searchTerm.toLowerCase())).map((report, i) => (
                <tr key={report.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4">
                    <span className="text-sm font-mono font-medium text-[#4cd6ff]">{report.id}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-medium text-white">{report.type}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-xs text-white/60">
                      <MapPin className="w-3.5 h-3.5" />
                      {report.district}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-xs text-white/60">
                      <Calendar className="w-3.5 h-3.5" />
                      {report.date}
                    </div>
                  </td>
                  <td className="p-4">
                    {report.status === 'Generated' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#00fc92]/10 text-[#00fc92] text-[10px] font-mono uppercase">
                        <CheckCircle2 className="w-3 h-3" /> Ready
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white/5 text-white/60 text-[10px] font-mono uppercase">
                        Archived
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-[#4cd6ff] hover:bg-[#4cd6ff]/10 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  )
}
