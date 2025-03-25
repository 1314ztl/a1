<template>
    <button @click="toggleState">{{ value ? 'On' : 'Off' }}</button>
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
    const value = ref(false);
    const stateInstance = ref(null);

    const toggleState = () => {
      value.value = !value.value;
      stateInstance.value.setState(value.value);
    };

    onMounted(() => {
      stateInstance.value = State_data_instance.stateInstancePack.getInstance(State_data_instance.types.BOOL, props.dataapiname);
      stateInstance.value.syncFromServer().then(() => {
        value.value = stateInstance.value.getState();
      });
    });

    return {
      stateInstance,
      value,
      toggleState
    };
  }
};
</script>
