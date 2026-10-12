import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { Toaster } from 'sonner'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import CrimeMap from './pages/CrimeMap'
import CrimePrediction from './pages/CrimePrediction'
import HotspotDetection from './pages/HotspotDetection'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import PatrolOptimization from './pages/PatrolOptimization'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import PageLayout from './components/layout/PageLayout'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Toaster richColors position="top-right" theme="dark" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PageLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/map" element={<CrimeMap />} />
              <Route path="/crime-map" element={<CrimeMap />} />
              <Route path="/prediction" element={<CrimePrediction />} />
              <Route path="/hotspots" element={<HotspotDetection />} />
              <Route path="/patrol" element={<PatrolOptimization />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}
