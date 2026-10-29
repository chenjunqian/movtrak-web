import PageShell from './components/PageShell'
import LegalDocView from './components/LegalDocView'
import { termsDocs } from './content/legal'
import { useDocLanguage } from './hooks/useDocLanguage'

export default function TermsOfServicePage() {
  const { lang, setLang } = useDocLanguage()
  const isZh = lang === 'zh'
  const doc = termsDocs[lang]

  return (
    <PageShell
      system="// TERMS_OF_SERVICE"
      kicker="SYS // LEGAL_DOCUMENT"
      titleSolid={isZh ? '服务' : 'TERMS'}
      titleOutline={isZh ? '条款' : 'OF SERVICE'}
      intro={
        isZh
          ? '使用 Movtrak 的规则，包括 7 天免费试用、一次性终身解锁，以及你创作内容的归属。'
          : 'The rules for using Movtrak, including the 7-day trial, the one-time lifetime unlock and ownership of your footage.'
      }
      meta={[
        { label: 'DOC_ID', value: 'MVK-TERMS-01' },
        { label: 'UPDATED', value: doc.updated },
        { label: 'BILLING', value: isZh ? 'APPLE 内购' : 'APPLE IAP' },
      ]}
      toc={doc.sections.map((section, i) => ({ id: `s${i + 1}`, label: section.title }))}
      railLabel="TERMS_OF_SERVICE_UNIT"
      language={lang}
      onLanguageChange={setLang}
      active="terms"
    >
      <LegalDocView doc={doc} />
    </PageShell>
  )
}
