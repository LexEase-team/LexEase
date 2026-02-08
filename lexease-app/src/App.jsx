import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Landing } from './pages/Landing'
import { ReadMode } from './pages/ReadMode'
import { SpeakMode } from './pages/SpeakMode'
import { ListenMode } from './pages/ListenMode'
import { Dashboard } from './pages/Dashboard'
import { TeacherPortal } from './pages/TeacherPortal'
import { Profile } from './pages/Profile'
import { Settings } from './pages/SettingsPage'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/read" element={<ReadMode />} />
          <Route path="/speak" element={<SpeakMode />} />
          <Route path="/listen" element={<ListenMode />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/teacher" element={<TeacherPortal />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          {/* Catch all redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
