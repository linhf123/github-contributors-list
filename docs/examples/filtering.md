# 数据过滤

了解如何对GitHub贡献者数据进行过滤和排序，以满足不同的展示需求。

## 基础过滤

### 按贡献数量过滤

```vue
<template>
  <div class="filtering-demo">
    <!-- 过滤控件 -->
    <div class="filters">
      <label>
        最小贡献数：
        <input 
          v-model.number="minContributions" 
          type="number" 
          min="0"
          placeholder="0"
        />
      </label>
      
      <label>
        排序方式：
        <select v-model="sortBy">
          <option value="contributions">按贡献数</option>
          <option value="name">按姓名</option>
          <option value="login">按用户名</option>
        </select>
      </label>
      
      <label>
        排序顺序：
        <select v-model="sortOrder">
          <option value="desc">降序</option>
          <option value="asc">升序</option>
        </select>
      </label>
    </div>
    
    <!-- 过滤结果 -->
    <div class="results">
      <p>显示 {{ filteredContributors.length }} / {{ allContributors.length }} 位贡献者</p>
      
      <AvatarList :contributors="filteredContributors" />
      
      <div class="cards-grid">
        <ContributorCard 
          v-for="contributor in filteredContributors.slice(0, 6)"
          :key="contributor.id"
          :contributor="contributor"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { AvatarList, ContributorCard } from 'github-contributors-list'

const minContributions = ref(0)
const sortBy = ref('contributions')
const sortOrder = ref('desc')

const allContributors = ref([
  {
    id: 1,
    login: 'yyx990803',
    name: 'Evan You',
    avatar_url: 'https://avatars.githubusercontent.com/u/499550?v=4',
    html_url: 'https://github.com/yyx990803',
    contributions: 1250,
    bio: 'Creator of Vue.js',
    location: 'Singapore'
  },
  {
    id: 2,
    login: 'antfu',
    name: 'Anthony Fu',
    avatar_url: 'https://avatars.githubusercontent.com/u/11247099?v=4',
    html_url: 'https://github.com/antfu',
    contributions: 856,
    bio: 'Vue & Vite core team member',
    location: 'China'
  },
  {
    id: 3,
    login: 'patak-dev',
    name: 'Patak',
    avatar_url: 'https://avatars.githubusercontent.com/u/583201?v=4',
    html_url: 'https://github.com/patak-dev',
    contributions: 642,
    bio: 'Vite core team member'
  },
  {
    id: 4,
    login: 'sodatea',
    name: 'Haoqun Jiang',
    avatar_url: 'https://avatars.githubusercontent.com/u/3277634?v=4',
    html_url: 'https://github.com/sodatea',
    contributions: 234,
    bio: 'Vue core team member'
  },
  {
    id: 5,
    login: 'ktsn',
    name: 'Kazuya Kawaguchi',
    avatar_url: 'https://avatars.githubusercontent.com/u/3232734?v=4',
    html_url: 'https://github.com/ktsn',
    contributions: 189,
    bio: 'Vue core team member'
  }
])

// 计算过滤后的贡献者列表
const filteredContributors = computed(() => {
  let filtered = allContributors.value.filter(
    contributor => contributor.contributions >= minContributions.value
  )
  
  // 排序
  filtered.sort((a, b) => {
    let valueA = a[sortBy.value]
    let valueB = b[sortBy.value]
    
    // 处理字符串比较
    if (typeof valueA === 'string') {
      valueA = valueA.toLowerCase()
      valueB = valueB.toLowerCase()
    }
    
    if (sortOrder.value === 'asc') {
      return valueA > valueB ? 1 : -1
    } else {
      return valueA < valueB ? 1 : -1
    }
  })
  
  return filtered
})
</script>

<style scoped>
.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  background: #f6f8fa;
  border-radius: 8px;
  flex-wrap: wrap;
}

.filters label {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-weight: 600;
}

.filters input,
.filters select {
  padding: 8px 12px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  font-size: 14px;
}

.results p {
  margin-bottom: 20px;
  color: #656d76;
  font-weight: 500;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 20px;
}
</style>
```

