import { h } from 'vue'
import Theme from 'vitepress/theme'
import 'virtual:group-icons.css'
import './styles.css'
import GiscusComment from './components/GiscusComment.vue'

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // 在文档末尾添加评论组件
      'doc-after': () => h(GiscusComment)
    })
  }
}