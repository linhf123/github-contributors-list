# ContributorCard 组件

## 概述

ContributorCard 是一个用于展示GitHub贡献者详细信息的卡片组件。它以美观的卡片形式展示贡献者的头像、姓名、简介、贡献次数等详细信息，支持多种变体和完全的样式定制。

## 基础用法

最简单的使用方式，传入贡献者信息对象：

```vue
<template>
  <ContributorCard :contributor="contributor" />
</template>

<script setup>
import { ContributorCard } from 'github-contributors-list'

const contributor = {
  id: 1,
  login: 'yyx990803',
  avatar_url: 'https://avatars.githubusercontent.com/u/499550?v=4',
  html_url: 'https://github.com/yyx990803',
  contributions: 1250,
  name: 'Evan You',
  bio: 'Creator of Vue.js'
}
</script>
```

### 实际效果

<div class="single-card-demo">
  <ContributorCard :contributor="demoContributor" />
</div>

## API 参考

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `contributor` | `Contributor` | - | 贡献者信息对象（必需） |
| `variant` | `'default' \| 'compact' \| 'detailed'` | `'default'` | 卡片变体 |
| `showStats` | `boolean` | `true` | 是否显示统计信息 |
| `showActions` | `boolean` | `true` | 是否显示操作按钮 |
| `onFollow` | `Function` | - | 关注按钮点击回调 |

### Contributor 数据类型

```typescript
interface Contributor {
  id?: number
  login: string
  avatar_url: string
  html_url?: string
  contributions?: number
  type?: string
  name?: string
  bio?: string
}
```

## 使用示例

### 不同变体对比

ContributorCard 支持三种不同的显示变体：

```vue
<template>
  <div class="variants-demo">
    <h4>默认变体 (Default)</h4>
    <ContributorCard :contributor="contributor" variant="default" />
    
    <h4>紧凑变体 (Compact)</h4>
    <ContributorCard :contributor="contributor" variant="compact" />
    
    <h4>详细变体 (Detailed)</h4>
    <ContributorCard :contributor="contributor" variant="detailed" />
  </div>
</template>
```

#### 实际效果

<div class="variants-demo">
  <h4>默认变体 (Default)</h4>
  <ContributorCard :contributor="demoContributor" variant="default" />
  
  <h4>紧凑变体 (Compact)</h4>
  <ContributorCard :contributor="demoContributor" variant="compact" />
  
  <h4>详细变体 (Detailed)</h4>
  <ContributorCard :contributor="demoContributor" variant="detailed" />
</div>

### 控制显示内容

可以通过props控制是否显示统计信息和操作按钮：

```vue
<template>
  <div class="content-demo">
    <h4>隐藏统计信息</h4>
    <ContributorCard 
      :contributor="contributor" 
      :show-stats="false" 
    />
    
    <h4>隐藏操作按钮</h4>
    <ContributorCard 
      :contributor="contributor" 
      :show-actions="false" 
    />
    
    <h4>最简模式</h4>
    <ContributorCard 
      :contributor="contributor" 
      :show-stats="false" 
      :show-actions="false" 
    />
  </div>
</template>
```

#### 实际效果

<div class="content-demo">
  <h4>隐藏统计信息</h4>
  <ContributorCard :contributor="demoContributor" :show-stats="false" />
  
  <h4>隐藏操作按钮</h4>
  <ContributorCard :contributor="demoContributor" :show-actions="false" />
  
  <h4>最简模式</h4>
  <ContributorCard :contributor="demoContributor" :show-stats="false" :show-actions="false" />
</div>

### 批量展示

通常用于展示多个贡献者的网格布局：

```vue
<template>
  <div class="cards-grid">
    <ContributorCard 
      v-for="contributor in contributors"
      :key="contributor.id"
      :contributor="contributor"
    />
  </div>
</template>

<style scoped>
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
</style>
```

#### 实际效果

<div class="cards-grid-demo">
  <ContributorCard 
    v-for="contributor in demoContributors"
    :key="contributor.id"
    :contributor="contributor"
  />
</div>

### 添加交互事件

可以添加自定义的关注功能：

```vue
<template>
  <ContributorCard 
    :contributor="contributor" 
    :on-follow="handleFollow"
  />
</template>

<script setup>
const handleFollow = (contributor) => {
  console.log('关注用户:', contributor.login)
  // 实现关注逻辑
}
</script>
```

## 样式定制

组件使用CSS变量系统，可以方便地进行主题定制：

### 可用的CSS变量

```css
.contributor-card {
  /* 卡片基础样式 */
  --card-background: #fff;
  --card-color: #24292e;
  --card-border: 1px solid #d0d7de;
  --card-border-radius: 12px;
  --card-padding: 20px;
  --card-shadow: 0 1px 3px rgba(0,0,0,0.1);
  
  /* 头像样式 */
  --card-avatar-size: 64px;
  --card-avatar-border-radius: 50%;
  
  /* 文本样式 */
  --card-title-size: 18px;
  --card-title-weight: 600;
  --card-subtitle-size: 14px;
  --card-subtitle-color: #656d76;
  
  /* 统计信息样式 */
  --card-stats-background: #f6f8fa;
  --card-stats-border-radius: 6px;
  --card-stats-padding: 8px 12px;
}
```

### 主题示例

#### 深色主题

