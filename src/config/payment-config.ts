export interface PaymentMethodConfig {
  id: string
  name: string
  description: string
  type: 'qrcode' | 'address' | 'bankcard'
  qrCodeUrl?: string
  address?: string
  bankCardNumber?: string
  bankName?: string
  accountName?: string
  enabled: boolean
}

// 网站配置接口
export interface SiteConfig {
  title: string           // 网站标题（显示在浏览器标签页）
  description: string     // 网站描述
  favicon?: string        // 网站图标路径
  pageTitle: string       // 页面H1标题
  pageDescription: string // 页面描述
  thankYouText: string    // 感谢文本
  enableThemeToggle: boolean // 是否启用主题切换按钮
  defaultTheme: 'light' | 'dark' | 'system' // 默认主题
}

// 网站配置
// 您可以在这里自定义网站的基本信息
export const siteConfig: SiteConfig = {
  title: "赞助给 AcoFork",
  description: "赞助给 AcoFork - 支持多种支付方式的统一赞助界面",
  favicon: "https://q2.qlogo.cn/headimg_dl?dst_uin=2726730791&spec=5", // 可以替换为您的图标路径
  pageTitle: "赞助给 AcoFork",
  pageDescription: "请选择您的赞助方式",
  thankYouText: "感谢您的赞助！",
  enableThemeToggle: true, // 启用主题切换按钮
  defaultTheme: "system" // 默认跟随系统主题
}

// 支付方式配置
// 您可以在这里自定义每个支付方式的设置
export const paymentConfig: PaymentMethodConfig[] = [
  {
    id: "alipay",
    name: "支付宝",
    description: "请使用支付宝扫码赞助",
    type: "qrcode",
    qrCodeUrl: "/alipay.svg", // 替换为您的支付宝收款码路径
    enabled: true
  },
  {
    id: "wechat",
    name: "微信支付",
    description: "请使用微信扫码赞助",
    type: "qrcode",
    qrCodeUrl: "/wechat.svg", // 替换为您的微信收款码路径
    enabled: true
  },
  {
    id: "bankcard",
    name: "境内汇款",
    description: "请使用境内银行卡转账赞助",
    type: "bankcard",
    bankCardNumber: "6217211302009309146", // 替换为您的银行卡号
    bankName: "中国工商银行", // 替换为您的银行名称
    accountName: "胡丁", // 替换为您的账户名
    enabled: true
  }
]

// 获取启用的支付方式
export const getEnabledPaymentMethods = (): PaymentMethodConfig[] => {
  return paymentConfig.filter(method => method.enabled)
}

// 根据ID获取支付方式
export const getPaymentMethodById = (id: string): PaymentMethodConfig | undefined => {
  return paymentConfig.find(method => method.id === id)
}
