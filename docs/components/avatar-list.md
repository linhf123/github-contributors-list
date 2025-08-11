# AvatarList 组件

## 概述

AvatarList 是一个用于展示GitHub贡献者头像列表的Vue组件。它以层叠的圆形头像列表形式展示多个贡献者，支持自定义样式、交互效果和响应式设计。

## 基础用法

最简单的使用方式，只需要传入贡献者数据即可：

```vue
<template>
  <AvatarList :contributors="contributors" />
</template>

<script setup>
import { AvatarList } from 'github-contributors-list'

const contributors = [
  {
    id: 1,
    login: 'yyx990803',
    avatar_url: 'https://avatars.githubusercontent.com/u/499550?v=4',
    html_url: 'https://github.com/yyx990803',
    contributions: 1250
  },
  {
    id: 2,
    login: 'antfu',
    avatar_url: 'https://avatars.githubusercontent.com/u/11247099?v=4',
    html_url: 'https://github.com/antfu',
    contributions: 856
  }
  // ... 更多贡献者
]
</script>
```

### 实际效果

<AvatarList :contributors="demoContributors" />

## API 参考

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `contributors` | `Contributor[]` | `[]` | 贡献者数据数组 |
| `maxDisplay` | `number` | `20` | 最大显示头像数量 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 头像尺寸 |
| `spacing` | `'tight' \| 'normal' \| 'loose'` | `'normal'` | 头像间距 |
| `clickable` | `boolean` | `true` | 是否可点击 |
| `showContributions` | `boolean` | `false` | 是否显示贡献数 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `avatar-click` | `contributor: Contributor` | 点击头像时触发 |

### Contributor 数据类型

```typescript
interface Contributor {
  id?: number
  login: string
  avatar_url: string
  html_url?: string
  contributions?: number
  type?: string
}
```

## 使用示例

### 不同尺寸对比

支持三种不同的尺寸：small、medium（默认）和large。

```vue
<template>
  <div class="size-demo">
    <h4>小尺寸 (Small)</h4>
    <AvatarList :contributors="contributors" size="small" />
    
    <h4>中尺寸 (Medium) - 默认</h4>
    <AvatarList :contributors="contributors" size="medium" />
    
    <h4>大尺寸 (Large)</h4>
    <AvatarList :contributors="contributors" size="large" />
  </div>
</template>
```

#### 实际效果

<div class="size-demo">
  <h4>小尺寸 (Small)</h4>
  <AvatarList :contributors="demoContributors" size="small" />
  
  <h4>中尺寸 (Medium) - 默认</h4>
  <AvatarList :contributors="demoContributors" size="medium" />
  
  <h4>大尺寸 (Large)</h4>
  <AvatarList :contributors="demoContributors" size="large" />
</div>

### 显示贡献数

可以启用贡献数显示，在头像旁边显示贡献次数：

```vue
<template>
  <AvatarList 
    :contributors="contributors" 
    :show-contributions="true" 
  />
</template>
```

#### 实际效果

<AvatarList :contributors="demoContributors" :show-contributions="true" />

### 限制显示数量

通过 `maxDisplay` 属性控制最多显示的头像数量：

```vue
<template>
  <div class="limit-demo">
    <h4>最多显示 5 个</h4>
    <AvatarList :contributors="contributors" :max-display="5" />
    
    <h4>最多显示 3 个</h4>
    <AvatarList :contributors="contributors" :max-display="3" />
  </div>
</template>
```

#### 实际效果

<div class="limit-demo">
  <h4>最多显示 5 个</h4>
  <AvatarList :contributors="demoContributors" :max-display="5" />
  
  <h4>最多显示 3 个</h4>
  <AvatarList :contributors="demoContributors" :max-display="3" />
</div>

### 间距控制

支持三种头像间距：tight（紧密）、normal（正常）和loose（宽松）。

```vue
<template>
  <div class="spacing-demo">
    <h4>紧密间距 (Tight)</h4>
    <AvatarList :contributors="contributors" spacing="tight" />
    
    <h4>正常间距 (Normal) - 默认</h4>
    <AvatarList :contributors="contributors" spacing="normal" />
    
    <h4>宽松间距 (Loose)</h4>
    <AvatarList :contributors="contributors" spacing="loose" />
  </div>
</template>
```

