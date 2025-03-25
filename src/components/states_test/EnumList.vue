<template>
    <select v-model="value" @change="updateState">
      <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
    </select>
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
    const value = ref("");
    const options = ref([]);
    const stateInstance = ref(null);

    const updateState = () => {
      stateInstance.value.setState(value.value);
    };

    onMounted(() => {
      stateInstance.value = State_data_instance.stateInstancePack.getInstance(State_data_instance.types.ENUM, props.dataapiname);
      stateInstance.value.syncFromServer().then(() => {
        value.value = stateInstance.value.getState();
        options.value = stateInstance.value.getOptions();
      });
    });

    return {
      value,
      options,
      updateState
    };
  }
};
</script>
