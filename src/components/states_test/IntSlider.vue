<template>
    <input type="range" :min="range.min" :max="range.max" v-model="value" @change="updateState" />
</template>

<script>
import { ref, onMounted, inject } from 'vue';
import State_data_instance from "../../js/state_data_instance";
import { data } from 'jquery';

export default {
  props: {
    dataapiname: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const value = ref(0);
    const range = ref({ min: 0, max: 100 });
    const stateInstance = ref(null);

    const updateState = () => {
      stateInstance.value.setState(value.value);
    };

    onMounted(() => {
      stateInstance.value = State_data_instance.stateInstancePack.getInstance(State_data_instance.types.INT, props.dataapiname);
      stateInstance.value.syncFromServer().then(() => {
        value.value = stateInstance.value.getState();
        range.value = stateInstance.value.getRange();
      });
    });

    return {
      value,
      range,
      updateState
    };
  }
};
</script>
