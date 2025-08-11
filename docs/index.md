---
layout: home

hero:
  name: "GitHub Contributors List"
  text: "Vue版本的贡献者头像列表组件"
  tagline: "基于VitePress框架，美观、易用的GitHub贡献者展示组件"
  actions:
    - theme: brand
      text: 开始使用
      link: /components/
    - theme: alt
      text: 查看示例
      link: /examples/

features:
  - icon: 🎨
    title: 美观设计
    details: 遵循GitHub设计规范，支持明暗主题，提供多种尺寸和间距选项
  - icon: ⚡️
    title: 高性能
    details: 基于Vue 3 Composition API，响应式设计，支持懒加载和错误处理
  - icon: 🛠️
    title: 易于集成
    details: 简单的API设计，支持TypeScript，可轻松集成到任何Vue项目中
  - icon: 📱
    title: 响应式
    details: 完美适配移动端和桌面端，支持触摸交互和悬停效果
---

## 快速开始

### 安装

```bash
npm install @vue/github-contributors-list
```

### 基础用法

```vue
<template>
  <GitHubContributors repo="vuejs/vue" />
</template>

<script setup>
import { GitHubContributors } from '@vue/github-contributors-list'
</script>
```

### 实时演示

这里展示了Vue.js项目的贡献者列表：

<GitHubContributors repo="vuejs/vue" :show-contributions="true" />

## 主要特性

- **🎯 专为GitHub设计** - 完美集成GitHub API，自动获取仓库贡献者信息
- **🎨 精美的视觉效果** - 圆形头像、层叠布局、悬停动画
- **⚙️ 高度可定制** - 支持尺寸、间距、显示数量等多种配置选项
- **🔗 交互友好** - 点击头像直接跳转到GitHub个人页面
- **📊 贡献统计** - 可选显示每个贡献者的贡献次数
- **🌙 深色模式** - 自动适配系统主题设置
- **♿️ 无障碍访问** - 完整的键盘导航和屏幕阅读器支持

<script setup>
import GitHubContributors from './.vitepress/components/GitHubContributors.vue'
</script> 