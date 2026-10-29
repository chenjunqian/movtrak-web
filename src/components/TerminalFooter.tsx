import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useClock } from '../hooks/useHud'

export default function TerminalFooter() {
  const { t } = useTranslation()
  const clock = useClock()
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 md:px-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="mono text-[11px] text-mint">
              MOVTRAK<span className="text-cream/40">.OS</span>
            </p>
            <p className="mt-2 max-w-[16rem] text-xs leading-relaxed text-cream/45">
              {t('footer.tagline')}
            </p>
          </div>

          <nav className="mono flex flex-wrap items-start gap-x-6 gap-y-3 text-[10px] text-cream/60 md:justify-center">
            <Link to="/#sensors" className="transition-colors hover:text-mint">
              {t('navbar.features')}
            </Link>
            <Link to="/#protocol" className="transition-colors hover:text-mint">
              {t('navbar.howItWorks')}
            </Link>
            <Link to="/support" className="transition-colors hover:text-mint">
              {t('navbar.support')}
            </Link>
            <Link to="/about" className="transition-colors hover:text-mint">
              {t('footer.about')}
            </Link>
            <a href="mailto:contactus@movtrak.app" className="transition-colors hover:text-mint">
              {t('footer.contact')}
            </a>
          </nav>

          <div className="mono flex flex-wrap items-start gap-x-6 gap-y-3 text-[10px] text-cream/60 md:justify-end">
            <Link to="/privacy" className="transition-colors hover:text-mint">
              {t('footer.privacyPolicy')}
            </Link>
            <Link to="/terms" className="transition-colors hover:text-mint">
              {t('footer.termsOfService')}
            </Link>
          </div>
        </div>

        <div className="mono mt-8 flex flex-col gap-2 border-t hair pt-5 text-[9px] text-cream/35 sm:flex-row sm:items-center sm:justify-between">
          <span>{t('footer.copyright', { year })}</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse bg-mint" aria-hidden />
            {t('footer.status')} · {clock}
          </span>
        </div>
      </div>
    </footer>
  )
}
