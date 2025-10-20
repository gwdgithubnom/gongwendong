import { defineConfig } from 'vitepress'
import { shared } from './config/shared'
import { en } from './config/en'
import { zh } from './config/zh'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'

export default defineConfig({
  ...shared,
  markdown: {
    codeTransformers: [
      transformerTwoslash()
    ],
    // Explicitly load these languages for types highlighting
    languages: ['js', 'jsx', 'ts', 'tsx']
  },
  locales: {
    root: { label: 'English', ...en },
    zh: { label: '简体中文', ...zh }
  }
})
