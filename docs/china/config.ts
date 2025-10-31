import { createRequire } from 'module'
import { defineAdditionalConfig, type DefaultTheme } from 'vitepress'

const require = createRequire(import.meta.url)
const pkg = require('vitepress/package.json')

export default defineAdditionalConfig({
  lang: 'zh-Hans',
  description: '由 Vite 和 Vue 驱动的静态站点生成器',

  themeConfig: {
    // logo: { icon: 'github', width: 24, height: 24 },
    sidebar: {
      '/china': { base: '/china', items: sidebarGuide() },
    },
  }
})


function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '中国哲学',
      collapsed: true,
      items: [
        { text: '核心概念', link: '/china' },
      ]
    },
  ]
}
