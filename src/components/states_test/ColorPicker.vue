<template>
  <div class="color-picker">
    <div class="color-preview" :style="{ backgroundColor: currentColor }"></div>
    <div class="color-controls">
      <div class="color-slider">
        <label>R</label>
        <input type="range" v-model="r" min="0" max="255" @input="updateColor">
      </div>
      <div class="color-slider">
        <label>G</label>
        <input type="range" v-model="g" min="0" max="255" @input="updateColor">
      </div>
      <div class="color-slider">
        <label>B</label>
        <input type="range" v-model="b" min="0" max="255" @input="updateColor">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import State_data_instance from '../../js/state_data_instance';

const props = defineProps({
  dataApiName: {
    type: String,
    required: true
  }
});

const r = ref(0);
const g = ref(0);
const b = ref(0);
const currentColor = ref('rgb(0, 0, 0)');

const stateInstance = State_data_instance.stateInstancePack.getInstance('color', props.dataApiName);

const updateColor = () => {
  currentColor.value = `rgb(${r.value}, ${g.value}, ${b.value})`;
  stateInstance.setState({ r: r.value, g: g.value, b: b.value });
};

onMounted(() => {
  const state = stateInstance.getState();
  r.value = state.r;
  g.value = state.g;
  b.value = state.b;
  currentColor.value = `rgb(${r.value}, ${g.value}, ${b.value})`;
});

watch(() => stateInstance.getState(), (newState) => {
  r.value = newState.r;
  g.value = newState.g;
  b.value = newState.b;
  currentColor.value = `rgb(${r.value}, ${g.value}, ${b.value})`;
});
</script>

<style scoped>
.color-picker {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 8px;
}

.color-preview {
  width: 100%;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.color-controls {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.color-slider {
  display: flex;
  align-items: center;
  gap: 10px;
}

.color-slider label {
  width: 20px;
  text-align: center;
}

.color-slider input[type="range"] {
  flex: 1;
}
</style> 