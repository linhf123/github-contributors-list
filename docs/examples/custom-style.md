# 自定义样式

<script setup>
import AvatarList from '../.vitepress/components/AvatarList.vue'
import ContributorCard from '../.vitepress/components/ContributorCard.vue'

const styleContributors = [
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
</script>

<style scoped>
/* 演示样式 */
.dark-theme-demo {
  background: #1a1a1a;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}

.large-avatars-demo {
  margin: 20px 0;
}

.gradient-cards-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin: 20px 0;
}
</style>

GitHub Contributors List组件提供了丰富的样式定制选项，你可以轻松地调整组件外观以匹配你的设计需求。

## 实际效果

### 深色主题效果
<div class="dark-theme-demo">
  <AvatarList :contributors="styleContributors" />
</div>

### 大尺寸头像效果
<div class="large-avatars-demo">
  <AvatarList :contributors="styleContributors" size="large" />
</div>

### 渐变卡片效果
<div class="gradient-cards-demo">
  <ContributorCard 
    v-for="contributor in styleContributors.slice(0, 3)"
    :key="contributor.id"
    :contributor="contributor"
  />
</div>

## CSS 变量定制

组件使用CSS变量，让你可以方便地覆盖默认样式：

```vue
<template>
  <div class="custom-demo">
    <!-- 深色主题头像列表 -->
    <div class="dark-theme">
      <h3>深色主题</h3>
      <AvatarList :contributors="contributors" />
    </div>
    
    <!-- 大尺寸头像 -->
    <div class="large-avatars">
      <h3>大尺寸头像</h3>
      <AvatarList :contributors="contributors" size="large" />
    </div>
    
    <!-- 自定义卡片样式 -->
    <div class="gradient-cards">
      <h3>渐变卡片</h3>
      <div class="cards-container">
        <ContributorCard 
          v-for="contributor in contributors.slice(0, 3)"
          :key="contributor.id"
          :contributor="contributor"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { AvatarList, ContributorCard } from 'github-contributors-list'

const contributors = [
  {
    id: 1,
    login: 'yyx990803',
    avatar_url: 'https://avatars.githubusercontent.com/u/499550?v=4',
    html_url: 'https://github.com/yyx990803',
    contributions: 1250,
    name: 'Evan You',
    bio: 'Creator of Vue.js'
  },
  // ... 更多贡献者
]
</script>

<style scoped>
/* 深色主题 */
.dark-theme {
  background: #1a1a1a;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.dark-theme h3 {
  color: #fff;
}

.dark-theme .avatar-list {
  --avatar-border: 2px solid #444;
  --tooltip-background: #333;
  --tooltip-color: #fff;
}

/* 大尺寸头像 */
.large-avatars {
  margin-bottom: 30px;
}

.large-avatars .avatar-list {
  --avatar-size: 60px;
  --avatar-spacing: -12px;
}

/* 渐变卡片 */
.gradient-cards .cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.gradient-cards .contributor-card {
  --card-background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --card-color: white;
  --card-border: none;
  --card-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.gradient-cards .contributor-card:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
}
</style>
```

## 主题变量参考

### AvatarList 组件

```css
.avatar-list {
  /* 头像尺寸 */
  --avatar-size: 40px;
  
  /* 头像边框 */
  --avatar-border: 2px solid #fff;
  
  /* 头像间距 */
  --avatar-spacing: -8px;
  
  /* 工具提示样式 */
  --tooltip-background: #24292e;
  --tooltip-color: #fff;
  --tooltip-border-radius: 6px;
  --tooltip-padding: 8px 12px;
  
  /* 更多按钮样式 */
  --more-button-background: #f6f8fa;
  --more-button-border: 1px solid #d0d7de;
  --more-button-color: #656d76;
}
```

### ContributorCard 组件

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

## 预设主题

### GitHub 风格

```css
.github-theme .avatar-list {
  --avatar-border: 2px solid #fff;
  --tooltip-background: #24292e;
  --more-button-background: #f6f8fa;
}

.github-theme .contributor-card {
  --card-background: #fff;
  --card-border: 1px solid #d0d7de;
  --card-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```

### 现代简约

```css
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
```

### 彩色活泼

```css
.colorful-theme .contributor-card {
  --card-background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
  --card-color: white;
  --card-border: none;
  --card-shadow: 0 8px 25px rgba(255,107,107,0.3);
}
```

## 响应式样式

组件内置了响应式设计，你也可以进一步定制：

```css
@media (max-width: 768px) {
  .avatar-list {
    --avatar-size: 32px;
    --avatar-spacing: -6px;
  }
  
  .contributor-card {
    --card-padding: 16px;
    --card-avatar-size: 48px;
  }
}

@media (max-width: 480px) {
  .avatar-list {
    --avatar-size: 28px;
  }
}
```