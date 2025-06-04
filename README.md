# 统一收款界面

一个基于 Next.js 和 shadcn/ui 构建的现代化统一收款界面，支持多种支付方式。

## 功能特性

- 🎨 现代化 UI 设计，基于 shadcn/ui 组件库
- 📱 响应式设计，支持移动端和桌面端
- 💳 支持多种支付方式：
  - 支付宝
  - 微信支付
  - USDT (TRC20)
  - 比特币 (BTC)
  - 以太坊 (ETH)
- 📋 一键复制钱包地址
- 🔄 标签页切换支付方式

## 快速开始

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 自定义配置

### 配置支付方式

本项目使用配置文件来管理支付方式，您可以轻松添加、修改或禁用支付选项。

**配置文件位置：** `src/config/payment-config.ts`

**详细配置说明：** 请查看 [PAYMENT_CONFIG.md](./PAYMENT_CONFIG.md)

### 快速配置步骤

1. **添加收款码图片**
   - 将您的收款码图片放入 `public` 目录
   - 支持 PNG、JPG、SVG 格式

2. **更新配置文件**
   ```typescript
   // 编辑 src/config/payment-config.ts
   {
     id: "alipay",
     name: "支付宝",
     description: "使用支付宝扫码支付",
     type: "qrcode",
     qrCodeUrl: "/your-alipay-qr.png", // 更新为您的图片路径
     enabled: true
   }
   ```

3. **配置钱包地址**
   ```typescript
   {
     id: "usdt",
     name: "USDT",
     description: "USDT-TRC20",
     type: "address",
     address: "您的实际USDT地址", // 替换为真实地址
     enabled: true
   }
   ```

### 配置特性

- ✅ **类型安全**：TypeScript 类型检查
- ✅ **灵活配置**：支持二维码和地址两种类型
- ✅ **启用控制**：可单独启用/禁用每个支付方式
- ✅ **易于扩展**：轻松添加新的支付方式

## 项目结构

```
├── src/
│   ├── app/
│   │   ├── globals.css      # 全局样式
│   │   ├── layout.tsx       # 根布局
│   │   └── page.tsx         # 主页面
│   ├── components/
│   │   ├── ui/              # shadcn/ui 组件
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── tabs.tsx
│   │   └── payment-collection.tsx  # 收款界面组件
│   ├── config/
│   │   └── payment-config.ts # 支付方式配置文件 ⭐
│   └── lib/
│       └── utils.ts         # 工具函数
├── public/                  # 静态资源（放置收款码图片）
├── PAYMENT_CONFIG.md        # 配置说明文档 ⭐
├── package.json
├── tailwind.config.js       # Tailwind CSS 配置
└── tsconfig.json           # TypeScript 配置
```

## 技术栈

- **框架**: Next.js 14
- **UI 库**: shadcn/ui
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **语言**: TypeScript

## 部署

### Vercel 部署

最简单的部署方式是使用 [Vercel Platform](https://vercel.com/new)。

### 其他平台

```bash
npm run build
npm run start
```

## 许可证

MIT License