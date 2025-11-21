import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Navbar */}
      <nav className="container mx-auto p-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-[#59E46E]">Movtrak</div>
        <div className="hidden md:flex space-x-6">
          <a href="#features" className="hover:text-[#59E46E] transition">Features</a>
          <a href="#how-it-works" className="hover:text-[#59E46E] transition">How It Works</a>
          <Link to="/support" className="hover:text-[#59E46E] transition">Support</Link>
        </div>
        <button className="bg-[#59E46E] text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-[#4bd660] transition">
          Download
        </button>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Your Pocket <span className="text-[#59E46E]">Motion Tracking</span> Camera
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Transform your iPhone into a smart camera that automatically centers and tracks you. Perfect for rock climbing, workouts, and solo content creation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-[#59E46E] text-gray-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-[#4bd660] transition shadow-lg shadow-green-500/20">
              Get for iOS
            </button>
            <button className="border border-gray-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-800 transition">
              Watch Demo
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-72 h-[580px] border-4 border-gray-700 bg-gray-800 rounded-[3rem] shadow-2xl flex items-center justify-center overflow-hidden">
            {/* Placeholder for App Screenshot */}
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-center p-4">
              <div>
                <div className="text-[#59E46E] text-6xl mb-4">📱</div>
                <p className="text-gray-400">App Screenshot Placeholder</p>
              </div>
            </div>
            {/* Notch */}
            <div className="absolute top-0 w-40 h-6 bg-gray-700 rounded-b-xl"></div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="bg-gray-800 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Why Choose <span className="text-[#59E46E]">Movtrak</span>?
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="bg-gray-900 p-8 rounded-2xl hover:transform hover:-translate-y-2 transition duration-300">
              <div className="text-4xl mb-6">🎯</div>
              <h3 className="text-xl font-bold mb-4 text-[#59E46E]">Smart Tracking</h3>
              <p className="text-gray-400">
                Automatically keeps you centered in the frame using advanced AI computer vision. No cameraman needed.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-gray-900 p-8 rounded-2xl hover:transform hover:-translate-y-2 transition duration-300">
              <div className="text-4xl mb-6">🏔️</div>
              <h3 className="text-xl font-bold mb-4 text-[#59E46E]">Built for Action</h3>
              <p className="text-gray-400">
                Ideal for dynamic sports like rock climbing, running, and home workouts where you need to move freely.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-gray-900 p-8 rounded-2xl hover:transform hover:-translate-y-2 transition duration-300">
              <div className="text-4xl mb-6">🎬</div>
              <h3 className="text-xl font-bold mb-4 text-[#59E46E]">Pro Quality</h3>
              <p className="text-gray-400">
                Record stable, high-quality video with smooth tracking movements that look professional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>
        <div className="max-w-4xl mx-auto">
          {[
            { step: 1, title: "Open the App", desc: "Launch Movtrak on your iOS device." },
            { step: 2, title: "Frame Subject", desc: "Position camera towards yourself or the activity." },
            { step: 3, title: "Start Tracking", desc: "Tap record - AI automatically detects and centers you." },
            { step: 4, title: "Move Freely", desc: "Go ahead! The camera follows your movement." },
            { step: 5, title: "Save & Share", desc: "Stop recording and export your perfectly framed video." }
          ].map((item) => (
            <div key={item.step} className="flex mb-8 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#59E46E] rounded-full flex items-center justify-center text-gray-900 font-bold text-xl mr-6">
                {item.step}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-gray-800">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="text-2xl font-bold text-[#59E46E]">Movtrak</span>
            <p className="text-gray-500 mt-2">© 2025 Movtrak. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