## 实际效果

这里展示上述过滤功能的实际运行效果：

### 交互式过滤演示
<div class="demo-filters">
  <label>
    最小贡献数：
    <input 
      v-model.number="demoMinContributions" 
      type="number" 
      min="0"
      placeholder="0"
    />
  </label>
  
  <label>
    排序方式：
    <select v-model="demoSortBy">
      <option value="contributions">按贡献数</option>
      <option value="name">按姓名</option>
      <option value="login">按用户名</option>
    </select>
  </label>
  
  <label>
    排序顺序：
    <select v-model="demoSortOrder">
      <option value="desc">降序</option>
      <option value="asc">升序</option>
    </select>
  </label>
</div>

<div class="demo-results">
  <p>显示 {{ demoFilteredContributors.length }} / {{ demoAllContributors.length }} 位贡献者</p>
  
  <AvatarList :contributors="demoFilteredContributors" />
  
  <div class="demo-cards-grid">
    <ContributorCard 
      v-for="contributor in demoFilteredContributors.slice(0, 6)"
      :key="contributor.id"
      :contributor="contributor"
    />
  </div>
</div>

## 高级过滤

### 搜索功能

```vue
<template>
  <div class="search-demo">
    <div class="search-bar">
      <input 
        v-model="searchQuery"
        type="text"
        placeholder="搜索贡献者姓名或用户名..."
        class="search-input"
      />
    </div>
    
    <AvatarList :contributors="searchResults" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')

const searchResults = computed(() => {
  if (!searchQuery.value) return allContributors.value
  
  const query = searchQuery.value.toLowerCase()
  return allContributors.value.filter(contributor => 
    contributor.name?.toLowerCase().includes(query) ||
    contributor.login.toLowerCase().includes(query) ||
    contributor.bio?.toLowerCase().includes(query)
  )
})
</script>
```

### 多条件过滤

```vue
<template>
  <div class="advanced-filters">
    <div class="filter-group">
      <h4>贡献范围</h4>
      <input v-model.number="filters.minContributions" type="number" placeholder="最小值" />
      <input v-model.number="filters.maxContributions" type="number" placeholder="最大值" />
    </div>
    
    <div class="filter-group">
      <h4>地区</h4>
      <select v-model="filters.location">
        <option value="">所有地区</option>
        <option value="China">中国</option>
        <option value="USA">美国</option>
        <option value="Europe">欧洲</option>
      </select>
    </div>
    
    <div class="filter-group">
      <h4>角色</h4>
      <label>
        <input type="checkbox" v-model="filters.coreTeam" />
        核心团队成员
      </label>
    </div>
  </div>
</template>

<script setup>
const filters = ref({
  minContributions: 0,
  maxContributions: null,
  location: '',
  coreTeam: false
})

const advancedFiltered = computed(() => {
  return allContributors.value.filter(contributor => {
    // 贡献数量范围
    if (contributor.contributions < filters.value.minContributions) return false
    if (filters.value.maxContributions && contributor.contributions > filters.value.maxContributions) return false
    
    // 地区过滤
    if (filters.value.location && !contributor.location?.includes(filters.value.location)) return false
    
    // 核心团队过滤
    if (filters.value.coreTeam && !contributor.bio?.includes('core team')) return false
    
    return true
  })
})
</script>
```

## 自定义过滤函数

你可以传入自定义的过滤函数来实现更复杂的过滤逻辑：

```vue
<template>
  <AvatarList 
    :contributors="contributors"
    :filter-fn="customFilter"
  />
</template>

<script setup>
// 自定义过滤函数：只显示贡献数在前50%的贡献者
const customFilter = (contributors) => {
  const sorted = [...contributors].sort((a, b) => b.contributions - a.contributions)
  const halfIndex = Math.ceil(sorted.length / 2)
  return sorted.slice(0, halfIndex)
}
</script>
```

## 实时数据更新

组件支持实时数据更新，当数据源发生变化时会自动重新过滤：

