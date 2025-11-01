import { createRequire } from "module";
import { defineAdditionalConfig, type DefaultTheme } from "vitepress";
import { defineConfig } from "vitepress";

const require = createRequire(import.meta.url);
// const pkg = require('package.json')

export default defineAdditionalConfig({
  lang: "zh-CN",
  description: "基于Vite & Vue 驱动的个人静态网站。",
  themeConfig: {
    nav: nav(),
    logo: { icon: "github", width: 24, height: 24, link: "/" },
    search: { options: searchOptions() },
    logoLink: "https://gwdgithubnom.github.io/",
    sidebar: {
      "/guide/": { base: "/guide/", items: sidebarGuide() },
      "/reference/": { base: "/reference/", items: sidebarReference() },
    },

    editLink: {
      pattern:
        "https://github.com/gwdgithubnom/gwdgithubnom.github.io/edit/main/docs/:path",
      text: "在 GitHub 上编辑此页面",
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      label: "页面导航",
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },
    notFound: {
      title: "页面未找到",
      quote:
        "但如果你不改变方向，并且继续寻找，你可能最终会到达你所前往的地方。",
      linkLabel: "前往首页",
      linkText: "带我回首页",
    },

    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    skipToContentLabel: "跳转到内容",

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025-present Evan You & Gong Wendong",
    },
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    // {
    //   text: '站点参考',
    //   link: '/reference/site-config',
    //   activeMatch: '/reference/'
    // },
    {
      text: "个人动态",
      items: [{ text: "最近更新", link: "/recent/update/list" }],
    },
    {
      // pkg.version
      text: "关于站点",
      items: [
        { text: "站点指南", link: "/zh/guide/what-is-vitepress" },
        { text: "站点参考", link: "/zh/reference/site-config" },
        {
          text: "站点引用",
          link: "https://github.com/vuejs/vitepress/blob/main/.github/contributing.md",
        },
        {
          text: "变更日志",
          link: "https://github.com/vuejs/vitepress/blob/main/CHANGELOG.md",
        },
      ],
    },
  ];
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Introduction",
      collapsed: true,
      items: [
        { text: "What is VitePress?", link: "what-is-vitepress" },
        { text: "Getting Started", link: "getting-started" },
        { text: "Routing", link: "routing" },
        { text: "Deploy", link: "deploy" },
      ],
    },
    {
      text: "Writing",
      collapsed: true,
      items: [
        { text: "Markdown Extensions", link: "markdown" },
        { text: "Asset Handling", link: "asset-handling" },
        { text: "Frontmatter", link: "frontmatter" },
        { text: "Using Vue in Markdown", link: "using-vue" },
        { text: "Internationalization", link: "i18n" },
      ],
    },
    {
      text: "Customization",
      collapsed: true,
      items: [
        { text: "Using a Custom Theme", link: "custom-theme" },
        {
          text: "Extending the Default Theme",
          link: "extending-default-theme",
        },
        { text: "Build-Time Data Loading", link: "data-loading" },
        { text: "SSR Compatibility", link: "ssr-compat" },
        { text: "Connecting to a CMS", link: "cms" },
      ],
    },
    {
      text: "Experimental",
      collapsed: true,
      items: [
        { text: "MPA Mode", link: "mpa-mode" },
        { text: "Sitemap Generation", link: "sitemap-generation" },
      ],
    },
    {
      text: "Config & API Reference",
      base: "/reference/",
      link: "site-config",
    },
  ];
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Site Reference",
      items: [
        { text: "Site Config", link: "site-config" },
        { text: "Frontmatter Config", link: "frontmatter-config" },
        { text: "Runtime API", link: "runtime-api" },
        { text: "CLI", link: "cli" },
        {
          text: "Default Theme",
          base: "/reference/default-theme-",
          items: [
            { text: "Overview", link: "config" },
            { text: "Nav", link: "nav" },
            { text: "Sidebar", link: "1sidebar" },
            { text: "Home Page", link: "home-page" },
            { text: "Footer", link: "footer" },
            { text: "Layout", link: "layout" },
            { text: "Badge", link: "badge" },
            { text: "Team Page", link: "team-page" },
            { text: "Prev / Next Links", link: "prev-next-links" },
            { text: "Edit Link", link: "edit-link" },
            { text: "Last Updated Timestamp", link: "last-updated" },
            { text: "Search", link: "search" },
            { text: "Carbon Ads", link: "carbon-ads" },
          ],
        },
      ],
    },
  ];
}

function searchOptions(): Partial<DefaultTheme.AlgoliaSearchOptions> {
  return {
    placeholder: "搜索文档",
    translations: {
      button: {
        buttonText: "搜索文档",
        buttonAriaLabel: "搜索文档",
      },
      modal: {
        searchBox: {
          clearButtonTitle: "清除查询条件",
          clearButtonAriaLabel: "清除查询条件",
          closeButtonText: "关闭",
          closeButtonAriaLabel: "关闭",
          placeholderText: "搜索文档",
          placeholderTextAskAi: "向 AI 提问：",
          placeholderTextAskAiStreaming: "回答中...",
          searchInputLabel: "搜索",
          backToKeywordSearchButtonText: "返回关键字搜索",
          backToKeywordSearchButtonAriaLabel: "返回关键字搜索",
        },
        startScreen: {
          recentSearchesTitle: "搜索历史",
          noRecentSearchesText: "没有搜索历史",
          saveRecentSearchButtonTitle: "保存至搜索历史",
          removeRecentSearchButtonTitle: "从搜索历史中移除",
          favoriteSearchesTitle: "收藏",
          removeFavoriteSearchButtonTitle: "从收藏中移除",
          recentConversationsTitle: "最近的对话",
          removeRecentConversationButtonTitle: "从历史记录中删除对话",
        },
        errorScreen: {
          titleText: "无法获取结果",
          helpText: "你可能需要检查你的网络连接",
        },
        noResultsScreen: {
          noResultsText: "无法找到相关结果",
          suggestedQueryText: "你可以尝试查询",
          reportMissingResultsText: "你认为该查询应该有结果？",
          reportMissingResultsLinkText: "点击反馈",
        },
        resultsScreen: {
          askAiPlaceholder: "向 AI 提问： ",
        },
        askAiScreen: {
          disclaimerText: "答案由 AI 生成，可能不准确，请自行验证。",
          relatedSourcesText: "相关来源",
          thinkingText: "思考中...",
          copyButtonText: "复制",
          copyButtonCopiedText: "已复制！",
          copyButtonTitle: "复制",
          likeButtonTitle: "赞",
          dislikeButtonTitle: "踩",
          thanksForFeedbackText: "感谢你的反馈！",
          preToolCallText: "搜索中...",
          duringToolCallText: "搜索 ",
          afterToolCallText: "已搜索",
          aggregatedToolCallText: "已搜索",
        },
        footer: {
          selectText: "选择",
          submitQuestionText: "提交问题",
          selectKeyAriaLabel: "Enter 键",
          navigateText: "切换",
          navigateUpKeyAriaLabel: "向上箭头",
          navigateDownKeyAriaLabel: "向下箭头",
          closeText: "关闭",
          backToSearchText: "返回搜索",
          closeKeyAriaLabel: "Esc 键",
          poweredByText: "搜索提供者",
        },
      },
    },
  };
}
