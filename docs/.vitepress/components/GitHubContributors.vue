<template>
  <div class="github-contributors">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <span>Loading contributors...</span>
    </div>
    
    <div v-else-if="error" class="error">
      <span>{{ error }}</span>
      <button @click="fetchContributors" class="retry-btn">Retry</button>
    </div>
    
    <div v-else class="contributors-container">
      <div class="header">
        <h3>Contributors ({{ contributors.length }})</h3>
        <div class="controls">
          <label>
            Size:
            <select v-model="currentSize">
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </label>
          <label>
            Max Display:
            <input 
              v-model.number="maxDisplay" 
              type="number" 
              min="1" 
              max="100"
            >
          </label>
        </div>
      </div>
      
      <AvatarList
        :contributors="contributors"
        :max-display="maxDisplay"
        :size="currentSize"
        :clickable="true"
        :show-contributions="showContributions"
        @avatar-click="onAvatarClick"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import AvatarList from './AvatarList.vue'

const props = defineProps({
  repo: {
    type: String,
    required: true
  },
  showContributions: {
    type: Boolean,
    default: false
  }
})

const loading = ref(false)
const error = ref('')
const contributors = ref([])
const currentSize = ref('medium')
const maxDisplay = ref(20)

const emit = defineEmits(['contributorClick'])

const fetchContributors = async () => {
  if (!props.repo) return
  
  loading.value = true
  error.value = ''
  
  try {
    const response = await fetch(
      `https://api.github.com/repos/${props.repo}/contributors?per_page=100`
    )
    
    if (!response.ok) {
      throw new Error(`Failed to fetch contributors: ${response.status}`)
    }
    
    const data = await response.json()
    contributors.value = data
  } catch (err) {
    error.value = err.message
    console.error('Error fetching contributors:', err)
  } finally {
    loading.value = false
  }
}

const onAvatarClick = (contributor) => {
  emit('contributorClick', contributor)
}

watch(() => props.repo, fetchContributors, { immediate: true })

onMounted(() => {
  if (props.repo) {
    fetchContributors()
  }
})
</script>

<style scoped>
.github-contributors {
  margin: 20px 0;
}

.loading {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px;
  color: #666;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #666;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  color: #d73a49;
  padding: 10px;
  border: 1px solid #d73a49;
  border-radius: 4px;
  background-color: #ffeef0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.retry-btn {
  background: #d73a49;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.retry-btn:hover {
  background: #b92c3b;
}

.contributors-container {
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  padding: 16px;
  background: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 10px;
}

.header h3 {
  margin: 0;
  color: #24292e;
}

.controls {
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
}

.controls label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #586069;
}

.controls select,
.controls input {
  padding: 4px 8px;
  border: 1px solid #d1d5da;
  border-radius: 4px;
  font-size: 14px;
}

.controls input[type="number"] {
  width: 60px;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .contributors-container {
    background: #0d1117;
    border-color: #30363d;
  }
  
  .header h3 {
    color: #f0f6fc;
  }
  
  .controls label {
    color: #8b949e;
  }
  
  .controls select,
  .controls input {
    background: #21262d;
    border-color: #30363d;
    color: #f0f6fc;
  }
  
  .error {
    background-color: #490202;
    border-color: #f85149;
    color: #f85149;
  }
}
</style> 