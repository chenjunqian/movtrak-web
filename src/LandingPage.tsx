import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageIcon from './components/LanguageIcon'

export default function LandingPage() {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeLanguage(event.target.value)
  }

  const downloadUrl = i18n.language.startsWith('zh')
    ? 'https://apps.apple.com/cn/app/movtrak/id6755912677'
    : 'https://apps.apple.com/us/app/movtrak/id6755912677'

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans relative">
      {/* Navbar */}
      <nav className="container mx-auto p-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-[#59E46E]">Movtrak</div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="hover:text-[#59E46E] transition">{t('navbar.features')}</a>
          <a href="#how-it-works" className="hover:text-[#59E46E] transition">{t('navbar.howItWorks')}</a>
          <Link to="/support" className="hover:text-[#59E46E] transition">{t('navbar.support')}</Link>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center">
            <LanguageIcon className="absolute left-3 text-gray-300 w-5 h-5 pointer-events-none" />
            <select
              value={i18n.language}
              onChange={handleLanguageChange}
              className="bg-gray-900 border border-gray-700 text-gray-300 pl-10 pr-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#59E46E] focus:border-transparent transition cursor-pointer appearance-none"
            >
              <option value="en">{t('languageSwitcher.english')}</option>
              <option value="zh">{t('languageSwitcher.chinese')}</option>
            </select>
          </div>
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#59E46E] text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-[#4bd660] transition"
          >
            {t('navbar.download')}
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            {t('hero.titlePart1')} <span className="text-[#59E46E]">{t('hero.titlePart2')}</span> {t('hero.titlePart3')}
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#59E46E] text-gray-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-[#4bd660] transition shadow-lg shadow-green-500/20 text-center"
            >
              {t('hero.getForIOS')}
            </a>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-68 h-[580px] border-4 border-gray-700 bg-gray-800 rounded-[3rem] shadow-2xl flex items-center justify-center overflow-hidden">
            <img
              src="/app-human-pose-detect-1.png"
              alt="Movtrak App Motion Tracking Screenshot"
              className="absolute inset-0 w-full h-full object-cover rounded-[2.5rem]"
            />
            {/* Notch */}
            <div className="absolute top-0 w-26 h-6 bg-gray-700 rounded-b-xl"></div>
          </div>
        </div>
      </header>

      {/* Screenshots Section */}
      <section className="bg-gray-900 py-10 overflow-hidden">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t('screenshots.title')}
          </h2>
          <div className="flex overflow-x-auto space-x-6 pb-8 snap-x snap-mandatory scrollbar-hide justify-start md:justify-center">
            {[
              '/app-human-body-track-2.png',
              '/app-human-pose-detect-2.png',
              '/app-album.png',
              '/app-video-editting.png'
            ].map((src, index) => (
              <div key={index} className="flex-shrink-0 snap-center">
                <div className="relative w-64 h-[500px] border-4 border-gray-700 bg-gray-800 rounded-[2.5rem] shadow-xl flex items-center justify-center overflow-hidden">
                  <img
                    src={src}
                    alt={`Screenshot ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover rounded-[2rem]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Highlight Module Section */}
      <section id="features" className="bg-gray-800 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            {t('features.title')} <span className="text-[#59E46E]">{t('features.titleBrand')}</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {/* Highlight 1 */}
            <div className="bg-gray-900 p-8 rounded-2xl hover:transform hover:-translate-y-2 transition duration-300">
              <div className="text-4xl mb-6">🌐</div>
              <h3 className="text-xl font-bold mb-4 text-[#59E46E]">{t('features.highlight1.title')}</h3>
              <p className="text-lg text-gray-300 mb-3">
                {t('features.highlight1.coreValue')}
              </p>
              <p className="text-gray-400">
                {t('features.highlight1.description')}
              </p>
            </div>
            {/* Highlight 2 */}
            <div className="bg-gray-900 p-8 rounded-2xl hover:transform hover:-translate-y-2 transition duration-300">
              <div className="text-4xl mb-6">🧠</div>
              <h3 className="text-xl font-bold mb-4 text-[#59E46E]">{t('features.highlight2.title')}</h3>
              <p className="text-lg text-gray-300 mb-3">
                {t('features.highlight2.coreValue')}
              </p>
              <p className="text-gray-400">
                {t('features.highlight2.description')}
              </p>
            </div>
            {/* Highlight 3 */}
            <div className="bg-gray-900 p-8 rounded-2xl hover:transform hover:-translate-y-2 transition duration-300">
              <div className="text-4xl mb-6">💰</div>
              <h3 className="text-xl font-bold mb-4 text-[#59E46E]">{t('features.highlight3.title')}</h3>
              <p className="text-lg text-gray-300 mb-3">
                {t('features.highlight3.coreValue')}
              </p>
              <p className="text-gray-400">
                {t('features.highlight3.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{t('howItWorks.title')}</h2>
        <div className="max-w-4xl mx-auto">
          {[
            { step: 1, title: t('howItWorks.step1'), desc: t('howItWorks.step1Desc') },
            { step: 2, title: t('howItWorks.step2'), desc: t('howItWorks.step2Desc') },
            { step: 3, title: t('howItWorks.step3'), desc: t('howItWorks.step3Desc') },
            { step: 4, title: t('howItWorks.step4'), desc: t('howItWorks.step4Desc') },
            { step: 5, title: t('howItWorks.step5'), desc: t('howItWorks.step5Desc') }
          ].map((item) => (
            <div key={item.step} className="flex mb-8 items-start">
              <div className="shrink-0 w-12 h-12 bg-[#59E46E] rounded-full flex items-center justify-center text-gray-900 font-bold text-xl mr-6">
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
            <p className="text-gray-500 mt-2">{t('footer.copyright', { year: new Date().getFullYear() })}</p>
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-gray-400 hover:text-white">{t('footer.privacyPolicy')}</Link>
            <Link to="/terms" className="text-gray-400 hover:text-white">{t('footer.termsOfService')}</Link>
            <a href="mailto:contactus@movtrak.app" className="text-gray-400 hover:text-white">{t('footer.contact')}</a>
          </div>
        </div>
      </footer>

    </div>
  )
}
