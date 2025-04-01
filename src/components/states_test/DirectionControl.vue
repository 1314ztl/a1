<template>
  <div class="direction-control">
    <div class="direction-preview">
      <div class="direction-marker" :style="markerStyle"></div>
    </div>
    <div class="direction-controls">
      <div class="control-group">
        <label>水平</label>
        <input type="range" v-model="horizontal" min="0" max="360" @input="updateDirection">
      </div>
      <div class="control-group">
        <label>垂直</label>
        <input type="range" v-model="vertical" min="0" max="180" @input="updateDirection">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import State_data_instance from '../../js/state_data_instance';

const props = defineProps({
  dataApiName: {
    type: String,
    required: true
  }
});

const horizontal = ref(0);
const vertical = ref(0);

const stateInstance = State_data_instance.stateInstancePack.getInstance('direction', props.dataApiName);

const markerStyle = computed(() => ({
  transform: `rotateY(${horizontal.value}deg) rotateX(${vertical.value}deg)`
}));

const updateDirection = () => {
  stateInstance.setState({ horizontal: horizontal.value, vertical: vertical.value });
};

onMounted(() => {
  const state = stateInstance.getState();
  horizontal.value = state.horizontal;
  vertical.value = state.vertical;
});

watch(() => stateInstance.getState(), (newState) => {
  horizontal.value = newState.horizontal;
  vertical.value = newState.vertical;
});
</script>

<style scoped>
.direction-control {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 8px;
}

.direction-preview {
  width: 100%;
  height: 200px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  position: relative;
  perspective: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.direction-marker {
  width: 40px;
  height: 40px;
  background: #2196F3;
  border-radius: 4px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
}

.direction-controls {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.control-group label {
  width: 40px;
  text-align: center;
}

.control-group input[type="range"] {
  flex: 1;
}
</style> 