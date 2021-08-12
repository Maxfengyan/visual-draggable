<template>
  <div
    tabindex="1"
    class="shape"
    :style="{ opacity: lockStatus ? 0.6 : 1 }"
    ref="shape"
    @click="selectCurComponent"
    @mousedown="handleMouseDownOnShape($event)"
  >
    <!-- 旋转 -->
    <i
      class="el-icon-refresh-right"
      v-show="componentActive && !lockStatus"
      @mousedown="handleRotate(defaultStyle, shape, $event)"
    />
    <!-- 锁定 -->
    <i class="el-icon-lock" v-show="false" />
    <!-- 八个圆点 -->
    <div
      class="shape-point"
      v-show="!lockStatus"
      v-for="(item, index) in componentActive ? state.pointList : []"
      :style="getPointStyle(item, defaultStyle, state)"
      @mousedown="
        handleMouseDownPoint(defaultStyle, shape, item, $event, state)
      "
    />
    <slot></slot>
  </div>
</template>

<script>
import { onMounted, ref, reactive, defineComponent, computed } from "vue";
import { getPointStyle } from "./dot/angle.js";
import { handleRotate } from "./rotate/index.js";
import { handleMouseDownPoint } from "./dot/handleChange.js";
export default defineComponent({
  props: {
    defaultStyle: {
      type: Object,
      required: true,
    },
    componentType: {
      type: Number,
    },
    currentIndex: {
      type: Number,
    },
    activeIndex: {
      type: Number,
    },
    lockStatus: {},
  },
  emits: ["changeactiveindex"],
  setup(props, context) {
    // document DOM
    const shape = ref();

    // 初始数据
    const state = reactive({
      pointList: ["lt", "t", "rt", "r", "rb", "b", "lb", "l"],
      style: props.defaultStyle,
    });

    const selectCurComponent = ($event) => {
      $event.target.focus();
      $event.stopPropagation();
      $event.preventDefault();
    };

    const componentActive = computed(() => {
      return props.currentIndex === props.activeIndex;
    });

    const handleMouseDownOnShape = ($event) => {
      context.emit("changeactiveindex", props.currentIndex);
      if (props.lockStatus) {
        return false;
      }
      if (props.componentType === 0) {
        $event.preventDefault();
      }
      $event.stopPropagation();
      const startY = $event.clientY;
      const startX = $event.clientX;

      const startTop = Number(props.defaultStyle.top);
      const startLeft = Number(props.defaultStyle.left);

      const move = (moveEvent) => {
        const curX = moveEvent.clientX;
        const curY = moveEvent.clientY;
        /* 防止跑出画布以外，加上限制条件 */
        if (curX - startX + startLeft < 0) {
          props.defaultStyle.left = 0;
        }
        if (curX - startX + startLeft + props.defaultStyle.width > 1280) {
          props.defaultStyle.left = 1280 - props.defaultStyle.width;
        }
        if (
          curX - startX + startLeft >= 0 &&
          curX - startX + startLeft + props.defaultStyle.width <= 1280
        ) {
          props.defaultStyle.left = curX - startX + startLeft;
        }

        if (curY - startY + startTop < 0) {
          props.defaultStyle.top = 0;
        } else {
          props.defaultStyle.top = curY - startY + startTop;
        }

        // 预留标线和吸附功能
      };

      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    };

    return {
      state,
      getPointStyle,
      handleRotate,
      componentActive,
      shape,
      handleMouseDownPoint,
      handleMouseDownOnShape,
      selectCurComponent,
    };
  },
});
</script>

<style scoped lang="scss">
.shape {
  position: absolute;

  &:hover {
    cursor: move;
  }

  .el-icon-refresh-right {
    position: absolute;
    cursor: grab;
    color: #409eff;
    font-size: 24px;
    font-weight: 600;
    top: -34px;
    left: 50%;
    transform: translateX(-50%);
  }

  .shape-point {
    position: absolute;
    background: #fff;
    border: 1px solid #409eff;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    z-index: 1;
  }
}
</style>