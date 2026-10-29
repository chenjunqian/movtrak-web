import { Link } from 'react-router-dom'
import PageShell from './components/PageShell'
import SectionHead from './components/SectionHead'
import { APP_STORE_URL } from './constants'
import { useDocLanguage } from './hooks/useDocLanguage'

export default function SupportPage() {
  const { lang, setLang } = useDocLanguage()
  const isZh = lang === 'zh'

  const copy = isZh
    ? {
        titleSolid: '支持',
        titleOutline: '中心',
        intro: '需要 Movtrak 的帮助？我们在这里为您提供帮助。',
        contactTitle: '联系我们与反馈',
        contactIntro: '对于任何问题、错误报告或功能建议，欢迎通过以下渠道与我们联系。',
        channels: [
          {
            title: '官方邮箱',
            value: 'contactus@movtrak.app',
            href: 'mailto:contactus@movtrak.app',
            note: '详细问题咨询、商务合作与 Bug 反馈',
            external: false,
          },
          {
            title: '小红书官方主页',
            value: 'Movtrak (号: 94148273564)',
            href: 'https://xhslink.cn/o/5ZFvMll71iW',
            note: '关注主页、交流反馈与使用技巧分享',
            external: true,
          },
        ],
        faqTitle: '常见问题解答',
        faqs: [
          {
            q: '应用程序兼容性',
            a: 'Movtrak 专为 iOS 设备设计，支持 iPhone 和 iPad。',
          },
          {
            q: '运动跟踪准确性',
            a: '我们的 AI 算法经过优化的设备上处理，确保最佳性能，而无需云连接。',
          },
          {
            q: '隐私安全',
            a: 'Movtrak 所有处理都在设备本地进行，不会上传任何个人数据或视频内容。',
          },
        ],
        resourcesTitle: '更多资源',
        privacy: '隐私政策',
        terms: '服务条款',
        resourcesNote: '有关更多详细信息，请访问我们的官方网站或联系支持团队。',
        ctaTitle: '准备好让相机跟着你走了吗？',
        ctaBody: '7 天全功能试用，之后 $9.99 一次买断。',
        ctaButton: '获取 MOVTRAK',
        toc: [
          { id: 'contact', label: '联系渠道' },
          { id: 'faq', label: '常见问题' },
          { id: 'resources', label: '更多资源' },
        ],
      }
    : {
        titleSolid: 'SUPPORT',
        titleOutline: 'DESK',
        intro: "Need help with Movtrak? We're here to assist you.",
        contactTitle: 'Contact & Support',
        contactIntro: 'For any issues, bugs, or feature requests, please reach out to our team.',
        channels: [
          {
            title: 'Email Support',
            value: 'contactus@movtrak.app',
            href: 'mailto:contactus@movtrak.app',
            note: 'General inquiries, bug reports & collaborations',
            external: false,
          },
          {
            title: 'Xiaohongshu (RED)',
            value: 'Movtrak (ID: 94148273564)',
            href: 'https://xhslink.cn/o/5ZFvMll71iW',
            note: 'Community updates, feedback & discussions',
            external: true,
          },
        ],
        faqTitle: 'Frequently Asked Questions',
        faqs: [
          {
            q: 'App Compatibility',
            a: 'Movtrak is designed for iOS devices and supports iPhone and iPad.',
          },
          {
            q: 'Motion Tracking Accuracy',
            a: 'Our AI algorithms are optimized for on-device processing to ensure the best performance without cloud connectivity.',
          },
          {
            q: 'Privacy & Security',
            a: 'Movtrak processes everything locally on your device and never uploads any personal data or video content.',
          },
        ],
        resourcesTitle: 'Additional Resources',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        resourcesNote: 'For more details, please visit our official website or contact our support team.',
        ctaTitle: 'Ready to let the camera follow you?',
        ctaBody: '7 days of full access, then a $9.99 one-time unlock.',
        ctaButton: 'ACQUIRE MOVTRAK',
        toc: [
          { id: 'contact', label: 'Contact' },
          { id: 'faq', label: 'FAQ' },
          { id: 'resources', label: 'Resources' },
        ],
      }

  return (
    <PageShell
      system="// SUPPORT_DESK"
      kicker="SYS // SUPPORT_CHANNEL"
      titleSolid={copy.titleSolid}
      titleOutline={copy.titleOutline}
      intro={copy.intro}
      meta={[
        { label: 'DOC_ID', value: 'MVK-SUPPORT-01' },
        { label: 'UPDATED', value: '2026.10.13' },
        { label: 'CHANNEL', value: 'EMAIL · REDNOTE' },
      ]}
      toc={copy.toc}
      railLabel="SUPPORT_CHANNEL_UNIT"
      language={lang}
      onLanguageChange={setLang}
      active="support"
    >
      <section id="contact">
        <SectionHead
          index="01"
          label="CONTACT_CHANNELS"
          title={copy.contactTitle}
          intro={copy.contactIntro}
        />

        <div className="mt-6 grid gap-px border hair bg-mint/25 md:grid-cols-2">
          {copy.channels.map((channel, i) => (
            <a
              key={channel.title}
              href={channel.href}
              target={channel.external ? '_blank' : undefined}
              rel={channel.external ? 'noopener noreferrer' : undefined}
              className="group flex flex-col bg-slate-canvas p-6 transition-colors hover:bg-mint/5"
            >
              <div className="mono flex items-center justify-between text-[9px] text-cream/40">
                <span>CHANNEL_0{i + 1}</span>
                <span className="text-mint">● OPEN</span>
              </div>
              <h3 className="mt-8 font-display text-2xl leading-tight md:text-3xl">
                {channel.title}
              </h3>
              <p className="mono mt-2 break-all text-[10px] text-mint">{channel.value}</p>
              <p className="mt-4 text-sm leading-relaxed text-cream/60">{channel.note}</p>
              <span className="mono mt-8 inline-flex items-center gap-2 text-[9px] text-coral">
                OPEN_CHANNEL
                <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section id="faq" className="mt-14">
        <SectionHead index="02" label="FAQ_DATABASE" title={copy.faqTitle} />

        <div className="mt-6 grid gap-px border hair bg-mint/25 md:grid-cols-3">
          {copy.faqs.map((faq, i) => (
            <article key={faq.q} className="bg-slate-canvas p-5 md:p-6">
              <p className="mono text-[9px] text-coral">Q_{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-4 font-display text-lg leading-snug">{faq.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/60">{faq.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="resources" className="mt-14">
        <SectionHead index="03" label="RESOURCES" title={copy.resourcesTitle} />

        <div className="mt-6 grid gap-px border hair bg-mint/25 sm:grid-cols-2">
          <Link
            to="/privacy"
            className="group flex items-center justify-between gap-4 bg-slate-canvas p-5 transition-colors hover:bg-mint/5"
          >
            <span>
              <span className="mono text-[9px] text-cream/40">DOC_01</span>
              <span className="mono mt-2 block text-[11px] text-cream/80 transition-colors group-hover:text-mint">
                {copy.privacy}
              </span>
            </span>
            <span className="text-mint" aria-hidden>
              →
            </span>
          </Link>

          <Link
            to="/terms"
            className="group flex items-center justify-between gap-4 bg-slate-canvas p-5 transition-colors hover:bg-mint/5"
          >
            <span>
              <span className="mono text-[9px] text-cream/40">DOC_02</span>
              <span className="mono mt-2 block text-[11px] text-cream/80 transition-colors group-hover:text-mint">
                {copy.terms}
              </span>
            </span>
            <span className="text-mint" aria-hidden>
              →
            </span>
          </Link>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-cream/50">{copy.resourcesNote}</p>
      </section>

      <div className="mt-14 border hair p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
        <div>
          <p className="mono text-[9px] text-cream/40">GET_MOVTRAK</p>
          <p className="mt-3 font-display text-2xl leading-tight md:text-3xl">{copy.ctaTitle}</p>
          <p className="mt-2 text-sm text-cream/60">{copy.ctaBody}</p>
        </div>
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 inline-flex items-center gap-8 border border-coral bg-coral px-6 py-4 mono text-[10px] text-slate-canvas transition-colors hover:bg-transparent hover:text-coral md:mt-0"
        >
          {copy.ctaButton}
          <span className="text-base transition-transform group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </a>
      </div>
    </PageShell>
  )
}
