<!-- 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果 -->

<template>
    <div class="container mx-auto px-4 min-h-screen flex flex-col">
      <!-- 顶部槽 -->
      <div class="h-24 flex items-center justify-center border-b border-gray-200">
        <slot name="header">
          <h1 class="text-2xl font-bold text-gray-800">默认头部内容</h1>
        </slot>
      </div>
  
      <!-- 底部槽 -->
      <div class="flex-1 overflow-auto">
        <div class="flex flex-wrap gap-4 py-6">
          <slot name="content">
            <div v-for="item in defaultItems" 
                 :key="item.id" 
                 class="flex-shrink-0 w-64 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <i :class="item.icon" class="text-blue-500 text-xl"></i>
                </div>
                <div>
                  <h3 class="font-medium text-gray-800">{{ item.title }}</h3>
                  <p class="text-sm text-gray-500">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  
  const defaultItems = ref([
    {
      id: 1,
      title: '数据分析',
      description: '深入解析业务数据',
      icon: 'fas fa-chart-line'
    },
    {
      id: 2,
      title: '用户管理',
      description: '高效的用户体系',
      icon: 'fas fa-users'
    },
    {
      id: 3,
      title: '内容管理',
      description: '便捷的内容操作',
      icon: 'fas fa-file-alt'
    },
    {
      id: 4,
      title: '系统设置',
      description: '完善的配置选项',
      icon: 'fas fa-cog'
    },
    {
      id: 5,
      title: '消息中心',
      description: '即时通讯服务',
      icon: 'fas fa-bell'
    },
    {
      id: 6,
      title: '任务管理',
      description: '高效的任务分配',
      icon: 'fas fa-tasks'
    },
    {
      id: 7,
      title: '数据备份',
      description: '安全的数据存储',
      icon: 'fas fa-database'
    },
    {
      id: 8,
      title: '权限控制',
      description: '精细的权限管理',
      icon: 'fas fa-lock'
    }
  ]);
  </script>
  
  <style scoped>
  .container {
    background-color: #f8fafc;
  }
  </style>
  