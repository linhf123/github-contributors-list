# API 参考

## 类型定义

### Contributor

贡献者数据接口定义：

```typescript
interface Contributor {
  /** GitHub用户ID */
  id?: number
  
  /** GitHub用户名 */
  login: string
  
  /** 用户头像URL */
  avatar_url: string
  
  /** GitHub个人页面URL */
  html_url?: string
  
  /** 贡献次数 */
  contributions?: number
  
  /** 用户类型（User, Bot等） */
  type?: string
}
```

## AvatarList 组件

### Props

#### contributors
- **类型:** `Contributor[]`
- **默认值:** `[]`
- **描述:** 贡献者数据数组

#### maxDisplay
- **类型:** `number`
- **默认值:** `20`
- **描述:** 最大显示的头像数量，超出部分将显示为"+N"

#### size
- **类型:** `'small' | 'medium' | 'large'`
- **默认值:** `'medium'`
- **描述:** 头像尺寸
  - `small`: 24x24px
  - `medium`: 32x32px  
  - `large`: 40x40px

#### spacing
- **类型:** `'tight' | 'normal' | 'loose'`
- **默认值:** `'normal'`
- **描述:** 头像之间的间距
  - `tight`: 更紧密的重叠
  - `normal`: 默认重叠度
  - `loose`: 头像之间有间隙

#### clickable
- **类型:** `boolean`
- **默认值:** `true`
- **描述:** 是否允许点击头像

#### showContributions
- **类型:** `boolean`
- **默认值:** `false`
- **描述:** 是否在头像上显示贡献数量徽章

### Events

#### avatarClick
- **参数:** `contributor: Contributor`
- **描述:** 当点击头像时触发，传递对应的贡献者数据

### Slots

组件暂不支持插槽。

## GitHubContributors 组件

### Props

#### repo
- **类型:** `string`
- **必需:** `true`
- **描述:** GitHub仓库名，格式为 `owner/repo`，例如 `vuejs/vue`

#### showContributions
- **类型:** `boolean`
- **默认值:** `false`  
- **描述:** 是否显示贡献数量

### Events

#### contributorClick
- **参数:** `contributor: Contributor`
- **描述:** 当点击贡献者头像时触发

### 内部状态

组件内部维护以下响应式状态：

```typescript
const loading = ref(false)      // 是否正在加载
const error = ref('')           // 错误信息
const contributors = ref([])    // 贡献者列表
const currentSize = ref('medium') // 当前头像尺寸
const maxDisplay = ref(20)      // 当前最大显示数量
```

## 样式变量

可以通过CSS变量自定义组件样式：

```css
.avatar-list {
  /* 头像间距 */
  --avatar-spacing: -10px;
  
  /* 头像边框颜色 */
  --avatar-border-color: #ffffff;
  
  /* 头像阴影 */
  --avatar-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  /* 悬停时的变换效果 */
  --hover-transform: translateY(-2px);
  
  /* 悬停时的阴影 */
  --hover-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}
```

## GitHub API

组件使用以下GitHub API获取数据：

### 获取贡献者列表

```
GET https://api.github.com/repos/{owner}/{repo}/contributors
```

**参数:**
- `per_page`: 每页数量（默认100）
- `page`: 页码（默认1）

**响应示例:**
```json
[
  {
    "login": "yyx990803",
    "id": 499550,
    "avatar_url": "https://avatars.githubusercontent.com/u/499550?v=4",
    "html_url": "https://github.com/yyx990803",
    "contributions": 1234,
    "type": "User"
  }
]
```

### API限制

- 未认证请求：60次/小时
- 认证请求：5000次/小时

组件会自动处理API限制和错误情况。

## 错误处理

### 网络错误
当网络请求失败时，组件会显示错误信息和重试按钮。

### 图片加载失败
当头像图片加载失败时，会自动使用默认头像。

### API限制
当超出GitHub API限制时，会显示相应的错误信息。

## 浏览器兼容性

组件支持所有现代浏览器：

- Chrome >= 87
- Firefox >= 78  
- Safari >= 14
- Edge >= 88

使用了以下现代Web特性：
- CSS Grid
- CSS Custom Properties
- Fetch API
- ES6+ 语法 