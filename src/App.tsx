import { Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage'
import AboutPage from './AboutPage'
import SupportPage from './SupportPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/support" element={<SupportPage />} />
    </Routes>
  )
}

export default App
