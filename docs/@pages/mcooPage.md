---
title: Mcoo工程
permalink: /mcoo
layout: page
article: false
sidebar: false
---

<div class="page-header">
  <h1 class="page-title">Mcoo 档案馆</h1>
  <p class="page-description">👋欢迎来到 Mcoo档案馆</p>
</div>

<style scoped>
.page-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-top: 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  background: #8360c3;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, rgb(131, 96, 195), rgb(46, 191, 145));  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, rgb(131, 96, 195), rgb(46, 191, 145)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
  line-height: 1.3;
  padding: 0.2em 0;
  position: relative;
  z-index: 1;
}

.page-description {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.mcoo-post-list {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 1000px;
  padding-left: 1rem;
  padding-right: 1rem;
}

.mcoo-post-item {
  margin-bottom: 24px;
  padding: 20px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  transition: all 0.3s ease;
  cursor: pointer;
}

.mcoo-post-item:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.mcoo-post-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--vp-c-brand);
}

.mcoo-post-title a {
  text-decoration: none;
  color: inherit;
}

.mcoo-post-title a:hover {
  text-decoration: underline;
}

.mcoo-post-meta {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-bottom: 12px;
}

.mcoo-post-author,
.mcoo-post-date,
.mcoo-post-word-count {
  display: inline-block;
  margin-right: 16px;
}

.mcoo-post-author {
  font-weight: 500;
}

.mcoo-post-description {
  font-size: 15px;
  color: var(--vp-c-text-1);
  line-height: 1.6;
  white-space: pre-line; /* 保留换行符，但折叠连续的空白字符 */
  word-wrap: break-word; /* 允许长单词或URL在必要时换行 */
  overflow-wrap: break-word; /* 现代浏览器的属性 */
}

.mcoo-post-date {
  display: inline-block;
  margin-right: 16px;
}

.mcoo-post-category {
  display: inline-block;
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  margin-right: 8px;
}

.mcoo-post-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  margin-right: 8px;
  margin-bottom: 4px;
}

.post-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-header {
    padding-top: 1.5rem;
  }
  
  .page-title {
    font-size: 1.75rem;
  }
  
  .mcoo-post-list {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  
  .mcoo-post-item {
    padding: 16px;
  }
}

