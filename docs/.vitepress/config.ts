import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'GitHub Contributors List',
  description: 'Vue版本的GitHub Contributors List组件',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/components/' },
      { text: '示例', link: '/examples/' },
      { text: 'API', link: '/api/' }
    ],

    sidebar: {
      '/components/': [
        {
          text: '组件介绍',
          items: [
            { text: '概览', link: '/components/' },
            { text: 'AvatarList', link: '/components/avatar-list' },
            { text: 'ContributorCard', link: '/components/contributor-card' }
          ]
        }
      ],
      '/examples/': [
        {
          text: '使用示例',
          items: [
            { text: '概览', link: '/examples/' },
            { text: '基础用法', link: '/examples/basic' },
            { text: '自定义样式', link: '/examples/custom-style' },
            { text: '数据过滤', link: '/examples/filtering' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API参考',
          items: [
            { text: 'API文档', link: '/api/' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vue/github-contributors-list' }
    ],

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/vue/github-contributors-list/edit/main/docs/:path',
      text: '编辑此页'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Vue Contributors Team'
    }
  },

  markdown: {
    theme: 'github-dark'
  }
}) 