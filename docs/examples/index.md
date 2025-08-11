# 高级示例

这里展示了GitHub Contributors List组件的高级用法和主题定制技巧。

## GitHubContributors 组件演示

### 基础用法

自动从GitHub API获取贡献者数据：

<GitHubContributors repo="vuejs/vue" />

```vue
<template>
  <GitHubContributors repo="vuejs/vue" />
</template>
```

### 显示贡献数

<GitHubContributors repo="vuejs/core" :show-contributions="true" />

```vue
<template>
  <GitHubContributors 
    repo="vuejs/core" 
    :show-contributions="true" 
  />
</template>
```

## 主题定制示例

### 深色主题

<div class="dark-theme-example">
  <h4>深色头像列表</h4>
  <AvatarList :contributors="exampleContributors" />
  
  <h4>深色贡献者卡片</h4>
  <div class="cards-container">
    <ContributorCard 
      v-for="contributor in exampleContributors.slice(0, 2)"
      :key="contributor.id"
      :contributor="contributor"
    />
  </div>
</div>

```vue
<template>
  <div class="dark-theme">
    <AvatarList :contributors="contributors" />
    <ContributorCard :contributor="contributor" />
  </div>
</template>

<style scoped>
.dark-theme {
  background: #1a1a1a;
  padding: 20px;
  border-radius: 8px;
}

.dark-theme .avatar-list {
  --avatar-border: 2px solid #444;
  --tooltip-background: #333;
  --tooltip-color: #fff;
}

.dark-theme .contributor-card {
  --card-background: #161b22;
  --card-color: #f0f6fc;
  --card-border: 1px solid #30363d;
  --card-stats-background: #21262d;
}
</style>
```

### 渐变主题

<div class="gradient-theme-example">
  <h4>渐变头像列表</h4>
  <AvatarList :contributors="exampleContributors" />
  
  <h4>渐变贡献者卡片</h4>
  <div class="cards-container">
    <ContributorCard 
      v-for="contributor in exampleContributors.slice(0, 2)"
      :key="contributor.id"
      :contributor="contributor"
    />
  </div>
</div>

```vue
<style scoped>
.gradient-theme .avatar-list {
  --avatar-border: 3px solid #fff;
  --avatar-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.gradient-theme .contributor-card {
  --card-background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --card-color: white;
  --card-border: none;
  --card-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}
</style>
```

### 简约主题

<div class="minimal-theme-example">
  <h4>简约头像列表</h4>
  <AvatarList :contributors="exampleContributors" spacing="loose" />
  
  <h4>简约贡献者卡片</h4>
  <div class="cards-container">
    <ContributorCard 
      v-for="contributor in exampleContributors.slice(0, 2)"
      :key="contributor.id"
      :contributor="contributor"
    />
  </div>
</div>

```vue
<style scoped>
.minimal-theme .avatar-list {
  --avatar-border: none;
  --avatar-spacing: 4px;
  --tooltip-background: rgba(0,0,0,0.8);
}

.minimal-theme .contributor-card {
  --card-background: #fff;
  --card-border: none;
  --card-shadow: 0 4px 12px rgba(0,0,0,0.1);
  --card-border-radius: 16px;
}
</style>
```

## 组件组合使用

### 项目团队展示页面

结合使用两个组件创建完整的团队展示页面：

<div class="team-showcase">
  <div class="team-header">
    <h3>核心团队</h3>
    <AvatarList :contributors="exampleContributors" size="large" :max-display="10" />
  </div>
  
  <div class="team-details">
    <h3>团队成员详情</h3>
    <div class="team-grid">
      <ContributorCard 
        v-for="contributor in exampleContributors"
        :key="contributor.id"
        :contributor="contributor"
        variant="compact"
      />
    </div>
  </div>
</div>

```vue
<template>
  <div class="team-showcase">
    <!-- 团队概览 -->
    <div class="team-header">
      <h3>核心团队</h3>
      <AvatarList 
        :contributors="contributors" 
        size="large" 
        :max-display="10" 
      />
    </div>
    
    <!-- 详细信息 -->
    <div class="team-details">
      <h3>团队成员详情</h3>
      <div class="team-grid">
        <ContributorCard 
          v-for="contributor in contributors"
          :key="contributor.id"
          :contributor="contributor"
          variant="compact"
        />
      </div>
    </div>
  </div>
</template>
```

