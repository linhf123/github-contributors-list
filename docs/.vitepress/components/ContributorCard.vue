<template>
  <div class="contributor-card" :class="cardClass">
    <div class="card-header">
      <img
        :src="getAvatarUrl(contributor.avatar_url)"
        :alt="contributor.login"
        class="card-avatar"
        @error="onImageError"
      />
      <div class="card-info">
        <h3 class="card-title">
          <a 
            v-if="contributor.html_url" 
            :href="contributor.html_url" 
            target="_blank" 
            rel="noopener noreferrer"
            class="card-link"
          >
            {{ contributor.name || contributor.login }}
          </a>
          <span v-else>{{ contributor.name || contributor.login }}</span>
        </h3>
        <p v-if="contributor.bio" class="card-bio">{{ contributor.bio }}</p>
        <p class="card-username">@{{ contributor.login }}</p>
      </div>
    </div>
    
    <div v-if="showStats" class="card-stats">
      <div v-if="contributor.contributions" class="stat-item">
        <span class="stat-label">Contributions</span>
        <span class="stat-value">{{ contributor.contributions }}</span>
      </div>
      <div v-if="contributor.type" class="stat-item">
        <span class="stat-label">Type</span>
        <span class="stat-value">{{ contributor.type }}</span>
      </div>
    </div>
    
    <div v-if="showActions" class="card-actions">
      <a 
        v-if="contributor.html_url" 
        :href="contributor.html_url" 
        target="_blank" 
        rel="noopener noreferrer"
        class="action-btn primary"
      >
        View Profile
      </a>
      <button 
        v-if="onFollow" 
        @click="onFollow(contributor)"
        class="action-btn secondary"
      >
        Follow
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

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

interface Props {
  contributor: Contributor
  variant?: 'default' | 'compact' | 'detailed'
  showStats?: boolean
  showActions?: boolean
  onFollow?: (contributor: Contributor) => void
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  showStats: true,
  showActions: true
})

const cardClass = computed(() => ({
  [`card-${props.variant}`]: true
}))

const getAvatarUrl = (url: string): string => {
  if (!url) return ''
  // 确保头像URL包含尺寸参数
  const urlObj = new URL(url)
  urlObj.searchParams.set('s', '120')
  return urlObj.toString()
}

const onImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = `https://github.com/identicons/${props.contributor.login}.png`
}
</script>

<style scoped>
.contributor-card {
  /* CSS变量用于主题定制 */
  --card-background: #fff;
  --card-color: #24292e;
  --card-border: 1px solid #d0d7de;
  --card-border-radius: 12px;
  --card-padding: 20px;
  --card-shadow: 0 1px 3px rgba(0,0,0,0.1);
  
  --card-avatar-size: 64px;
  --card-avatar-border-radius: 50%;
  
  --card-title-size: 18px;
  --card-title-weight: 600;
  --card-subtitle-size: 14px;
  --card-subtitle-color: #656d76;
  
  --card-stats-background: #f6f8fa;
  --card-stats-border-radius: 6px;
  --card-stats-padding: 8px 12px;
  
  background: var(--card-background);
  color: var(--card-color);
  border: var(--card-border);
  border-radius: var(--card-border-radius);
  padding: var(--card-padding);
  box-shadow: var(--card-shadow);
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contributor-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.card-avatar {
  width: var(--card-avatar-size);
  height: var(--card-avatar-size);
  border-radius: var(--card-avatar-border-radius);
  object-fit: cover;
  flex-shrink: 0;
}

.card-info {
  flex: 1;
  min-width: 0;
}

.card-title {
  margin: 0 0 4px 0;
  font-size: var(--card-title-size);
  font-weight: var(--card-title-weight);
  line-height: 1.3;
}

.card-link {
  color: inherit;
  text-decoration: none;
}

.card-link:hover {
  text-decoration: underline;
}

.card-bio {
  margin: 0 0 8px 0;
  font-size: var(--card-subtitle-size);
  color: var(--card-subtitle-color);
  line-height: 1.4;
}

.card-username {
  margin: 0;
  font-size: var(--card-subtitle-size);
  color: var(--card-subtitle-color);
  font-weight: 500;
}

.card-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.stat-item {
  background: var(--card-stats-background);
  border-radius: var(--card-stats-border-radius);
  padding: var(--card-stats-padding);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
}

.stat-label {
  font-size: 12px;
  color: var(--card-subtitle-color);
  margin-bottom: 2px;
}

.stat-value {
  font-size: 16px;
  font-weight: 600;
  color: var(--card-color);
}

.card-actions {
  display: flex;
  gap: 8px;
  margin-top: auto;
}

.action-btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  text-align: center;
}

.action-btn.primary {
  background: #0969da;
  color: white;
}

.action-btn.primary:hover {
  background: #0860ca;
}

.action-btn.secondary {
  background: #f6f8fa;
  color: #24292e;
  border: 1px solid #d0d7de;
}

.action-btn.secondary:hover {
  background: #f3f4f6;
}

/* 变体样式 */
.card-compact {
  padding: 12px;
  --card-avatar-size: 48px;
  --card-title-size: 16px;
}

.card-compact .card-header {
  gap: 12px;
}

.card-compact .card-stats,
.card-compact .card-actions {
  display: none;
}

.card-detailed {
  --card-padding: 24px;
  --card-avatar-size: 80px;
  --card-title-size: 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .contributor-card {
    --card-padding: 16px;
    --card-avatar-size: 48px;
    --card-title-size: 16px;
  }
  
  .card-header {
    gap: 12px;
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
  
  .stat-item {
    min-width: 60px;
  }
}
</style> 