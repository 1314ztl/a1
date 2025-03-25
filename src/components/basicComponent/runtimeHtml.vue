<script>
import { compile } from '@vue/compiler-sfc';
export default {
  props: ['html'],
  render(h) {

    const { render } = compile(this.html);
    return render.call(this, h);
  }
}
</script>