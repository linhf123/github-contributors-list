# GitHub Contributors List - Vue版本

> 基于Vue 3 + VitePress的GitHub贡献者头像列表组件

[![Vue](https://img.shields.io/badge/Vue-3.4+-4FC08D?logo=vue.js)](https://vuejs.org/)
[![VitePress](https://img.shields.io/badge/VitePress-1.0+-646CFF?logo=vite)](https://vitepress.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

## ✨ 特性

- 🎯 **专为GitHub设计** - 完美集成GitHub API，自动获取仓库贡献者信息
- 🎨 **精美的视觉效果** - 圆形头像、层叠布局、悬停动画
- ⚙️ **高度可定制** - 支持尺寸、间距、显示数量等多种配置选项
- 🔗 **交互友好** - 点击头像直接跳转到GitHub个人页面
- 📊 **贡献统计** - 可选显示每个贡献者的贡献次数
- 🌙 **深色模式** - 自动适配系统主题设置
- ♿️ **无障碍访问** - 完整的键盘导航和屏幕阅读器支持
- 📱 **响应式设计** - 完美适配移动端和桌面端
- 🚀 **基于Vue 3** - 使用Composition API和TypeScript
- 📖 **完整文档** - 基于VitePress的详细文档站点

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建文档

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 📦 组件使用

### 基础用法

```vue
<template>
  <GitHubContributors repo="vuejs/vue" />
</template>

<script setup>
import { GitHubContributors } from '@vue/github-contributors-list'
</script>
```

### 高级用法

```vue
<template>
  <GitHubContributors 
    repo="vuejs/core"
    :show-contributions="true"
    @contributor-click="handleClick"
  />
</template>

<script setup>
import { GitHubContributors } from '@vue/github-contributors-list'

const handleClick = (contributor) => {
  console.log('点击了贡献者:', contributor.login)
}
</script>
```

### 自定义数据

```vue
<template>
  <AvatarList 
    :contributors="customContributors"
    size="large"
    spacing="loose"
    :max-display="10"
  />
</template>

<script setup>
import { AvatarList } from '@vue/github-contributors-list'

const customContributors = [
  {
    login: 'yyx990803',
    avatar_url: 'https://avatars.githubusercontent.com/u/499550?v=4',
    html_url: 'https://github.com/yyx990803',
    contributions: 1234
  }
  // ... 更多贡献者
]
</script>
```

## 🎨 组件列表

### AvatarList

核心的头像列表展示组件，用于渲染贡献者头像的层叠列表。

**Props:**
- `contributors`: 贡献者数据数组
- `maxDisplay`: 最大显示数量（默认20）
- `size`: 头像尺寸 - `'small' | 'medium' | 'large'`（默认'medium'）
- `spacing`: 头像间距 - `'tight' | 'normal' | 'loose'`（默认'normal'）
- `clickable`: 是否可点击（默认true）
- `showContributions`: 是否显示贡献数（默认false）

**Events:**
- `avatarClick`: 点击头像时触发

### GitHubContributors

高级组件，自动从GitHub API获取贡献者数据并展示。

**Props:**
- `repo`: GitHub仓库名（必需，格式：owner/repo）
- `showContributions`: 是否显示贡献数（默认false）

**Events:**
- `contributorClick`: 点击贡献者时触发

## 🎯 参考实现

本项目参考了 [chenshuai2144/github-contributors-list](https://github.com/chenshuai2144/github-contributors-list) 的设计思路，并用Vue 3 + VitePress重新实现，提供了：

- 更现代的Vue 3 Composition API
- TypeScript类型支持
- 更完整的文档和示例
- 更好的无障碍访问支持
- 响应式设计

## 📖 文档

详细文档请访问：[GitHub Contributors List 文档](http://localhost:5173)

- [组件介绍](./docs/components/)
- [使用示例](./docs/examples/)
- [API参考](./docs/api/)

## 🤝 贡献

欢迎提交Issue和Pull Request！

1. Fork本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 📄 许可证

本项目采用 [MIT 许可证](./LICENSE)

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式JavaScript框架
- [VitePress](https://vitepress.dev/) - Vue驱动的静态站点生成器
- [GitHub API](https://docs.github.com/en/rest) - GitHub REST API
- [chenshuai2144/github-contributors-list](https://github.com/chenshuai2144/github-contributors-list) - 原始设计灵感
