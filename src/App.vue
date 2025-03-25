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
  <div class="h-screen w-screen overflow-hidden">
    <Manager class="h-full w-full"></Manager>
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

html, body, #app {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>


