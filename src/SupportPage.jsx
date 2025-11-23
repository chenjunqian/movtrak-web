import React from 'react'
import { Link } from 'react-router-dom'

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="text-[#59E46E] mb-8 inline-block hover:underline">← Back to Home</Link>
        <h1 className="text-3xl font-bold mb-6">Support</h1>
        <p className="text-gray-300 mb-4">
          Need help with Movtrak? We're here to assist you.
        </p>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-400 mb-4">
            For any issues, bugs, or feature requests, please reach out to our support team.
          </p>
          <a href="mailto:contactus@movtrak.app" className="text-[#59E46E] hover:underline">contactus@movtrak.app</a>
        </div>
      </div>
    </div>
  )
}
