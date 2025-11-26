import { Link } from 'react-router-dom'

export default function TermsOfServicePage() {
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
        <h1 className="text-4xl font-bold mb-8 text-[#59E46E]">服务条款 (Terms of Service - Chinese)</h1>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <p className="text-lg">
            最后更新日期：2025年11月26日
          </p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. 引言</h2>
            <p>
              欢迎使用 Movtrak！本服务条款（以下简称“条款”）管辖您访问和使用 Movtrak iOS 应用程序（以下简称“应用”）的行为，该应用由 Movtrak（以下简称“我们”）提供。访问或使用本应用即表示您同意受本条款的约束。如果您不同意本条款，则不得使用本应用。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. 条款的接受</h2>
            <p>
              通过下载、安装或使用 Movtrak 应用，您确认同意受本条款以及所有适用法律和法规的约束。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. 应用使用许可</h2>
            <p>
              在您拥有或控制的 iOS 设备上，我们授予您有限的、非独占的、不可转让的、可撤销的许可，以根据本条款将 Movtrak 应用用于您的个人非商业目的。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. 用户责任</h2>
            <ul className="list-disc list-inside mt-4 ml-4 space-y-2">
              <li>您对您使用本应用的行为以及您使用本应用创建的任何内容负责。</li>
              <li>您同意仅将本应用用于合法目的并遵守本条款。</li>
              <li>您全权负责确保您使用本应用及其创建的内容符合所有适用的法律、法规和规定，包括与隐私、知识产权和宣传相关的规定。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. 知识产权</h2>
            <ul className="list-disc list-inside mt-4 ml-4 space-y-2">
              <li>本应用及其原始内容、功能和特性是 Movtrak 及其许可方的独家财产并将保持不变。</li>
              <li>您的内容，包括使用本应用创建的视频和图像，仍归您所有。我们不主张拥有您的内容。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. 禁止行为</h2>
            <p>您同意不进行以下行为：</p>
            <ul className="list-disc list-inside mt-4 ml-4 space-y-2">
              <li>将本应用用于任何非法或未经授权的目的。</li>
              <li>对本应用的任何部分进行逆向工程、反编译或反汇编。</li>
              <li>干扰或破坏本应用的完整性或性能。</li>
              <li>试图未经授权访问本应用或其相关系统或网络。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. 免责声明</h2>
            <p>
              本应用按“原样”和“可用”状态提供。Movtrak 不作任何明示或暗示的保证，特此声明放弃所有其他保证，包括但不限于适销性、特定用途适用性、不侵犯知识产权或其他侵犯权利的暗示保证。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. 责任限制</h2>
            <p>
              在任何情况下，Movtrak 或其供应商均不对因使用或无法使用本应用而造成的任何损害（包括但不限于数据或利润损失，或因业务中断造成的损害）承担责任，即使 Movtrak 或 Movtrak 授权代表已被口头或书面告知此类损害的可能性。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. 赔偿</h2>
            <p>
              您同意赔偿、辩护并使 Movtrak 及其管理人员、董事、员工和代理人免受因您访问或使用本应用而引起或以任何方式与之相关的任何及所有索赔、责任、损害、损失或费用（包括合理的律师费和成本）的损害。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. 条款修改</h2>
            <p>
              我们保留随时自行决定修改或替换这些条款的权利。我们将通过在此页面上发布新条款来通知您任何更改。在这些修订生效后，您继续访问或使用我们的应用即表示您同意受修订条款的约束。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. 适用法律</h2>
            <p>
              本条款应受 [您的司法管辖区] 法律管辖并据其解释，不考虑其法律冲突规定。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. 联系我们</h2>
            <p>
              如果您对这些条款有任何疑问，请通过以下方式联系我们：
              <br />
              <a href="mailto:contactus@movtrak.app" className="text-[#59E46E] hover:underline">contactus@movtrak.app</a>
            </p>
          </section>
        </div>

        <hr className="my-16 border-gray-700" />
        {/* English Version */}
        <h1 className="text-4xl font-bold mb-8 text-[#59E46E]">Terms of Service</h1>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <p className="text-lg">
            Last updated: November 26, 2025
          </p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p>
              Welcome to Movtrak! These Terms of Service ("Terms") govern your access to and use of the Movtrak iOS application (the "App"), provided by Movtrak ("we", "our", or "us"). By accessing or using the App, you agree to be bound by these Terms. If you do not agree to these Terms, you may not use the App.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Acceptance of Terms</h2>
            <p>
              By downloading, installing, or using the Movtrak App, you confirm your agreement to be bound by these Terms and all applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="2xl font-bold text-white mb-4">3. License to Use the App</h2>
            <p>
              We grant you a limited, non-exclusive, non-transferable, revocable license to use the Movtrak App for your personal, non-commercial purposes on an iOS device that you own or control, subject to these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. User Responsibilities</h2>
            <ul className="list-disc list-inside mt-4 ml-4 space-y-2">
              <li>You are responsible for your use of the App and any content you create with it.</li>
              <li>You agree to use the App only for lawful purposes and in accordance with these Terms.</li>
              <li>You are solely responsible for ensuring that your use of the App and the content you create complies with all applicable laws, rules, and regulations, including those related to privacy, intellectual property, and publicity.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
            <ul className="list-disc list-inside mt-4 ml-4 space-y-2">
              <li>The App and its original content, features, and functionality are and will remain the exclusive property of Movtrak and its licensors.</li>
              <li>Your content, including videos and images created with the App, remains your property. We do not claim ownership over your content.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Prohibited Conduct</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside mt-4 ml-4 space-y-2">
              <li>Use the App for any illegal or unauthorized purpose.</li>
              <li>Reverse engineer, decompile, or disassemble any part of the App.</li>
              <li>Interfere with or disrupt the integrity or performance of the App.</li>
              <li>Attempt to gain unauthorized access to the App or its related systems or networks.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Disclaimer of Warranties</h2>
            <p>
              The App is provided on an "AS IS" and "AS AVAILABLE" basis. Movtrak makes no warranties, expressed or implied, and hereby disclaims all other warranties, including without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
            <p>
              In no event shall Movtrak or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the App, even if Movtrak or a Movtrak authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Movtrak and its officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, or expenses, including reasonable attorneys' fees and costs, arising out of or in any way connected with your access to or use of the App.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Modifications to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page. By continuing to access or use our App after those revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
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
            <Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="text-white font-semibold">Terms of Service</Link>
            <a href="mailto:contactus@movtrak.app" className="text-gray-400 hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