```vue
<script setup>
import { ref, onMounted } from 'vue'

const contributors = ref([])

onMounted(() => {
  // 模拟实时数据更新
  setInterval(async () => {
    // 从API获取最新数据
    const newData = await fetchContributors()
    contributors.value = newData
  }, 30000) // 每30秒更新一次
})

async function fetchContributors() {
  const response = await fetch('/api/contributors')
  return response.json()
}
</script>
```

## 性能优化

对于大量数据的过滤，建议使用以下优化策略：

1. **虚拟滚动**：对于超过100个贡献者的列表
2. **防抖搜索**：避免过于频繁的搜索请求
3. **分页加载**：分批加载和显示数据

```vue
<script setup>
import { debounce } from 'lodash-es'

// 防抖搜索
const debouncedSearch = debounce((query) => {
  searchQuery.value = query
}, 300)
</script>
```

<script setup>
import { ref, computed } from 'vue'
import AvatarList from '../.vitepress/components/AvatarList.vue'
import ContributorCard from '../.vitepress/components/ContributorCard.vue'

// 演示数据
const demoAllContributors = ref([
  {
    id: 1,
    login: 'yyx990803',
    name: 'Evan You',
    avatar_url: 'https://avatars.githubusercontent.com/u/499550?v=4',
    html_url: 'https://github.com/yyx990803',
    contributions: 1250,
    bio: 'Creator of Vue.js',
    location: 'Singapore'
  },
  {
    id: 2,
    login: 'antfu',
    name: 'Anthony Fu',
    avatar_url: 'https://avatars.githubusercontent.com/u/11247099?v=4',
    html_url: 'https://github.com/antfu',
    contributions: 856,
    bio: 'Vue & Vite core team member',
    location: 'China'
  },
  {
    id: 3,
    login: 'patak-dev',
    name: 'Patak',
    avatar_url: 'https://avatars.githubusercontent.com/u/583201?v=4',
    html_url: 'https://github.com/patak-dev',
    contributions: 642,
    bio: 'Vite core team member'
  },
  {
    id: 4,
    login: 'sodatea',
    name: 'Haoqun Jiang',
    avatar_url: 'https://avatars.githubusercontent.com/u/3277634?v=4',
    html_url: 'https://github.com/sodatea',
    contributions: 234,
    bio: 'Vue core team member'
  },
  {
    id: 5,
    login: 'ktsn',
    name: 'Kazuya Kawaguchi',
    avatar_url: 'https://avatars.githubusercontent.com/u/3232734?v=4',
    html_url: 'https://github.com/ktsn',
    contributions: 189,
    bio: 'Vue core team member'
  }
])

// 演示过滤参数
const demoMinContributions = ref(0)
const demoSortBy = ref('contributions')
const demoSortOrder = ref('desc')

// 计算过滤后的贡献者列表
const demoFilteredContributors = computed(() => {
  let filtered = demoAllContributors.value.filter(
    contributor => contributor.contributions >= demoMinContributions.value
  )
  
  // 排序
  filtered.sort((a, b) => {
    let valueA = a[demoSortBy.value]
    let valueB = b[demoSortBy.value]
    
    // 处理字符串比较
    if (typeof valueA === 'string') {
      valueA = valueA.toLowerCase()
      valueB = valueB.toLowerCase()
    }
    
    if (demoSortOrder.value === 'asc') {
      return valueA > valueB ? 1 : -1
    } else {
      return valueA < valueB ? 1 : -1
    }
  })
  
  return filtered
})
</script>

<style scoped>
/* 演示样式 */
.demo-filters {
  display: flex;
  gap: 20px;
  margin: 20px 0 30px 0;
  padding: 20px;
  background: #f6f8fa;
  border-radius: 8px;
  flex-wrap: wrap;
}

.demo-filters label {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-weight: 600;
}

.demo-filters input,
.demo-filters select {
  padding: 8px 12px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  font-size: 14px;
}

.demo-results p {
  margin-bottom: 20px;
  color: #656d76;
  font-weight: 500;
}

.demo-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 20px;
}
</style> 