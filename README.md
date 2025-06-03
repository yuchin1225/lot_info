# 顯示停車場剩餘車位監控介面

## 簡介

這是一個專為應用材料公司設計的停車場車位監控系統，提供清晰、直觀的實時車位資訊顯示。針對 1200 × 1920 高解析度顯示器優化，適合作為停車場入口的資訊看板使用。

## ✨ 功能特色

### 🎯 核心功能
- **實時車位顯示**：大字體顯示剩餘車位數量
- **總車位資訊**：完整的停車場容量資訊
- **狀態指示**：根據車位充足程度自動變色
- **自動刷新**：每30秒自動更新資料
- **進度條視覺化**：直觀顯示車位使用情況

## 🛠️ 技術棧

- **框架**：[Next.js 15] (App Router)
- **語言**：TypeScript
- **樣式**：Tailwind CSS
- **數據庫**：MySQL (使用 mysql2)
- **開發工具**：ESLint, PostCSS
- **字體**：Geist Sans & Geist Mono

## 🚀 快速開始

### 環境要求
- Node.js 18+ 
- npm/yarn/pnpm
- MySQL 數據庫

### 安裝步驟

1. **複製項目**
```bash
git clone <repository-url>
cd lot_info
```

2. **安裝依賴**
```bash
npm install
# 或
yarn install
# 或
pnpm install
```

3. **設置環境變數** (可選)
```bash
# 創建 .env.local 檔案
cp .env.example .env.local
```

4. **啟動開發伺服器**
```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

5. **開啟瀏覽器**
訪問 [http://localhost:3000](http://localhost:3000) 查看效果


## 📁 項目結構

```
lot_info/
├── src/
│   ├── app/
│   │   ├── page.tsx          # 主顯示頁面
│   │   ├── layout.tsx        # 應用佈局
│   │   ├── globals.css       # 全域樣式
│   │   └── api/              # API 路由
│   └── lib/                  # 工具函數
├── public/                   # 靜態資源
├── tailwind.config.ts        # Tailwind 配置
├── next.config.ts           # Next.js 配置
└── package.json             # 依賴管理
```

6. **部署**
```bash
pm2 start pm2.config.js --env production
```