import { defineConfig } from 'vitepress'
import shikiTwoslash from 'vitepress-plugin-shiki-twoslash'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'

// https://vitepress.vuejs.org/config/app-configs
// export default withTwoslash(
//     defineConfig({
//     title: '我的文档', 
//     description: '文档描述', 
//     themeConfig: {
//       nav: [
//         { text: '我的首页', link: '/' },
//         { text: '使用指南', link: '/index/' },
//       ],

//       sidebar: {
//         '/前言/': [
//           { text: '使用指南', link: '/index/' },
//           { text: '高级功能', link: '/index/china' }, 
//         ],
//       },
//     },
//   })
// )
export default defineConfig({
    title: '我的文档', 
    description: '文档描述', 
    markdown: {
      math: true,
      codeTransformers: [
        transformerTwoslash() 
      ],
      // Explicitly load these languages for types hightlighting
      languages: ['js', 'jsx', 'ts', 'tsx']
    },
    themeConfig: {
      nav: [
        { text: '我的首页', link: '/' },
        { text: '使用指南', link: '/index/' },
      ],

      sidebar: {
        '/前言/': [
          { text: '使用指南', link: '/index/' },
          { text: '高级功能', link: '/index/china' }, 
        ],
      },
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  })