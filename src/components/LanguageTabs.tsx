import type { DocLang } from '../hooks/useDocLanguage'

interface LanguageTabsProps {
  value: DocLang
  onChange: (lang: DocLang) => void
  className?: string
}

export default function LanguageTabs({ value, onChange, className = '' }: LanguageTabsProps) {
  return (
    <div className={`inline-flex border hair ${className}`} role="group" aria-label="Document language">
      {(['zh', 'en'] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => onChange(lang)}
          aria-pressed={value === lang}
          className={`mono px-3 py-2 text-[9px] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-mint ${
            value === lang
              ? 'bg-mint text-slate-canvas'
              : 'text-mint/80 hover:bg-mint/10 hover:text-mint'
          }`}
        >
          {lang === 'zh' ? '中文' : 'EN'}
        </button>
      ))}
    </div>
  )
}
