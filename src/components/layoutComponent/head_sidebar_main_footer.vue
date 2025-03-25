<!-- 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果 -->

<template>
    <div class="layout-container min-h-screen flex flex-col">
      <!-- 头部区域 -->
      <header class="header-wrapper w-full bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 h-16">
        <slot name="header">
        </slot>
      </header>
  
      <!-- 主要内容区域 -->
      <div class="content-wrapper flex flex-1 mt-16">
        <!-- 侧边栏 -->
        <aside 
          class="sidebar-wrapper fixed left-0 top-16 bottom-0 bg-gray-800 text-white transition-all duration-300"
          :class="[isCollapsed ? 'w-20' : 'w-64']">
          <slot name="sidebar">
            
          </slot>
        </aside>
  
        <!-- 主内容区 -->
        <main 
          class="main-wrapper flex-1 transition-all duration-300 min-h-[calc(100vh-4rem-3rem)] bg-gray-100"
          :class="[isCollapsed ? 'ml-20' : 'ml-64']">
          <slot name="main">
            
          </slot>
        </main>
      </div>
  
      <!-- 底部区域 -->
      <footer 
        class="footer-wrapper bg-white border-t border-gray-200 h-12 transition-all duration-300"
        :class="[isCollapsed ? 'ml-20' : 'ml-64']">
        <slot name="footer">
        </slot>
      </footer>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  
  const isCollapsed = ref(false);
  
  const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value;
  };
  </script>
  
  <style scoped>
  .layout-container {
    position: relative;
    min-width: 1440px;
  }
  
  .header-wrapper {
    min-width: 1440px;
  }
  
  .sidebar-wrapper {
    min-height: calc(100vh - 4rem);
  }
  
  .main-wrapper {
    min-height: calc(100vh - 4rem - 3rem);
  }
  
  .footer-wrapper {
    position: relative;
    min-width: 1440px;
  }
  </style>
  