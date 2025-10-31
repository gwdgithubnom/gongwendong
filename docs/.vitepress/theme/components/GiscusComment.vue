<script setup lang="ts">
import { onMounted } from 'vue'
import { useData } from 'vitepress'

const { page, lang } = useData() 
const currentLang = lang.value || 'zh-CN'

onMounted(() => {
  // 动态加载 giscus 脚本
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', 'gwdgithubnom/gongwendong')
  script.setAttribute('data-repo-id', 'MDEwOlJlcG9zaXRvcnkyODE5MDcxNTE=')
  script.setAttribute('data-category', 'Comment&评论')
  script.setAttribute('data-category-id', 'DIC_kwDOEM2Pz84CxQNI')
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', 'preferred_color_scheme')
  script.setAttribute('data-lang', currentLang === 'en' ? 'en' : 'zh-CN')
  script.setAttribute('crossorigin', 'anonymous')
  script.async = true
  
  // 添加到 giscus 容器
  const container = document.getElementById('giscus-container')
  if (container) {
    container.appendChild(script)
  }
})
</script>

<template>
  <div class="giscus-comment">
    <div class="giscus-comment__title">
      <h3>💬 评论区</h3>
    </div>
    <div id="giscus-container"></div>
  </div>
</template>

<style scoped>
.giscus-comment {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eaeaea;
}

.giscus-comment__title h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
}

#giscus-container {
  width: 100%;
}
</style>