## 数据过滤和搜索

### 基于贡献数过滤

<div class="filter-demo">
  <div class="filter-controls">
    <label>
      最少贡献数: 
      <input 
        v-model.number="minContributions" 
        type="number" 
        min="0" 
        style="margin-left: 8px; padding: 4px; border: 1px solid #ddd; border-radius: 4px;"
      >
    </label>
  </div>
  
  <div class="filtered-results">
    <h4>过滤后的贡献者 ({{ filteredContributors.length }})</h4>
    <AvatarList :contributors="filteredContributors" :show-contributions="true" />
  </div>
</div>

### 搜索功能

<div class="search-demo">
  <div class="search-controls">
    <input 
      v-model="searchQuery" 
      type="text" 
      placeholder="搜索贡献者姓名或用户名..."
      style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 16px;"
    >
  </div>
  
  <div class="search-results">
    <div v-if="searchResults.length === 0 && searchQuery" class="no-results">
      没有找到匹配的贡献者
    </div>
    <div v-else class="results-grid">
      <ContributorCard 
        v-for="contributor in searchResults"
        :key="contributor.id"
        :contributor="contributor"
        variant="compact"
      />
    </div>
  </div>
</div>

```vue
<template>
  <div class="search-demo">
    <input 
      v-model="searchQuery" 
      type="text" 
      placeholder="搜索贡献者..."
    >
    
    <div class="results">
      <ContributorCard 
        v-for="contributor in searchResults"
        :key="contributor.id"
        :contributor="contributor"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')

const searchResults = computed(() => {
  if (!searchQuery.value) return contributors.value
  
  const query = searchQuery.value.toLowerCase()
  return contributors.value.filter(contributor => 
    contributor.name?.toLowerCase().includes(query) ||
    contributor.login.toLowerCase().includes(query)
  )
})
</script>
```

## 响应式设计示例

组件在不同屏幕尺寸下的表现：

<div class="responsive-demo">
  <div class="mobile-view">
    <h4>移动端视图</h4>
    <div style="max-width: 320px; border: 1px solid #ddd; padding: 16px; border-radius: 8px;">
      <AvatarList :contributors="exampleContributors.slice(0, 5)" size="small" />
      <ContributorCard :contributor="exampleContributors[0]" variant="compact" />
    </div>
  </div>
  
  <div class="tablet-view">
    <h4>平板端视图</h4>
    <div style="max-width: 768px; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
      <AvatarList :contributors="exampleContributors" size="medium" />
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 20px;">
        <ContributorCard :contributor="exampleContributors[0]" />
        <ContributorCard :contributor="exampleContributors[1]" />
      </div>
    </div>
  </div>
</div>

## 最佳实践

### 1. 性能优化

```vue
<script setup>
import { computed } from 'vue'

// 对大量数据进行分页
const pageSize = 20
const currentPage = ref(1)

const paginatedContributors = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return allContributors.value.slice(start, end)
})
</script>
```

### 2. 错误处理

```vue
<template>
  <div class="contributors-section">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      正在加载贡献者...
    </div>
    
    <div v-else-if="error" class="error">
      <p>加载失败: {{ error }}</p>
      <button @click="retry">重试</button>
    </div>
    
    <AvatarList v-else :contributors="contributors" />
  </div>
</template>
```

### 3. 无障碍访问

```vue
<template>
  <div 
    class="contributors-container"
    role="region"
    aria-label="项目贡献者列表"
  >
    <AvatarList 
      :contributors="contributors"
      @avatar-click="announceContributor"
    />
  </div>
</template>

<script setup>
const announceContributor = (contributor) => {
  // 为屏幕阅读器用户提供语音反馈
  const message = `选中贡献者 ${contributor.name || contributor.login}`
  // 使用 aria-live 区域或其他无障碍技术
}
</script>
```

<script setup>
import { ref, computed } from 'vue'
import AvatarList from '../.vitepress/components/AvatarList.vue'
import ContributorCard from '../.vitepress/components/ContributorCard.vue'
import GitHubContributors from '../.vitepress/components/GitHubContributors.vue'

