<!-- 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果 -->

<template>
    <div class="flex flex-col min-h-[600px] w-full relative">
      <!-- 内容展示区域 -->
      <div class="flex-1 relative">
        <div v-for="index in num" :key="index" class="absolute inset-0 w-full h-full transition-opacity duration-500" :class="{ 'opacity-0': currentIndex !== index - 1, 'opacity-100': currentIndex === index - 1 }" v-show="currentIndex === index - 1">
          <slot :name="`page-${index}`">
            <div class="w-full h-full flex items-center justify-center bg-gray-100">
              <span class="text-gray-400">第 {{ index }} 页内容</span>
            </div>
          </slot>
        </div>
      </div>
  
      <!-- 控制按钮区域 -->
      <div class="h-16 flex items-center justify-center space-x-2 bg-white">
        <button v-for="index in num" :key="index" @click="switchPage(index - 1)" class="w-3 h-3 rounded-full transition-all duration-300 !rounded-button" :class="[currentIndex === index - 1 ? 'bg-blue-500 scale-110' : 'bg-gray-300 hover:bg-gray-400']" :aria-label="`切换到第${index}页`"></button>
      </div>
  
      <!-- 左右切换按钮 -->
      <button @click="prevPage" class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors !rounded-button whitespace-nowrap">
        <i class="fas fa-chevron-left text-gray-600"></i>
      </button>
      <button @click="nextPage" class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors !rounded-button whitespace-nowrap">
        <i class="fas fa-chevron-right text-gray-600"></i>
      </button>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, watch } from 'vue';
  
  interface Props {
    num: number;
    modelValue?: number;
    animationDuration?: number;
  }
  
  const props = withDefaults(defineProps<Props>(), {
    num: 1,
    modelValue: 0,
    animationDuration: 500
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const currentIndex = ref(props.modelValue);
  
  watch(() => props.modelValue, (newVal) => {
    currentIndex.value = newVal;
  });
  
  watch(currentIndex, (newVal) => {
    emit('update:modelValue', newVal);
  });
  
  const switchPage = (index: number) => {
    currentIndex.value = index;
  };
  
  const nextPage = () => {
    currentIndex.value = (currentIndex.value + 1) % props.num;
  };
  
  const prevPage = () => {
    currentIndex.value = (currentIndex.value - 1 + props.num) % props.num;
  };
  </script>
  
  <style scoped>
  .page-enter-active,
  .page-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
  }
  </style>