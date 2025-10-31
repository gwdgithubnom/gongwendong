import Theme from 'vitepress/theme'
import 'virtual:group-icons.css'
import './styles.css'
import GiscusComment from './components/GiscusComment.vue'
import RecentUpdates from './components/RecentUpdates.vue'

// Import Vue's h function
import { h } from 'vue'

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // Add comment component at the end of the document
      'doc-after': () => h(GiscusComment)
    })
  },
  // Register components globally
  enhanceApp({ app }) {
    // Register RecentUpdates component globally so it can be used in any Markdown file
    app.component('RecentUpdates', RecentUpdates)
  }
}