```vue
<template>
  <div class="dark-theme">
    <ContributorCard :contributor="contributor" />
  </div>
</template>

<style scoped>
.dark-theme .contributor-card {
  --card-background: #161b22;
  --card-color: #f0f6fc;
  --card-border: 1px solid #30363d;
  --card-stats-background: #21262d;
  --card-subtitle-color: #8b949e;
}
</style>
```

##### 实际效果

<div class="dark-theme-demo">
  <ContributorCard :contributor="demoContributor" />
</div>

#### 渐变主题

```vue
<template>
  <div class="gradient-theme">
    <ContributorCard :contributor="contributor" />
  </div>
</template>

<style scoped>
.gradient-theme .contributor-card {
  --card-background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --card-color: white;
  --card-border: none;
  --card-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  --card-subtitle-color: rgba(255, 255, 255, 0.8);
  --card-stats-background: rgba(255, 255, 255, 0.1);
}
</style>
```

##### 实际效果

<div class="gradient-theme-demo">
  <ContributorCard :contributor="demoContributor" />
</div>

#### 简约主题

```vue
<template>
  <div class="minimal-theme">
    <ContributorCard :contributor="contributor" />
  </div>
</template>

<style scoped>
.minimal-theme .contributor-card {
  --card-background: #fff;
  --card-border: none;
  --card-shadow: 0 4px 12px rgba(0,0,0,0.1);
  --card-border-radius: 16px;
  --card-stats-background: #f8f9fa;
}
</style>
```

##### 实际效果

<div class="minimal-theme-demo">
  <ContributorCard :contributor="demoContributor" />
</div>

## 响应式设计

组件内置了响应式设计，在不同屏幕尺寸下自动适配：

```css
/* 组件内置的响应式样式 */
@media (max-width: 768px) {
  .contributor-card {
    --card-padding: 16px;
    --card-avatar-size: 48px;
    --card-title-size: 16px;
  }
  
  .card-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .card-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
```

## 最佳实践

### 数据处理

建议对贡献者数据进行预处理，确保显示质量：

```vue
<script setup>
import { computed } from 'vue'

const rawContributor = { /* 原始数据 */ }

const processedContributor = computed(() => ({
  ...rawContributor,
  // 处理头像URL，确保合适的尺寸
  avatar_url: rawContributor.avatar_url + '&s=120',
  // 截断过长的简介
  bio: rawContributor.bio?.length > 100 
    ? rawContributor.bio.substring(0, 100) + '...' 
    : rawContributor.bio,
  // 格式化贡献数
  contributions: rawContributor.contributions?.toLocaleString()
}))
</script>
```

### 加载状态

为数据加载提供友好的加载状态：

```vue
<template>
  <div class="contributor-card-wrapper">
    <div v-if="loading" class="loading-card">
      <div class="loading-avatar"></div>
      <div class="loading-content">
        <div class="loading-line"></div>
        <div class="loading-line short"></div>
      </div>
    </div>
    <ContributorCard v-else :contributor="contributor" />
  </div>
</template>

<style scoped>
.loading-card {
  background: #f6f8fa;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  gap: 16px;
  animation: pulse 1.5s ease-in-out infinite;
}

.loading-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #e1e4e8;
}

.loading-line {
  height: 16px;
  background: #e1e4e8;
  border-radius: 8px;
  margin-bottom: 8px;
}

.loading-line.short {
  width: 60%;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
</style>
```

### 错误处理

处理头像加载失败等异常情况：

```vue
<template>
  <ContributorCard 
    :contributor="contributorWithFallback" 
    @error="handleError"
  />
</template>

<script setup>
const contributorWithFallback = computed(() => ({
  ...contributor,
  avatar_url: contributor.avatar_url || '/default-avatar.png'
}))

const handleError = (error) => {
  console.error('Card error:', error)
  // 可以发送错误报告或显示备用内容
}
</script>
```

<script setup>
import ContributorCard from '../.vitepress/components/ContributorCard.vue'

const demoContributor = {
  id: 1,
  login: 'yyx990803',
  avatar_url: 'https://avatars.githubusercontent.com/u/499550?v=4',
  html_url: 'https://github.com/yyx990803',
  contributions: 1250,
  name: 'Evan You',
  bio: 'Creator of Vue.js'
}

const demoContributors = [
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
  }
]
</script>

<style scoped>
.single-card-demo, .variants-demo, .content-demo {
  margin: 20px 0;
}

.variants-demo h4, .content-demo h4 {
  margin: 16px 0 8px 0;
  font-size: 14px;
  color: #666;
}

.cards-grid-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

/* 主题演示样式 */
.dark-theme-demo .contributor-card {
  --card-background: #161b22;
  --card-color: #f0f6fc;
  --card-border: 1px solid #30363d;
  --card-stats-background: #21262d;
  --card-subtitle-color: #8b949e;
}

.gradient-theme-demo .contributor-card {
  --card-background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --card-color: white;
  --card-border: none;
  --card-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  --card-subtitle-color: rgba(255, 255, 255, 0.8);
  --card-stats-background: rgba(255, 255, 255, 0.1);
}

.minimal-theme-demo .contributor-card {
  --card-background: #fff;
  --card-border: none;
  --card-shadow: 0 4px 12px rgba(0,0,0,0.1);
  --card-border-radius: 16px;
  --card-stats-background: #f8f9fa;
}
</style> 