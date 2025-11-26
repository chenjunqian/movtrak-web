import { Link } from 'react-router-dom'

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Navbar */}
      <nav className="container mx-auto p-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-[#59E46E]">Movtrak</Link>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-[#59E46E] transition">Home</Link>
          <Link to="/support" className="hover:text-[#59E46E] transition">Support</Link>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Chinese Version */}
        <h1 className="text-4xl font-bold mb-8 text-[#59E46E]">支持 (Support - Chinese)</h1>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <p className="text-lg">
            最后更新日期：2025年11月26日
          </p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">获得帮助</h2>
            <p>
              需要 Movtrak 的帮助？我们在这里为您提供帮助。
            </p>
          </section>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-white">联系我们</h2>
            <p className="mb-4">
              对于任何问题、错误报告或功能请求，请联系我们的支持团队。
            </p>
            <a href="mailto:contactus@movtrak.app" className="text-[#59E46E] hover:underline">contactus@movtrak.app</a>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">常见问题解答</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-white mb-2">应用程序兼容性</h3>
                <p>Movtrak 专为 iOS 设备设计，支持 iPhone 和 iPad。</p>
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">运动跟踪准确性</h3>
                <p>我们的 AI 算法经过优化的设备上处理，确保最佳性能，而无需云连接。</p>
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">隐私安全</h3>
                <p>Movtrak 所有处理都在设备本地进行，不会上传任何个人数据或视频内容。</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">更多资源</h2>
            <div className="space-y-4">
              <div>
                <Link to="/privacy" className="text-[#59E46E] hover:underline">隐私政策</Link>
                <span className="text-gray-500 mx-4">•</span>
                <Link to="/terms" className="text-[#59E46E] hover:underline">服务条款</Link>
              </div>
              <p>有关更多详细信息，请访问我们的官方网站或联系支持团队。</p>
            </div>
          </section>
        </div>

        <hr className="my-16 border-gray-700" />

        {/* English Version */}
        <h1 className="text-4xl font-bold mb-8 text-[#59E46E]">Support</h1>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <p className="text-lg">
            Last updated: November 26, 2025
          </p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Get Help</h2>
            <p>
              Need help with Movtrak? We're here to assist you.
            </p>
          </section>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-white">Contact Us</h2>
            <p className="mb-4">
              For any issues, bugs, or feature requests, please reach out to our support team.
            </p>
            <a href="mailto:contactus@movtrak.app" className="text-[#59E46E] hover:underline">contactus@movtrak.app</a>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-white mb-2">App Compatibility</h3>
                <p>Movtrak is designed for iOS devices and supports iPhone and iPad.</p>
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">Motion Tracking Accuracy</h3>
                <p>Our AI algorithms are optimized for on-device processing to ensure the best performance without cloud connectivity.</p>
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">Privacy & Security</h3>
                <p>Movtrak processes everything locally on your device and never uploads any personal data or video content.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Additional Resources</h2>
            <div className="space-y-4">
              <div>
                <Link to="/privacy" className="text-[#59E46E] hover:underline">Privacy Policy</Link>
                <span className="text-gray-500 mx-4">•</span>
                <Link to="/terms" className="text-[#59E46E] hover:underline">Terms of Service</Link>
              </div>
              <p>For more details, please visit our official website or contact our support team.</p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-gray-800 mt-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="text-2xl font-bold text-[#59E46E]">Movtrak</span>
            <p className="text-gray-500 mt-2">© {new Date().getFullYear()} Movtrak. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
            <a href="mailto:contactus@movtrak.app" className="text-gray-400 hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
