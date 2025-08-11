# 组件介绍

GitHub Contributors List 提供了两个主要的Vue组件，用于展示GitHub仓库的贡献者信息。

## 组件概览

### AvatarList - 头像列表组件

层叠式头像列表，适用于快速展示多个贡献者。

- 🎯 **轻量级** - 紧凑的头像列表展示
- ⚡ **高性能** - 支持大量贡献者数据
- 🎨 **可定制** - 多种尺寸和间距选项

**主要特性:**
- 层叠头像布局
- 支持 small/medium/large 三种尺寸
- 可自定义最大显示数量
- 内置工具提示显示详细信息

[查看详细文档 →](/components/avatar-list)

#### 快速预览

<div class="component-preview">
  <AvatarList :contributors="previewContributors" />
</div>

---

### ContributorCard - 贡献者卡片组件

详细的贡献者信息卡片，展示完整的用户资料。

- 📇 **信息丰富** - 显示头像、姓名、简介等详细信息  
- 🎛️ **多种变体** - default/compact/detailed 三种布局
- 🎨 **主题定制** - 完整的CSS变量支持

**主要特性:**
- 美观的卡片设计
- 支持统计信息显示
- 可自定义操作按钮
- 响应式设计

[查看详细文档 →](/components/contributor-card)

#### 快速预览

<div class="component-preview">
  <ContributorCard :contributor="previewContributor" />
</div>

## 使用场景

### 头像列表适用于
- 项目主页的贡献者展示
- 团队成员快速预览
- 空间有限的紧凑布局
- 需要显示大量用户的场景

### 卡片组件适用于
- 贡献者详情页面
- 团队成员介绍页面
- 用户档案展示
- 需要展示详细信息的场景

## 组合使用

两个组件可以很好地配合使用，例如：

- 首页使用 AvatarList 显示概览
- 详情页使用 ContributorCard 显示详细信息
- 列表页面可以混合使用两种组件

## 快速开始

### 安装

```bash
npm install @vue/github-contributors-list
```

### 基础用法

```vue
<template>
  <!-- 头像列表 -->
  <AvatarList :contributors="contributors" />
  
  <!-- 贡献者卡片 -->
  <ContributorCard :contributor="contributor" />
</template>

<script setup>
import { AvatarList, ContributorCard } from '@vue/github-contributors-list'

// 贡献者数据
const contributors = [
  {
    login: 'yyx990803',
    avatar_url: 'https://avatars.githubusercontent.com/u/499550?v=4',
    html_url: 'https://github.com/yyx990803',
    contributions: 1250,
    name: 'Evan You',
    bio: 'Creator of Vue.js'
  }
  // ... 更多贡献者
]
</script>
```

## 下一步

- [AvatarList 详细文档](/components/avatar-list) - 了解头像列表组件的完整API和使用示例
- [ContributorCard 详细文档](/components/contributor-card) - 了解卡片组件的所有功能和定制选项
- [高级示例](/examples/) - 查看更多复杂的使用场景和定制技巧

<script setup>
import AvatarList from '../.vitepress/components/AvatarList.vue'
import ContributorCard from '../.vitepress/components/ContributorCard.vue'

const previewContributors = [
  {
    id: 1,
    login: 'yyx990803',
    avatar_url: 'https://avatars.githubusercontent.com/u/499550?v=4',
    html_url: 'https://github.com/yyx990803',
    contributions: 1250,
    name: 'Evan You'
  },
  {
    id: 2,
    login: 'antfu',
    avatar_url: 'https://avatars.githubusercontent.com/u/11247099?v=4',
    html_url: 'https://github.com/antfu',
    contributions: 856,
    name: 'Anthony Fu'
  },
  {
    id: 3,
    login: 'patak-dev',
    avatar_url: 'https://avatars.githubusercontent.com/u/583201?v=4',
    html_url: 'https://github.com/patak-dev',
    contributions: 642,
    name: 'Patak'
  }
]

const previewContributor = {
  id: 1,
  login: 'yyx990803',
  avatar_url: 'https://avatars.githubusercontent.com/u/499550?v=4',
  html_url: 'https://github.com/yyx990803',
  contributions: 1250,
  name: 'Evan You',
  bio: 'Creator of Vue.js'
}
</script>

<style scoped>
.component-preview {
  margin: 16px 0;
  padding: 20px;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  background: #fafbfc;
}
</style> 