@media (max-width: 480px) {
  .page-header {
    padding-top: 1rem;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
  
  .mcoo-post-list {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  
  .mcoo-post-item {
    padding: 12px;
  }
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import { useData } from 'vitepress'

// 获取VitePress的主题状态
const { isDark } = useData()

// 标签颜色缓存
const tagColorCache = new Map()

// Mcoo工程文章列表
const mcooPosts = ref([])

onMounted(async () => {
  try {
    // 使用Vite的import.meta.glob功能读取02.Mcoo目录下的所有md文件
    const modules = import.meta.glob('../02.Mcoo/*.md', { query: '?raw', import: 'default' })
    
    console.log('Found modules:', Object.keys(modules))
    
    const posts = []
    
    // 遍历所有文件并解析frontmatter
    for (const path in modules) {
      try {
          const content = await modules[path]()
          console.log(`Processing file: ${path}`)
          console.log(`Content preview:`, content.substring(0, 200))
          
          // 提取frontmatter - 修复正则表达式以匹配不同换行符格式
          const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
          if (frontmatterMatch) {
            const frontmatterStr = frontmatterMatch[1]
            console.log(`Frontmatter string:`, frontmatterStr)
            console.log(`Frontmatter string (JSON):`, JSON.stringify(frontmatterStr))
            
            // 尝试使用更简单的方法解析多行描述
            // 使用字符串分割来查找description字段
            let description = '暂无描述'
            const lines = frontmatterStr.split(/\r?\n/)
            
            // 查找description行
            let descriptionIndex = -1
            for (let i = 0; i < lines.length; i++) {
              if (lines[i].startsWith('description:')) {
                descriptionIndex = i
                break
              }
            }
            
            if (descriptionIndex >= 0) {
              const descriptionLine = lines[descriptionIndex]
              console.log(`Found description line:`, descriptionLine)
              
              // 检查是否是多行描述（以|或>结尾）
              if (descriptionLine.endsWith('|') || descriptionLine.endsWith('>')) {
                console.log(`Processing multi-line description`)
                const multiLines = []
                
                // 从description的下一行开始收集内容
                for (let i = descriptionIndex + 1; i < lines.length; i++) {
                  const line = lines[i]
                  
                  // 如果遇到新的字段，停止收集
                  if (line.match(/^[a-zA-Z_-]+:/)) {
                    break
                  }
                  
                  // 只添加非空行
                  if (line.trim() !== '') {
                    multiLines.push(line.trim())
                  }
                }
                
                description = multiLines.join('\n')
                console.log(`Extracted multi-line description:`, JSON.stringify(description))
              } else {
                // 单行描述
                description = descriptionLine.substring(12).trim().replace(/^["']|["']$/g, '')
                console.log(`Extracted single-line description:`, description)
              }
            } else {
              console.log(`No description field found in frontmatter`)
            }
            
            // 简单解析其他frontmatter字段
            const titleMatch = frontmatterStr.match(/title:\s*(.+)/)
            const title = titleMatch ? titleMatch[1].trim().replace(/^["']|["']$/g, '') : ''
            
            const dateMatch = frontmatterStr.match(/date:\s*(.+)/)
            const date = dateMatch ? dateMatch[1].trim().replace(/^["']|["']$/g, '') : ''
            
            const authorMatch = frontmatterStr.match(/author:\s*(.+)/)
            const author = authorMatch ? authorMatch[1].trim().replace(/^["']|["']$/g, '') : ''
            
            const permalinkMatch = frontmatterStr.match(/permalink:\s*(.+)/)
            const permalink = permalinkMatch ? permalinkMatch[1].trim().replace(/^["']|["']$/g, '') : ''
            
            const articleMatch = frontmatterStr.match(/article:\s*(.+)/)
            const article = articleMatch ? articleMatch[1].trim().replace(/^["']|["']$/g, '') : ''
            
            // 解析categories
            const categoriesMatch = frontmatterStr.match(/categories:\s*\n((?:\s*-\s*.+\r?\n?)*)/)
            const categories = categoriesMatch 
              ? categoriesMatch[1].split(/\r?\n/).filter(line => line.trim().startsWith('-')).map(line => line.trim().substring(1).trim())
              : []
            
            // 解析tags
            const tagsMatch = frontmatterStr.match(/tags:\s*\n((?:\s*-\s*.+\r?\n?)*)/)
            const tags = tagsMatch 
              ? tagsMatch[1].split(/\r?\n/).filter(line => line.trim().startsWith('-')).map(line => line.trim().substring(1).trim())
              : []
            
            const frontmatter = {
              title,
              date,
              author,
              permalink,
              article,
              description,
              categories,
              tags
            }
            
            console.log(`Parsed frontmatter for ${path}:`, frontmatter)
            console.log(`Description value:`, JSON.stringify(frontmatter.description))
            
            // 只包含设置了article: false的文章
            if (frontmatter.article === 'false') {
              console.log('Article condition met, creating post object')
              // 提取文件名作为标题后备
              const fileName = path.split('/').pop()?.replace('.md', '') || ''
              
              // 构建文章对象
            const post = {
              title: frontmatter.title || fileName,
              link: frontmatter.permalink || `/02.Mcoo/${fileName}`,
              date: frontmatter.date || '2025-12-23',
              author: frontmatter.author || 'MineTale',
              category: frontmatter.categories?.[0] || 'Mcoo',
              tags: frontmatter.tags || [],
              description: frontmatter.description || '暂无描述',
              // 用于排序
              timestamp: new Date(frontmatter.date || '2025-12-23').getTime()
            }
            
            console.log(`Created post:`, post)
            console.log(`File path: ${path}, File name: ${fileName}, Permalink: ${frontmatter.permalink}, Final link: ${post.link}`)
              
              console.log('Adding post:', post)
              posts.push(post)
            } else {
              console.log(`Article condition not met, frontmatter.article = ${frontmatter.article}`)
            }
          } else {
            console.log(`No frontmatter found in ${path}`)
          }
        } catch (error) {
          console.error(`Error processing file ${path}:`, error)
        }
    }
    
    // 按时间排序（最新的在前）
    posts.sort((a, b) => b.timestamp - a.timestamp)
    
    console.log('Final posts array:', posts)
    
    mcooPosts.value = posts
  } catch (error) {
    console.error('Error loading posts:', error)
    // 如果动态加载失败，使用备用数据
    mcooPosts.value = [
      {
        title: '工程报备',
        link: '/mcoo/project-report',
        date: '2025-12-23',
        category: 'Mcoo',
        description: '这是一个测试文章，用于演示如何将特定文章不在首页和侧边栏显示，而是显示在单独的页面上。'
      }
    ]
  }
})

// 处理卡片点击事件
const handleCardClick = (link) => {
  window.location.href = link
}

// 为标签生成马卡龙色系颜色
const getCategoryColor = (tag) => {
  // 检查缓存中是否已有该标签的颜色
  const cacheKey = `${tag}-${isDark.value ? 'dark' : 'light'}`
  if (tagColorCache.has(cacheKey)) {
    return tagColorCache.get(cacheKey)
  }
  
  // 使用更可靠的哈希函数确保相同标签总是相同颜色
  let hash = 0
  const str = tag.toString()
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // 转换为32位整数
  }
  
  // 马卡龙色系 - 浅色调（亮色模式）和深色调（深色模式）
  const lightColors = [
    { bg: '#FFE5E5', color: '#8B5A5A' }, // 浅粉红
    { bg: '#FFF0E5', color: '#8B6F47' }, // 浅橙
    { bg: '#FFFFE5', color: '#8B8B00' }, // 浅黄
    { bg: '#E5FFE5', color: '#5A8B5A' }, // 浅绿
    { bg: '#E5F5FF', color: '#5A7A8B' }, // 浅蓝
    { bg: '#F0E5FF', color: '#7A5A8B' }, // 浅紫
    { bg: '#FFE5F5', color: '#8B5A7A' }, // 浅粉紫
    { bg: '#E5FFF5', color: '#5A8B7A' }, // 浅青
  ]
  
  const darkColors = [
    { bg: '#4A2C2C', color: '#D4A5A5' }, // 深粉红
    { bg: '#4A3A2C', color: '#D4B590' }, // 深橙
    { bg: '#4A4A2C', color: '#D4D490' }, // 深黄
    { bg: '#2C4A2C', color: '#90D490' }, // 深绿
    { bg: '#2C3A4A', color: '#90B5D4' }, // 深蓝
    { bg: '#3A2C4A', color: '#B590D4' }, // 深紫
    { bg: '#4A2C3A', color: '#D490B5' }, // 深粉紫
    { bg: '#2C4A3A', color: '#90D4B5' }, // 深青
  ]
  
  // 根据VitePress的主题模式选择颜色集
  const colors = isDark.value ? darkColors : lightColors
  
  // 根据哈希值选择颜色
  const index = Math.abs(hash) % colors.length
  const color = colors[index]
  
  // 将颜色存入缓存
  tagColorCache.set(cacheKey, color)
  
  return color
}
</script>

<div class="mcoo-post-list">
  <div v-for="post in mcooPosts" :key="post.title" class="mcoo-post-item" @click="handleCardClick(post.link)">
    <div class="mcoo-post-title">
      <a :href="post.link" @click.stop>{{ post.title }}</a>
    </div>
    <div class="mcoo-post-meta">
      <span class="mcoo-post-author">{{ post.author }}</span>
      <span class="mcoo-post-date">{{ post.date }}</span>
      <span class="mcoo-post-category">{{ post.category }}</span>
      <span 
        v-for="tag in post.tags" 
        :key="tag" 
        class="mcoo-post-tag"
        :style="{ backgroundColor: getCategoryColor(tag).bg, color: getCategoryColor(tag).color }"
      >{{ tag }}</span>
    </div>
    <div class="mcoo-post-description">
      {{ post.description }}
    </div>
  </div>
</div>