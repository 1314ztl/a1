<script setup>
import { provide, ref } from 'vue';
import Manager from './components/Manager.vue';
import Conversion_page from './conversion_page.vue';

provide('isDebug', ref(true));
const render = ref(()=>{
  window?.renderUserView();
});
</script>

<template>
  <div class="w-screen h-screen m-0 p-0 overflow-hidden">
    <Manager></Manager>
    <!-- <Conversion_page></Conversion_page> -->
  </div>
</template>

<style>
/* 重置默认样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#app {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>