#### 实际效果

<div class="spacing-demo">
  <h4>紧密间距 (Tight)</h4>
  <AvatarList :contributors="demoContributors" spacing="tight" />
  
  <h4>正常间距 (Normal) - 默认</h4>
  <AvatarList :contributors="demoContributors" spacing="normal" />
  
  <h4>宽松间距 (Loose)</h4>
  <AvatarList :contributors="demoContributors" spacing="loose" />
</div>

### 交互事件

可以监听头像点击事件：

```vue
<template>
  <AvatarList 
    :contributors="contributors" 
    @avatar-click="handleAvatarClick"
  />
</template>

<script setup>
const handleAvatarClick = (contributor) => {
  console.log('点击了贡献者:', contributor.login)
  // 可以在这里实现自定义逻辑，如跳转到详情页
}
</script>
```

## 样式定制

组件使用CSS变量，可以方便地进行主题定制：

### 可用的CSS变量

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

### 自定义主题示例

```vue
<template>
  <div class="custom-theme">
    <AvatarList :contributors="contributors" />
  </div>
</template>

<style scoped>
.custom-theme .avatar-list {
  --avatar-size: 50px;
  --avatar-border: 3px solid #0969da;
  --avatar-spacing: -10px;
  --tooltip-background: #0969da;
}
</style>
```

#### 实际效果

<div class="custom-theme-demo">
  <AvatarList :contributors="demoContributors" />
</div>

## 响应式设计

组件内置了响应式设计，在移动设备上会自动调整：

- 在小屏幕上，头像尺寸会相应缩小
- 间距会适当调整以适应屏幕宽度
- 工具提示会优化触摸体验

```css
/* 组件内置的响应式样式 */
@media (max-width: 768px) {
  .avatar-list {
    --avatar-size: 32px;
    --avatar-spacing: -6px;
  }
}

@media (max-width: 480px) {
  .avatar-list {
    --avatar-size: 28px;
  }
}
```

## 最佳实践

### 数据加载

建议在组件外部处理数据加载和错误状态：

```vue
<template>
  <div>
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">加载失败: {{ error }}</div>
    <AvatarList v-else :contributors="contributors" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const loading = ref(true)
const error = ref(null)
const contributors = ref([])

onMounted(async () => {
  try {
    const response = await fetch('/api/contributors')
    contributors.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>
```

### 性能优化

对于大量数据，建议设置合适的 `maxDisplay` 值：

```vue
<template>
  <!-- 避免显示过多头像影响性能 -->
  <AvatarList 
    :contributors="contributors" 
    :max-display="20" 
  />
</template>
```

<script setup>
import AvatarList from '../.vitepress/components/AvatarList.vue'

const demoContributors = [
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
  },
  {
    id: 4,
    login: 'sodatea',
    avatar_url: 'https://avatars.githubusercontent.com/u/3277634?v=4',
    html_url: 'https://github.com/sodatea',
    contributions: 234,
    name: 'Haoqun Jiang'
  },
  {
    id: 5,
    login: 'posva',
    avatar_url: 'https://avatars.githubusercontent.com/u/664177?v=4',
    html_url: 'https://github.com/posva',
    contributions: 189,
    name: 'Eduardo San Martin Morote'
  },
  {
    id: 6,
    login: 'cexbrayat',
    avatar_url: 'https://avatars.githubusercontent.com/u/411874?v=4',
    html_url: 'https://github.com/cexbrayat',
    contributions: 156,
    name: 'Cédric Exbrayat'
  }
]
</script>

<style scoped>
.size-demo, .limit-demo, .spacing-demo {
  margin: 20px 0;
}

.size-demo h4, .limit-demo h4, .spacing-demo h4 {
  margin: 16px 0 8px 0;
  font-size: 14px;
  color: #666;
}

.custom-theme-demo .avatar-list {
  --avatar-size: 50px;
  --avatar-border: 3px solid #0969da;
  --avatar-spacing: -10px;
  --tooltip-background: #0969da;
}
</style> 