export type DocBlock =
  | { kind: 'p'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'groups'; items: { label: string; text: string }[] }
  | { kind: 'contact'; text: string; email: string }

export interface LegalSection {
  title: string
  blocks: DocBlock[]
}

export interface LegalDoc {
  title: string
  updated: string
  sections: LegalSection[]
}

const updated = '2026.10.13'

export const privacyDocs: Record<'zh' | 'en', LegalDoc> = {
  zh: {
    title: '隐私政策',
    updated,
    sections: [
      {
        title: '概览',
        blocks: [
          {
            kind: 'p',
            text: 'Movtrak（以下简称“我们”）尊重您的隐私。本隐私政策说明了当您使用我们的 Movtrak iOS 应用程序时，我们要如何处理您的信息。',
          },
          {
            kind: 'p',
            text: '**简而言之：** 我们不收集、存储或分享您的个人数据。Movtrak 旨在完全在您的设备上本地处理所有数据。',
          },
        ],
      },
      {
        title: '数据收集与使用',
        blocks: [
          {
            kind: 'p',
            text: 'Movtrak 不会收集、传输或在外部服务器上存储任何个人身份信息 (PII) 或使用数据。',
          },
          {
            kind: 'list',
            items: [
              '我们没有用户数据库。',
              '我们不跟踪您的位置（除了相机使用所需的系统权限外，我们不会记录）。',
              '我们不使用第三方分析服务来跟踪用户行为。',
            ],
          },
        ],
      },
      {
        title: '设备权限',
        blocks: [
          {
            kind: 'p',
            text: '为了正常运行，Movtrak 需要访问您设备上的某些功能。以下是我们请求这些权限的原因：',
          },
          {
            kind: 'groups',
            items: [
              {
                label: '相机 (Camera)',
                text: '仅用于实时拍摄视频和跟踪主体。所有图像处理都直接在您的 iPhone 处理器上进行。没有任何视频流会被发送到云端。',
              },
              {
                label: '麦克风 (Microphone)',
                text: '用于为您的视频录制音频。音频在本地处理并与您的视频同步。',
              },
              {
                label: '照片库 (Photo Library)',
                text: '仅用于将您制作的最终视频保存到设备的“相机胶卷”中。',
              },
            ],
          },
        ],
      },
      {
        title: '第三方服务与支付信息',
        blocks: [
          {
            kind: 'p',
            text: '本应用不集成第三方广告网络或数据追踪代理。所有应用内购买与付款均由 Apple App Store 独家安全处理。Movtrak 不会收集、访问或存储您的信用卡卡号、银行账户或账单信息。',
          },
        ],
      },
      {
        title: '儿童隐私',
        blocks: [
          {
            kind: 'p',
            text: '由于我们不收集个人数据，我们的应用适合所有年龄段的用户使用。我们不会有意收集 13 岁以下儿童的个人信息。',
          },
        ],
      },
      {
        title: '政策变更',
        blocks: [
          {
            kind: 'p',
            text: '我们可能会不时更新我们的隐私政策。我们会通过在此页面上发布新的隐私政策来通知您任何更改。建议您定期查看本隐私政策以了解任何变更。',
          },
        ],
      },
      {
        title: '联系我们',
        blocks: [
          {
            kind: 'contact',
            text: '如果您对本隐私政策有任何疑问，请联系我们：',
            email: 'contactus@movtrak.app',
          },
        ],
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    updated,
    sections: [
      {
        title: 'Overview',
        blocks: [
          {
            kind: 'p',
            text: 'Movtrak ("we", "our", or "us") respects your privacy. This Privacy Policy explains how we handle your information when you use our Movtrak iOS application.',
          },
          {
            kind: 'p',
            text: '**The short version:** We do not collect, store, or share your personal data. Movtrak is designed to process everything locally on your device.',
          },
        ],
      },
      {
        title: 'Data Collection and Usage',
        blocks: [
          {
            kind: 'p',
            text: 'Movtrak does not collect, transmit, or store any personal identification information (PII) or usage data on external servers.',
          },
          {
            kind: 'list',
            items: [
              'We do not have a user database.',
              'We do not track your location (other than what is required by the system for camera usage, which we do not record).',
              'We do not use third-party analytics services to track user behavior.',
            ],
          },
        ],
      },
      {
        title: 'Device Permissions',
        blocks: [
          {
            kind: 'p',
            text: 'To function, Movtrak requires access to certain features on your device. Here is why we ask for them:',
          },
          {
            kind: 'groups',
            items: [
              {
                label: 'Camera',
                text: "Used solely to capture video and track subjects in real-time. All image processing happens directly on your iPhone's processor. No video feed is ever sent to the cloud.",
              },
              {
                label: 'Microphone',
                text: 'Used to record audio for your videos. Audio is processed locally and synchronized with your video.',
              },
              {
                label: 'Photo Library',
                text: "Used only to save the final videos you create to your device's Camera Roll.",
              },
            ],
          },
        ],
      },
      {
        title: 'Third-Party Services & Payment Data',
        blocks: [
          {
            kind: 'p',
            text: 'The app does not integrate with third-party advertising networks or data tracking brokers. All In-App Purchases and payments are securely handled by Apple via the App Store. Movtrak does not collect, access, or store your credit card, bank account, or billing details.',
          },
        ],
      },
      {
        title: 'Children’s Privacy',
        blocks: [
          {
            kind: 'p',
            text: 'Since we do not collect personal data, our app is safe for use by all ages. We do not knowingly collect personal information from children under the age of 13.',
          },
        ],
      },
      {
        title: 'Changes to This Policy',
        blocks: [
          {
            kind: 'p',
            text: 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.',
          },
        ],
      },
      {
        title: 'Contact Us',
        blocks: [
          {
            kind: 'contact',
            text: 'If you have any questions about this Privacy Policy, please contact us at:',
            email: 'contactus@movtrak.app',
          },
        ],
      },
    ],
  },
}

export const termsDocs: Record<'zh' | 'en', LegalDoc> = {
  zh: {
    title: '服务条款',
    updated,
    sections: [
      {
        title: '引言',
        blocks: [
          {
            kind: 'p',
            text: '欢迎使用 Movtrak！本服务条款（以下简称“条款”）管辖您访问和使用 Movtrak iOS 应用程序（以下简称“应用”）的行为，该应用由 Movtrak（以下简称“我们”）提供。访问或使用本应用即表示您同意受本条款的约束。如果您不同意本条款，则不得使用本应用。',
          },
        ],
      },
      {
        title: '条款的接受',
        blocks: [
          {
            kind: 'p',
            text: '通过下载、安装或使用 Movtrak 应用，您确认同意受本条款以及所有适用法律和法规的约束。',
          },
        ],
      },
      {
        title: '应用使用许可',
        blocks: [
          {
            kind: 'p',
            text: '在您拥有或控制的 iOS 设备上，我们授予您有限的、非独占的、不可转让的、可撤销的许可，以根据本条款将 Movtrak 应用用于您的个人非商业目的。',
          },
        ],
      },
      {
        title: '免费试用与应用内购买 (In-App Purchases)',
        blocks: [
          {
            kind: 'p',
            text: 'Movtrak 采用“免费下载 + 7天免费试用 + 一次性买断制（Non-Consumable IAP）”的商业模式。',
          },
          {
            kind: 'list',
            items: [
              '**免费试用期：**新用户首次在设备上启动应用时，自动激活为期 7 个自然日的免费全功能试用。试用期内可无限制体验所有 AI 追踪与录制功能。',
              '**Movtrak Pro 终身买断：**试用期结束后，录制及相关专业功能需要购买 Movtrak Pro 终身版解锁。本应用为一次性买断制，非自动扣费订阅。购买成功后，费用将通过您的 Apple ID 账户收取，您将永久享有所有 Pro 功能与后续版本更新，无需任何后续扣费。',
              '**早期购买用户（老用户）：**在本次计费模式调整前（版本 1.0.2 及以前）已付费购买本应用的用户，系统将自动识别并终身保留 Pro 权益，无需再次付费。',
              '**恢复购买与退款：**您可在应用内“设置”中随时点击“恢复购买”。所有支付与退款均由 Apple App Store 统一管理并依据 Apple 媒体服务条款处理。',
            ],
          },
        ],
      },
      {
        title: '用户责任',
        blocks: [
          {
            kind: 'list',
            items: [
              '您对您使用本应用的行为以及您使用本应用创建的任何内容负责。',
              '您同意仅将本应用用于合法目的并遵守本条款。',
              '您全权负责确保您使用本应用及其创建的内容符合所有适用的法律、法规和规定，包括与隐私、知识产权和宣传相关的规定。',
            ],
          },
        ],
      },
      {
        title: '知识产权',
        blocks: [
          {
            kind: 'list',
            items: [
              '本应用及其原始内容、功能和特性是 Movtrak 及其许可方的独家财产并将保持不变。',
              '您的内容，包括使用本应用创建的视频和图像，仍归您所有。我们不主张拥有您的内容。',
            ],
          },
        ],
      },
      {
        title: '禁止行为',
        blocks: [
          { kind: 'p', text: '您同意不进行以下行为：' },
          {
            kind: 'list',
            items: [
              '将本应用用于任何非法或未经授权的目的。',
              '对本应用的任何部分进行逆向工程、反编译或反汇编。',
              '干扰或破坏本应用的完整性或性能。',
              '试图未经授权访问本应用或其相关系统或网络。',
            ],
          },
        ],
      },
      {
        title: '免责声明',
        blocks: [
          {
            kind: 'p',
            text: '本应用按“原样”和“可用”状态提供。Movtrak 不作任何明示或暗示的保证，特此声明放弃所有其他保证，包括但不限于适销性、特定用途适用性、不侵犯知识产权或其他侵犯权利的暗示保证。',
          },
        ],
      },
      {
        title: '责任限制',
        blocks: [
          {
            kind: 'p',
            text: '在任何情况下，Movtrak 或其供应商均不对因使用或无法使用本应用而造成的任何损害（包括但不限于数据或利润损失，或因业务中断造成的损害）承担责任，即使 Movtrak 或 Movtrak 授权代表已被口头或书面告知此类损害的可能性。',
          },
        ],
      },
      {
        title: '赔偿',
        blocks: [
          {
            kind: 'p',
            text: '您同意赔偿、辩护并使 Movtrak 及其管理人员、董事、员工和代理人免受因您访问或使用本应用而引起或以任何方式与之相关的任何及所有索赔、责任、损害、损失或费用（包括合理的律师费和成本）的损害。',
          },
        ],
      },
      {
        title: '条款修改',
        blocks: [
          {
            kind: 'p',
            text: '我们保留随时自行决定修改或替换这些条款的权利。我们将通过在此页面上发布新条款来通知您任何更改。在这些修订生效后，您继续访问或使用我们的应用即表示您同意受修订条款的约束。',
          },
        ],
      },
      {
        title: '适用法律',
        blocks: [
          {
            kind: 'p',
            text: '本条款应受适用法律管辖并据其解释，不考虑其法律冲突规定。',
          },
        ],
      },
      {
        title: '联系我们',
        blocks: [
          {
            kind: 'contact',
            text: '如果您对这些条款有任何疑问，请通过以下方式联系我们：',
            email: 'contactus@movtrak.app',
          },
        ],
      },
    ],
  },
  en: {
    title: 'Terms of Service',
    updated,
    sections: [
      {
        title: 'Introduction',
        blocks: [
          {
            kind: 'p',
            text: 'Welcome to Movtrak! These Terms of Service ("Terms") govern your access to and use of the Movtrak iOS application (the "App"), provided by Movtrak ("we", "our", or "us"). By accessing or using the App, you agree to be bound by these Terms. If you do not agree to these Terms, you may not use the App.',
          },
        ],
      },
      {
        title: 'Acceptance of Terms',
        blocks: [
          {
            kind: 'p',
            text: 'By downloading, installing, or using the Movtrak App, you confirm your agreement to be bound by these Terms and all applicable laws and regulations.',
          },
        ],
      },
      {
        title: 'License to Use the App',
        blocks: [
          {
            kind: 'p',
            text: 'We grant you a limited, non-exclusive, non-transferable, revocable license to use the Movtrak App for your personal, non-commercial purposes on an iOS device that you own or control, subject to these Terms.',
          },
        ],
      },
      {
        title: 'Free Trial and In-App Purchases',
        blocks: [
          {
            kind: 'p',
            text: 'Movtrak operates on a "Free Download + 7-Day Free Trial + Lifetime Non-Consumable In-App Purchase" model.',
          },
          {
            kind: 'list',
            items: [
              '**7-Day Free Trial:** New users are granted an automatic 7-day full access trial starting from the initial launch of the App on their device. During the trial period, all AI tracking and recording features are fully available.',
              '**Movtrak Pro (Lifetime Unlock):** After the 7-day trial expires, video recording and related premium features require unlocking Movtrak Pro. Movtrak Pro is a one-time, non-consumable purchase — NOT a recurring subscription. Payment is charged to your Apple ID account upon confirmation. Once unlocked, you have permanent access to all Pro features and future updates without recurring fees.',
              '**Early Supporters:** Users who previously purchased Movtrak before this model transition (Version 1.0.2 / Build 1 and earlier) are automatically grandfathered and granted full lifetime Pro access at no additional charge.',
              '**Restore Purchases & Refunds:** You may restore your previous purchases anytime via the "Restore Purchases" button in Settings. All billing and refunds are processed by the Apple App Store in accordance with Apple Media Services Terms and Conditions.',
            ],
          },
        ],
      },
      {
        title: 'User Responsibilities',
        blocks: [
          {
            kind: 'list',
            items: [
              'You are responsible for your use of the App and any content you create with it.',
              'You agree to use the App only for lawful purposes and in accordance with these Terms.',
              'You are solely responsible for ensuring that your use of the App and the content you create complies with all applicable laws, rules, and regulations, including those related to privacy, intellectual property, and publicity.',
            ],
          },
        ],
      },
      {
        title: 'Intellectual Property',
        blocks: [
          {
            kind: 'list',
            items: [
              'The App and its original content, features, and functionality are and will remain the exclusive property of Movtrak and its licensors.',
              'Your content, including videos and images created with the App, remains your property. We do not claim ownership over your content.',
            ],
          },
        ],
      },
      {
        title: 'Prohibited Conduct',
        blocks: [
          { kind: 'p', text: 'You agree not to:' },
          {
            kind: 'list',
            items: [
              'Use the App for any illegal or unauthorized purpose.',
              'Reverse engineer, decompile, or disassemble any part of the App.',
              'Interfere with or disrupt the integrity or performance of the App.',
              'Attempt to gain unauthorized access to the App or its related systems or networks.',
            ],
          },
        ],
      },
      {
        title: 'Disclaimer of Warranties',
        blocks: [
          {
            kind: 'p',
            text: 'The App is provided on an "AS IS" and "AS AVAILABLE" basis. Movtrak makes no warranties, expressed or implied, and hereby disclaims all other warranties, including without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
          },
        ],
      },
      {
        title: 'Limitation of Liability',
        blocks: [
          {
            kind: 'p',
            text: 'In no event shall Movtrak or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the App, even if Movtrak or a Movtrak authorized representative has been notified orally or in writing of the possibility of such damage.',
          },
        ],
      },
      {
        title: 'Indemnification',
        blocks: [
          {
            kind: 'p',
            text: "You agree to indemnify, defend, and hold harmless Movtrak and its officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, or expenses, including reasonable attorneys' fees and costs, arising out of or in any way connected with your access to or use of the App.",
          },
        ],
      },
      {
        title: 'Modifications to Terms',
        blocks: [
          {
            kind: 'p',
            text: 'We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page. By continuing to access or use our App after those revisions become effective, you agree to be bound by the revised terms.',
          },
        ],
      },
      {
        title: 'Governing Law',
        blocks: [
          {
            kind: 'p',
            text: 'These Terms shall be governed and construed in accordance with applicable laws, without regard to its conflict of law provisions.',
          },
        ],
      },
      {
        title: 'Contact Us',
        blocks: [
          {
            kind: 'contact',
            text: 'If you have any questions about these Terms, please contact us at:',
            email: 'contactus@movtrak.app',
          },
        ],
      },
    ],
  },
}