const exampleContributors = [
  {
    id: 1,
    login: 'yyx990803',
    avatar_url: 'https://avatars.githubusercontent.com/u/499550?v=4',
    html_url: 'https://github.com/yyx990803',
    contributions: 1250,
    name: 'Evan You',
    bio: 'Creator of Vue.js'
  },
  {
    id: 2,
    login: 'antfu',
    avatar_url: 'https://avatars.githubusercontent.com/u/11247099?v=4',
    html_url: 'https://github.com/antfu',
    contributions: 856,
    name: 'Anthony Fu',
    bio: 'Vue & Vite core team member'
  },
  {
    id: 3,
    login: 'patak-dev',
    avatar_url: 'https://avatars.githubusercontent.com/u/583201?v=4',
    html_url: 'https://github.com/patak-dev',
    contributions: 642,
    name: 'Patak',
    bio: 'Vite core team member'
  },
  {
    id: 4,
    login: 'sodatea',
    avatar_url: 'https://avatars.githubusercontent.com/u/3277634?v=4',
    html_url: 'https://github.com/sodatea',
    contributions: 234,
    name: 'Haoqun Jiang',
    bio: 'Vue core team member'
  }
]

// 过滤功能
const minContributions = ref(500)
const filteredContributors = computed(() => 
  exampleContributors.filter(c => c.contributions >= minContributions.value)
)

// 搜索功能
const searchQuery = ref('')
const searchResults = computed(() => {
  if (!searchQuery.value) return exampleContributors
  
  const query = searchQuery.value.toLowerCase()
  return exampleContributors.filter(contributor => 
    contributor.name?.toLowerCase().includes(query) ||
    contributor.login.toLowerCase().includes(query)
  )
})
</script>

<style scoped>
/* 主题示例样式 */
.dark-theme-example {
  background: #1a1a1a;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}

.dark-theme-example h4 {
  color: #fff;
  margin: 16px 0 8px 0;
  font-size: 14px;
}

.dark-theme-example .avatar-list {
  --avatar-border: 2px solid #444;
  --tooltip-background: #333;
  --tooltip-color: #fff;
}

.dark-theme-example .contributor-card {
  --card-background: #161b22;
  --card-color: #f0f6fc;
  --card-border: 1px solid #30363d;
  --card-stats-background: #21262d;
  --card-subtitle-color: #8b949e;
}

.gradient-theme-example {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}

.gradient-theme-example h4 {
  color: white;
  margin: 16px 0 8px 0;
  font-size: 14px;
}

.gradient-theme-example .avatar-list {
  --avatar-border: 3px solid #fff;
  --avatar-shadow: 0 4px 15px rgba(255, 255, 255, 0.4);
}

.gradient-theme-example .contributor-card {
  --card-background: rgba(255, 255, 255, 0.1);
  --card-color: white;
  --card-border: 1px solid rgba(255, 255, 255, 0.2);
  --card-stats-background: rgba(255, 255, 255, 0.1);
  --card-subtitle-color: rgba(255, 255, 255, 0.8);
}

.minimal-theme-example {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  margin: 20px 0;
}

.minimal-theme-example h4 {
  color: #495057;
  margin: 16px 0 8px 0;
  font-size: 14px;
}

.minimal-theme-example .avatar-list {
  --avatar-border: none;
  --avatar-spacing: 4px;
  --tooltip-background: rgba(0,0,0,0.8);
}

.minimal-theme-example .contributor-card {
  --card-background: #fff;
  --card-border: none;
  --card-shadow: 0 4px 12px rgba(0,0,0,0.1);
  --card-border-radius: 16px;
}

/* 组合示例样式 */
.team-showcase {
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
}

.team-header h3, .team-details h3 {
  margin: 0 0 16px 0;
  color: #24292e;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

/* 过滤和搜索样式 */
.filter-demo, .search-demo {
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
}

.filter-controls, .search-controls {
  margin-bottom: 16px;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.no-results {
  text-align: center;
  padding: 20px;
  color: #656d76;
}

/* 响应式示例样式 */
.responsive-demo {
  margin: 20px 0;
}

.mobile-view, .tablet-view {
  margin: 20px 0;
}

.mobile-view h4, .tablet-view h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #666;
}

/* 通用样式 */
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 16px;
}
</style> 