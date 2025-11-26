import { Link } from 'react-router-dom'

export default function PrivacyPolicyPage() {
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
        <h1 className="text-4xl font-bold mb-8 text-[#59E46E]">隐私政策 (Privacy Policy - Chinese)</h1>
        
        <div className="space-y-8 text-gray-300 leading-relaxed">
          <p className="text-lg">
            最后更新日期：2025年11月26日
          </p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. 概览</h2>
            <p>
              Movtrak（以下简称“我们”）尊重您的隐私。本隐私政策说明了当您使用我们的 Movtrak iOS 应用程序时，我们要如何处理您的信息。
              <br /><br />
              <strong>简而言之：</strong> 我们不收集、存储或分享您的个人数据。Movtrak 旨在完全在您的设备上本地处理所有数据。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. 数据收集与使用</h2>
            <p>
              Movtrak 不会收集、传输或在外部服务器上存储任何个人身份信息 (PII) 或使用数据。
            </p>
            <ul className="list-disc list-inside mt-4 ml-4 space-y-2">
              <li>我们没有用户数据库。</li>
              <li>我们不跟踪您的位置（除了相机使用所需的系统权限外，我们不会记录）。</li>
              <li>我们不使用第三方分析服务来跟踪用户行为。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. 设备权限</h2>
            <p>
              为了正常运行，Movtrak 需要访问您设备上的某些功能。以下是我们请求这些权限的原因：
            </p>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="font-bold text-white">相机 (Camera)</h3>
                <p>仅用于实时拍摄视频和跟踪主体。所有图像处理都直接在您的 iPhone 处理器上进行。没有任何视频流会被发送到云端。</p>
              </div>
              <div>
                <h3 className="font-bold text-white">麦克风 (Microphone)</h3>
                <p>用于为您的视频录制音频。音频在本地处理并与您的视频同步。</p>
              </div>
              <div>
                <h3 className="font-bold text-white">照片库 (Photo Library)</h3>
                <p>仅用于将您制作的最终视频保存到设备的“相机胶卷”中。</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. 第三方服务</h2>
            <p>
              本应用不集成第三方广告网络或数据代理商。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. 儿童隐私</h2>
            <p>
              由于我们不收集个人数据，我们的应用适合所有年龄段的用户使用。我们不会有意收集 13 岁以下儿童的个人信息。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. 政策变更</h2>
            <p>
              我们可能会不时更新我们的隐私政策。我们会通过在此页面上发布新的隐私政策来通知您任何更改。建议您定期查看本隐私政策以了解任何变更。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. 联系我们</h2>
            <p>
              如果您对本隐私政策有任何疑问，请联系我们：
              <br />
              <a href="mailto:contactus@movtrak.app" className="text-[#59E46E] hover:underline">contactus@movtrak.app</a>
            </p>
          </section>
        </div>

        <hr className="my-16 border-gray-700" />

        {/* English Version */}
        <h1 className="text-4xl font-bold mb-8 text-[#59E46E]">Privacy Policy</h1>
        
        <div className="space-y-8 text-gray-300 leading-relaxed">
          <p className="text-lg">
            Last updated: November 26, 2025
          </p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Overview</h2>
            <p>
              Movtrak ("we", "our", or "us") respects your privacy. This Privacy Policy explains how we handle your information when you use our Movtrak iOS application.
              <br /><br />
              <strong>The short version:</strong> We do not collect, store, or share your personal data. Movtrak is designed to process everything locally on your device.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Data Collection and Usage</h2>
            <p>
              Movtrak does not collect, transmit, or store any personal identification information (PII) or usage data on external servers.
            </p>
            <ul className="list-disc list-inside mt-4 ml-4 space-y-2">
              <li>We do not have a user database.</li>
              <li>We do not track your location (other than what is required by the system for camera usage, which we do not record).</li>
              <li>We do not use third-party analytics services to track user behavior.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Device Permissions</h2>
            <p>
              To function, Movtrak requires access to certain features on your device. Here is why we ask for them:
            </p>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="font-bold text-white">Camera</h3>
                <p>Used solely to capture video and track subjects in real-time. All image processing happens directly on your iPhone's processor. No video feed is ever sent to the cloud.</p>
              </div>
              <div>
                <h3 className="font-bold text-white">Microphone</h3>
                <p>Used to record audio for your videos. Audio is processed locally and synchronized with your video.</p>
              </div>
              <div>
                <h3 className="font-bold text-white">Photo Library</h3>
                <p>Used only to save the final videos you create to your device's Camera Roll.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Third-Party Services</h2>
            <p>
              The app does not integrate with third-party advertising networks or data brokers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Children’s Privacy</h2>
            <p>
              Since we do not collect personal data, our app is safe for use by all ages. We do not knowingly collect personal information from children under the age of 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <a href="mailto:contactus@movtrak.app" className="text-[#59E46E] hover:underline">contactus@movtrak.app</a>
            </p>
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
            <Link to="/privacy" className="text-white font-semibold">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
            <a href="mailto:contactus@movtrak.app" className="text-gray-400 hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}