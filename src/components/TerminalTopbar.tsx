import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { APP_STORE_URL } from '../constants'

interface TerminalTopbarProps {
  system?: string
  active?: 'support' | 'privacy' | 'terms'
}

export default function TerminalTopbar({ system, active }: TerminalTopbarProps) {
  const { t, i18n } = useTranslation()
  const isZh = i18n.language.startsWith('zh')

  return (
    <header className="sticky top-0 z-50 border-b hair bg-slate-canvas/90 backdrop-blur-sm">
      <div className="mx-auto flex h-12 max-w-[1600px] items-center justify-between gap-3 px-4 md:px-12">
        <div className="flex min-w-0 items-center gap-5">
          <Link
            to="/"
            className="mono shrink-0 text-[11px] text-mint transition-opacity hover:opacity-70"
          >
            MOVTRAK<span className="text-cream/40">.OS</span>
          </Link>
          <p className="hidden truncate mono text-[10px] text-cream/45 lg:block">
            {system ?? t('topbar.system')}
          </p>
        </div>

        <nav className="hidden items-center gap-6 mono text-[10px] text-cream/60 md:flex">
          <Link to="/#sensors" className="transition-colors hover:text-mint">
            {t('navbar.features')}
          </Link>
          <Link to="/#protocol" className="transition-colors hover:text-mint">
            {t('navbar.howItWorks')}
          </Link>
          <Link
            to="/support"
            className={`transition-colors hover:text-mint ${active === 'support' ? 'text-mint' : ''}`}
          >
            {t('navbar.support')}
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden mono text-[10px] text-coral xl:inline">
            {t('topbar.version')}
          </span>
          <label className="sr-only" htmlFor="language-select">
            {t('topbar.language')}
          </label>
          <div className="relative">
            <select
              id="language-select"
              value={isZh ? 'zh' : 'en'}
              onChange={(event) => i18n.changeLanguage(event.target.value)}
              className="mono cursor-pointer appearance-none border hair bg-slate-canvas py-1 pl-2 pr-6 text-[10px] text-mint transition-colors hover:bg-mint/10 focus:outline-none focus-visible:ring-1 focus-visible:ring-mint"
            >
              <option className="bg-slate-canvas text-cream" value="en">
                {t('languageSwitcher.english')}
              </option>
              <option className="bg-slate-canvas text-cream" value="zh">
                {t('languageSwitcher.chinese')}
              </option>
            </select>
            <span
              className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-[7px] text-mint"
              aria-hidden
            >
              ▾
            </span>
          </div>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mono inline-block border border-mint bg-mint px-3 py-1.5 text-[10px] text-slate-canvas transition-colors hover:bg-transparent hover:text-mint"
          >
            {t('navbar.download')}
          </a>
        </div>
      </div>
    </header>
  )
}
