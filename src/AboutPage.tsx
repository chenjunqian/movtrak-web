import PageShell from './components/PageShell'
import SectionHead from './components/SectionHead'
import { APP_STORE_URL } from './constants'
import { useDocLanguage } from './hooks/useDocLanguage'

export default function AboutPage() {
  const { lang, setLang } = useDocLanguage()
  const isZh = lang === 'zh'

  const copy = isZh
    ? {
        titleSolid: '关于',
        titleOutline: 'MOVTRAK',
        intro:
          'Movtrak 是一台掌上运动追踪相机：一部 iPhone，无需摄影助理，无需稳定器。为攀岩、力量训练与独自创作的人而生。',
        missionTitle: '独自训练，也能留下好画面。',
        missionIntro:
          '大部分精彩训练发生时，身边都没有人帮你拍。Movtrak 给你一双不会累的眼睛。',
        values: [
          {
            label: 'NO_CREW',
            title: '多一双不会累的眼睛',
            text: '你专注于动作，相机负责构图和跟随。',
          },
          {
            label: 'NO_RIG',
            title: '不需要额外器材',
            text: '无需稳定器、三脚架或摄影助理，只需要你手上的 iPhone。',
          },
          {
            label: 'NO_CLOUD',
            title: '画面只属于你',
            text: '视觉运算在本机完成，不上传、不经过云端分析。',
          },
        ],
        systemTitle: '一部 iPhone，一次锁定。',
        systemIntro: 'Apple Vision 识别你的身体，锁定构图，并在你移动时持续跟随。',
        systemSteps: [
          { label: 'DETECT', text: 'Apple Vision 实时识别你的身体并保持锁定。' },
          { label: 'LOCK', text: '画面跟随你的移动，而不是背景。' },
          { label: 'RECORD', text: '录制、在相册中回看，导出构图完整的片段。' },
        ],
        audienceTitle: '为独自训练而生。',
        audienceIntro: '不需要摄影师，也不需要第二个人帮你看着手机。',
        audience: [
          {
            title: '攀岩',
            text: '从起步到登顶，始终把岩壁和攀爬者留在画面里。',
          },
          {
            title: '力量训练',
            text: '记录每一组训练，不用请人帮你举着手机。',
          },
          {
            title: '个人创作',
            text: '无需他人掌镜，拍完就已是可用的构图。',
          },
        ],
        pricingTitle: '先试用，再拥有。',
        pricingIntro: '7 天全功能试用。之后一次付款，永久解锁 Movtrak Pro。',
        pricingLabel: '永久解锁',
        pricingNote: '一次买断 · 无订阅',
        pricingButton: '获取 MOVTRAK',
        contactTitle: '联系我们。',
        contactIntro: '问题、Bug 反馈或功能建议，欢迎写信给我们。',
        toc: [
          { id: 'mission', label: '初衷' },
          { id: 'system', label: '系统' },
          { id: 'audience', label: '适合谁' },
          { id: 'pricing', label: '定价' },
          { id: 'contact', label: '联系' },
        ],
        metaBuild: 'IPHONE · 本机',
      }
    : {
        titleSolid: 'ABOUT',
        titleOutline: 'MOVTRAK',
        intro:
          'Movtrak is a pocket motion-tracking camera: one iPhone, no crew, no gimbal. Built for climbers, lifters and solo creators.',
        missionTitle: 'Train alone. Still get the shot.',
        missionIntro:
          'Most great sessions happen without a camera operator. Movtrak gives you a second pair of eyes that never gets tired.',
        values: [
          {
            label: 'NO_CREW',
            title: 'A second pair of eyes',
            text: 'The camera frames you while you focus on the move.',
          },
          {
            label: 'NO_RIG',
            title: 'No extra gear',
            text: 'No gimbal, no tripod, no operator. Just the iPhone you already carry.',
          },
          {
            label: 'NO_CLOUD',
            title: 'Your footage stays yours',
            text: 'Vision runs on-device. Nothing is uploaded or analysed in the cloud.',
          },
        ],
        systemTitle: 'One iPhone. One lock.',
        systemIntro:
          'Apple Vision finds your body, locks the frame and keeps you centred while you move.',
        systemSteps: [
          { label: 'DETECT', text: 'Apple Vision finds your body and keeps a lock in real time.' },
          { label: 'LOCK', text: 'The frame follows your movement instead of the background.' },
          { label: 'RECORD', text: 'Capture, review in the album, then export a perfectly framed clip.' },
        ],
        audienceTitle: 'Built for the solo session.',
        audienceIntro: 'No photographer, and no second person holding your phone.',
        audience: [
          {
            title: 'Rock climbing',
            text: 'Keep the wall and the climber in frame from the first move to the top.',
          },
          {
            title: 'Strength training',
            text: 'Film sets and lifts without asking someone to hold your phone.',
          },
          {
            title: 'Solo content',
            text: 'Shoot hands-free clips that already look framed before you edit.',
          },
        ],
        pricingTitle: 'Try it. Then own it.',
        pricingIntro:
          '7 days of full access. After the trial, one payment unlocks Movtrak Pro forever.',
        pricingLabel: 'LIFETIME_UNLOCK',
        pricingNote: 'ONE-TIME · NO SUBSCRIPTION',
        pricingButton: 'ACQUIRE MOVTRAK',
        contactTitle: 'Say hello.',
        contactIntro: 'Questions, bug reports or a feature idea? The inbox is open.',
        toc: [
          { id: 'mission', label: 'Mission' },
          { id: 'system', label: 'System' },
          { id: 'audience', label: 'For you' },
          { id: 'pricing', label: 'Pricing' },
          { id: 'contact', label: 'Contact' },
        ],
        metaBuild: 'IPHONE · ON-DEVICE',
      }

  return (
    <PageShell
      system="// ABOUT_MOVTRAK"
      kicker="SYS // PRODUCT_FILE"
      titleSolid={copy.titleSolid}
      titleOutline={copy.titleOutline}
      intro={copy.intro}
      meta={[
        { label: 'DOC_ID', value: 'MVK-ABOUT-01' },
        { label: 'UPDATED', value: '2026.10.13' },
        { label: 'BUILD', value: copy.metaBuild },
      ]}
      toc={copy.toc}
      railLabel="ABOUT_MOVTRAK_UNIT"
      language={lang}
      onLanguageChange={setLang}
    >
      <section id="mission">
        <SectionHead
          index="01"
          label="MISSION"
          title={copy.missionTitle}
          intro={copy.missionIntro}
        />

        <div className="mt-6 grid gap-px border hair bg-mint/25 md:grid-cols-3">
          {copy.values.map((value) => (
            <div key={value.label} className="bg-slate-canvas p-5 md:p-6">
              <p className="mono text-[9px] text-coral">{value.label}</p>
              <h3 className="mt-4 font-display text-lg leading-snug">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/60">{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="system" className="mt-14">
        <SectionHead
          index="02"
          label="SYSTEM"
          title={copy.systemTitle}
          intro={copy.systemIntro}
        />

        <div className="mt-6 border hair">
          {copy.systemSteps.map((step, i) => (
            <div
              key={step.label}
              className="border-b hair p-4 last:border-b-0 md:grid md:grid-cols-[48px_140px_1fr] md:items-start md:gap-4 md:p-5"
            >
              <span className="mono mr-2 text-[9px] text-coral md:mr-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="mono text-[9px] text-mint">{step.label}</span>
              <p className="mt-2 text-sm leading-relaxed text-cream/65 md:mt-0">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="audience" className="mt-14">
        <SectionHead
          index="03"
          label="AUDIENCE"
          title={copy.audienceTitle}
          intro={copy.audienceIntro}
        />

        <div className="mt-6 grid gap-px border hair bg-mint/25 sm:grid-cols-3">
          {copy.audience.map((item) => (
            <div key={item.title} className="bg-slate-canvas p-5">
              <p className="mono text-[9px] text-cream/40">USE_CASE</p>
              <h3 className="mt-4 font-display text-lg leading-snug">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/60">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="mt-14">
        <SectionHead
          index="04"
          label="PRICING"
          title={copy.pricingTitle}
          intro={copy.pricingIntro}
        />

        <div className="mt-6 border hair p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
          <div>
            <p className="mono text-[9px] text-cream/40">{copy.pricingLabel}</p>
            <p className="mt-3 font-display text-5xl leading-none text-lavender md:text-6xl">
              $9.99
            </p>
            <p className="mono mt-2 text-[9px] text-cream/45">{copy.pricingNote}</p>
          </div>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-8 border border-coral bg-coral px-6 py-4 mono text-[10px] text-slate-canvas transition-colors hover:bg-transparent hover:text-coral md:mt-0"
          >
            {copy.pricingButton}
            <span className="text-base transition-transform group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </a>
        </div>
      </section>

      <section id="contact" className="mt-14">
        <SectionHead
          index="05"
          label="CONTACT"
          title={copy.contactTitle}
          intro={copy.contactIntro}
        />

        <a
          href="mailto:contactus@movtrak.app"
          className="mono mt-5 inline-flex items-center gap-2 border-b border-mint pb-1 text-[10px] text-mint transition-colors hover:text-cream"
        >
          contactus@movtrak.app
          <span aria-hidden>→</span>
        </a>
      </section>
    </PageShell>
  )
}
