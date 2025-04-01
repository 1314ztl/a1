<template>
  <div class="position-control">
    <div class="position-preview">
      <div class="position-marker" :style="markerStyle"></div>
    </div>
    <div class="position-controls">
      <div class="control-group">
        <label>X</label>
        <input type="range" v-model="x" min="0" max="100" @input="updatePosition">
      </div>
      <div class="control-group">
        <label>Y</label>
        <input type="range" v-model="y" min="0" max="100" @input="updatePosition">
      </div>
      <div class="control-group">
        <label>Z</label>
        <input type="range" v-model="z" min="0" max="100" @input="updatePosition">
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

const x = ref(0);
const y = ref(0);
const z = ref(0);

const stateInstance = State_data_instance.stateInstancePack.getInstance('position', props.dataApiName);

const markerStyle = computed(() => ({
  left: `${x.value}%`,
  top: `${y.value}%`,
  transform: `translate(-50%, -50%) translateZ(${z.value}px)`
}));

const updatePosition = () => {
  stateInstance.setState({ x: x.value, y: y.value, z: z.value });
};

onMounted(() => {
  const state = stateInstance.getState();
  x.value = state.x;
  y.value = state.y;
  z.value = state.z;
});

watch(() => stateInstance.getState(), (newState) => {
  x.value = newState.x;
  y.value = newState.y;
  z.value = newState.z;
});
</script>

<style scoped>
.position-control {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 8px;
}

.position-preview {
  width: 100%;
  height: 200px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  position: relative;
  perspective: 1000px;
}

.position-marker {
  width: 20px;
  height: 20px;
  background: #4CAF50;
  border-radius: 50%;
  position: absolute;
  transition: all 0.3s ease;
}

.position-controls {
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
  width: 20px;
  text-align: center;
}

.control-group input[type="range"] {
  flex: 1;
}
</style> 