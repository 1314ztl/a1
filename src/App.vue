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
  <header></header>
  <main>
    <div id="app" style="height: 100vh; width: 100vw;">
      <Manager></Manager>
      <!-- <Conversion_page></Conversion_page> -->
    </div>
  </main>
</template>

<style scoped>
</style>


