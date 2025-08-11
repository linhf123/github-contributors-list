<template>
  <div class="avatar-list" :class="avatarListClass">
    <div
      v-for="(contributor, index) in displayedContributors"
      :key="contributor.id || contributor.login"
      class="avatar-item"
      :style="{ zIndex: contributors.length - index }"
      @click="onAvatarClick(contributor)"
    >
      <img
        :src="getAvatarUrl(contributor.avatar_url)"
        :alt="contributor.login"
        :title="`${contributor.login}${contributor.contributions ? ` (${contributor.contributions} contributions)` : ''}`"
        class="avatar-image"
        :class="{ 'avatar-clickable': clickable }"
        @error="onImageError"
      />
      <div v-if="showContributions && contributor.contributions" class="contribution-count">
        {{ contributor.contributions }}
      </div>
    </div>
    
    <div
      v-if="hasMore"
      class="avatar-item more-avatars"
      :title="`+${remainingCount} more contributors`"
    >
      <div class="more-count">
        +{{ remainingCount }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Contributor {
  id?: number
  login: string
  avatar_url: string
  html_url?: string
  contributions?: number
  type?: string
}

interface Props {
  contributors: Contributor[]
  maxDisplay?: number
  size?: 'small' | 'medium' | 'large'
  spacing?: 'tight' | 'normal' | 'loose'
  clickable?: boolean
  showContributions?: boolean
  repo?: string
}

const props = withDefaults(defineProps<Props>(), {
  maxDisplay: 20,
  size: 'medium',
  spacing: 'normal',
  clickable: true,
  showContributions: false
})

const emit = defineEmits<{
  avatarClick: [contributor: Contributor]
}>()

const displayedContributors = computed(() => {
  return props.contributors.slice(0, props.maxDisplay)
})

const hasMore = computed(() => {
  return props.contributors.length > props.maxDisplay
})

const remainingCount = computed(() => {
  return props.contributors.length - props.maxDisplay
})

const avatarListClass = computed(() => {
  return [
    `avatar-list--${props.size}`,
    `avatar-list--${props.spacing}`,
    {
      'avatar-list--clickable': props.clickable
    }
  ]
})

const getAvatarUrl = (url: string) => {
  // 添加参数以优化加载
  return `${url}&s=80`
}

const onAvatarClick = (contributor: Contributor) => {
  if (props.clickable) {
    emit('avatarClick', contributor)
    if (contributor.html_url) {
      window.open(contributor.html_url, '_blank')
    }
  }
}

const onImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  // 设置默认头像
  img.src = 'https://github.com/identicons/app.png'
}
</script>

<style scoped>
.avatar-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.avatar-item {
  position: relative;
  border-radius: 50%;
  border: 2px solid #fff;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.avatar-item:not(:first-child) {
  margin-left: var(--avatar-spacing);
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

.avatar-clickable {
  cursor: pointer;
}

.avatar-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000 !important;
}

.contribution-count {
  position: absolute;
  bottom: -4px;
  right: -4px;
  background: #0969da;
  color: white;
  font-size: 10px;
  padding: 1px 4px;
  border-radius: 10px;
  min-width: 14px;
  text-align: center;
  line-height: 1.2;
}

.more-avatars {
  background: #f6f8fa;
  border: 2px solid #d0d7de;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.more-count {
  font-size: 12px;
  font-weight: 600;
  color: #656d76;
}

/* Size variants */
.avatar-list--small .avatar-item {
  width: 24px;
  height: 24px;
}

.avatar-list--small {
  --avatar-spacing: -8px;
}

.avatar-list--medium .avatar-item {
  width: 32px;
  height: 32px;
}

.avatar-list--medium {
  --avatar-spacing: -10px;
}

.avatar-list--large .avatar-item {
  width: 40px;
  height: 40px;
}

.avatar-list--large {
  --avatar-spacing: -12px;
}

/* Spacing variants */
.avatar-list--tight {
  --avatar-spacing: -6px;
}

.avatar-list--normal {
  /* Use default spacing from size variants */
}

.avatar-list--loose {
  --avatar-spacing: 4px;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .avatar-item {
    border-color: #21262d;
    background: #21262d;
  }
  
  .more-avatars {
    background: #21262d;
    border-color: #30363d;
  }
  
  .more-count {
    color: #f0f6fc;
  }
}
</style> 