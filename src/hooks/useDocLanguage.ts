import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export type DocLang = 'zh' | 'en'

/**
 * Document pages derive their language from the global i18n state, so the
 * topbar switcher and the in-page tabs stay in sync.
 */
export function useDocLanguage() {
  const { i18n } = useTranslation()
  const lang: DocLang = i18n.language.startsWith('zh') ? 'zh' : 'en'

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : 'en'
  }, [lang])

  const setLang = (next: DocLang) => {
    void i18n.changeLanguage(next)
  }

  return { lang, setLang }
}
