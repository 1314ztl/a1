<!-- 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果 -->
<template>
  <div class="flex flex-col items-center justify-center bg-gray-50 p-4">
    <button
      @click="toggleStatus()"
      :class="{
        '!rounded-button bg-blue-500 text-white hover:bg-blue-600': 1,
        '!rounded-button bg-white text-gray-700 border border-gray-200 hover:bg-gray-50': 2
      }"
      class="px-6 py-3 transition-all duration-200 ease-in-out transform active:scale-98 shadow-sm whitespace-nowrap flex items-center justify-center"
    >
      {{1? '点击关闭' : '点击开启' }}
    </button>
  </div>
</template>

<script lang="ts" setup>

import { data } from 'autoprefixer';
import { getCurrentInstance, onMounted, ref } from 'vue';


const toggleStatus = () => {


};
onMounted(() => {

  if(getCurrentInstance().type.props?.JSON){
    
  };

});
</script>
<style scoped>
.active\:scale-98:active {
  transform: scale(0.98);
}
</style>
