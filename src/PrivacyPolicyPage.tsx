import PageShell from './components/PageShell'
import LegalDocView from './components/LegalDocView'
import { privacyDocs } from './content/legal'
import { useDocLanguage } from './hooks/useDocLanguage'

export default function PrivacyPolicyPage() {
  const { lang, setLang } = useDocLanguage()
  const isZh = lang === 'zh'
  const doc = privacyDocs[lang]

  return (
    <PageShell
      system="// PRIVACY_POLICY"
      kicker="SYS // LEGAL_DOCUMENT"
      titleSolid={isZh ? '隐私' : 'PRIVACY'}
      titleOutline={isZh ? '政策' : 'POLICY'}
      intro={
        isZh
          ? 'Movtrak 如何处理你的数据：一切都在你的设备上完成。没有账号、没有分析追踪、没有云端上传。'
          : 'How Movtrak handles your data: everything stays on your device. No accounts, no analytics, no cloud uploads.'
      }
      meta={[
        { label: 'DOC_ID', value: 'MVK-PRIVACY-01' },
        { label: 'UPDATED', value: doc.updated },
        { label: 'DATA', value: isZh ? '仅本机' : 'LOCAL ONLY' },
      ]}
      toc={doc.sections.map((section, i) => ({ id: `s${i + 1}`, label: section.title }))}
      railLabel="PRIVACY_POLICY_UNIT"
      language={lang}
      onLanguageChange={setLang}
      active="privacy"
    >
      <LegalDocView doc={doc} />
    </PageShell>
  )
}
