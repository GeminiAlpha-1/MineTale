import { defineTeekConfig } from "vitepress-theme-teek/config";
import { version } from "vitepress-theme-teek/es/version";

export const teekConfig = defineTeekConfig({
  teekHome: true, // 是否启用 Teek 的首页风格（博客风格）
  vpHome: false, // 是否隐藏 VP 首页
  loading: true,
  sidebarTrigger: true, // 是否开启侧边栏折叠功能
  author: { name: "MineTale", link: "https://github.com/GeminiAlpha-1" },
  wallpaper: {
    enabled: false,
    hideBanner: true
  },
  // 站点分析配置
  siteAnalytics: [
    { provider: "google", options: { id: "G-E4KK2M4V47" } },
    { provider: "baidu", options: { id: "a8cc7d1a22ec067b8b4bb0e237953a66" } },
  ],
  footerInfo: {
    theme: {
      name: `Theme By Teek@${version}`,
    },
    copyright: {
      createYear: 2020,
      suffix: "Mcoo 墨客小筑",
    },
    customHtml: "<span id=\"runtime\"></span>",
    topMessage: [] // 清空徽章徽标
  },
  docAnalysis: {
    createTime: "2025-12-13",
    statistics: {
      provider: "busuanzi"
    }
  },
  friendLink: {
    list: [
      {
        name: "Mcoo墨客小筑",
        desc: "综合性的文档站，什么都会写一点",
        avatar: "/logo.png",
        link: "http://www.mcoo.top/"
      }
    ],
    autoScroll: true
  },
  social: [], // 清空社交媒体图标
  post: {
    postStyle: "card"
  },
  homeCardListPosition: "left",
  // 隐藏首页 banner
  banner: {
    enabled: false
  },
  codeBlock: {
    copiedDone: (TkMessage) => TkMessage.success("复制成功！"),
  },
  articleShare: { enabled: true },
  articleAnalyze: {
    showInfo: true,
    showIcon: true,
    wordCount: true,
    readingTime: true
  },
  vitePlugins: {
    sidebarOption: {
      initItems: false,
    },
    permalink: true,
    permalinkOption: {},
    docAnalysis: true,
    docAnalysisOption: {
      include: ['**/*.md'],
      exclude: ['@pages/**/*.md', '**/.vitepress/**/*.md'],
      // 确保Mcoo目录下的文章被包含在分析中
      // 启用字数统计和阅读时间计算
      wordCount: true,
      readingTime: true
    }
  },
});
