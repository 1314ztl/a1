<template>
  <ul>
    <li v-for="(value, key) in data" :key="key">
      <span v-if="typeof value === 'object' && value !== null">
        {{ key }}:
        <TreeView :data="value" />
      </span>
      <span v-else>
        {{ key }}: {{ value }}
      </span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 20px;
}

li {
  margin: 5px 0;
}
</style>
