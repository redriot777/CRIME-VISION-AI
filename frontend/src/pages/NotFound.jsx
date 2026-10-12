import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-app"
      style={{ background: 'radial-gradient(circle at center, rgba(99,102,241,0.08) 0%, transparent 60%), #0c0e1a' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md space-y-6"
      >
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/25 flex items-center justify-center mx-auto text-red-400 shadow-lg shadow-red-500/5">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-black text-white leading-none">404</h1>
          <h2 className="text-xl font-bold text-white">Route not found</h2>
          <p className="text-sm text-white/40 leading-relaxed max-w-xs mx-auto">
            The page you are trying to access does not exist or has been moved.
          </p>
        </div>

        <div className="pt-2">
          <button 
            onClick={() => navigate('/dashboard')}
            className="btn-primary"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
