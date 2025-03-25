<script>
import { h, ref, resolveComponent } from 'vue'
import example from './example.vue';

export default {
  setup() {
    return ()=>h(resolveComponent("example"))
  }
}
</script>