<template>
    <div>
        <button @click="toggleColor">Click me</button>
        <p :style="{ color: textColor }">example</p>

    </div>
</template>

<script>
import State_data_instance from '../../js/state_data_instance';

export default {
    data() {
        return {
            isRed: true,
            state_data_instance:State_data_instance.stateInstancePack
        };
    },
    computed: {
        textColor() {
            return this.isRed ? 'red' : 'blue';
        }
    },
    methods: {
        toggleColor() {
            this.isRed = !this.isRed;
        }
    }
};
</script>

<style scoped>
/* 你可以在这里添加其他样式 */
</style>