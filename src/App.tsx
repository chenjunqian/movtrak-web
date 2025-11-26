import { Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage'
import AboutPage from './AboutPage'
import SupportPage from './SupportPage'
import PrivacyPolicyPage from './PrivacyPolicyPage'
import TermsOfServicePage from './TermsOfServicePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsOfServicePage />} />
    </Routes>
  )
}

export default App
