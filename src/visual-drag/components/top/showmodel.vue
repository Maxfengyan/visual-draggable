<template>
  <i
    class="model"
    :class="[state.status ? 'el-icon-sunny' : 'el-icon-moon']"
    :title="state.status ? '日照模式' : '夜间模式'"
    @click="state.status = !state.status"
  />
</template>

<script>
import { defineComponent, reactive, watch } from "vue";
export default defineComponent({
  setup() {
    const state = reactive({
      status: true,
      styleText: "",
    });
    watch(state, (value) => {
      /* 下面的方法稍微有点蠢，但是没想好更好的方法 */
      if (value.status) {
        var styles = document.querySelectorAll("head style");
        var targetStyle = styles[styles.length - 1];
        if (targetStyle.innerHTML.indexOf("#darkModel") === 0) {
          state.styleText = targetStyle.innerHTML;
          document.querySelector("head").removeChild(targetStyle);
        }
      } else {
        if (state.styleText) {
          var style = document.createElement("style");
          style.innerHTML = state.styleText;
          document.querySelector("head").appendChild(style);
        } else {
          import("../theme/dark.css");
        }
      }
    });
    return { state };
  },
});
</script>

<style scoped>
.model {
  position: absolute;
  right: 30px;
  top: 18px;
  cursor: pointer;
  font-size: 30px;
  color: #409eff;
}
</style>