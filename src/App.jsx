import { Routes, Route, Link } from 'react-router-dom'
import LandingPage from './LandingPage'

function About() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-green-600">About Page</h1>
      <p className="text-gray-700">This is the about page.</p>
    </div>
  )
}

function Support() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="text-[#59E46E] mb-8 inline-block hover:underline">← Back to Home</Link>
        <h1 className="text-3xl font-bold mb-6">Support</h1>
        <p className="text-gray-300 mb-4">
          Need help with MovTrak? We're here to assist you.
        </p>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-400 mb-4">
            For any issues, bugs, or feature requests, please reach out to our support team.
          </p>
          <a href="mailto:support@movtrak.app" className="text-[#59E46E] hover:underline">support@movtrak.app</a>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/support" element={<Support />} />
    </Routes>
  )
}

export default App