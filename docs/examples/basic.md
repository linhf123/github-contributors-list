# 基础用法

<script setup>
import AvatarList from '../.vitepress/components/AvatarList.vue'
import ContributorCard from '../.vitepress/components/ContributorCard.vue'

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
.demo-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 16px;
}
</style>

本页面展示了GitHub Contributors List组件的基础使用方法。

## 实际效果

### 基础头像列表
<AvatarList :contributors="demoContributors" />

### 基础贡献者卡片  
<div class="demo-cards-grid">
  <ContributorCard 
    v-for="contributor in demoContributors.slice(0, 3)" 
    :key="contributor.id"
    :contributor="contributor" 
  />
</div>

## 代码示例

最基本的使用方式，只需要传入贡献者数据即可：

```vue
<template>
  <div class="demo-container">
    <h3>基础头像列表</h3>
    <AvatarList :contributors="contributors" />
    
    <h3>基础贡献者卡片</h3>
    <div class="cards-grid">
      <ContributorCard 
        v-for="contributor in contributors.slice(0, 3)" 
        :key="contributor.id"
        :contributor="contributor" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { AvatarList, ContributorCard } from 'github-contributors-list'

const contributors = ref([])

onMounted(async () => {
  // 模拟从API获取数据
  contributors.value = [
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
})
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 16px;
}
</style> 