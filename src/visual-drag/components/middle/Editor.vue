<template>
  <div
    class="editor"
    @contextmenu="handleContextMenu"
    @mouseup="cancelContextMenu"
  >
    <shapecomponent
      v-for="(item, index) in state.data"
      :style="getShapeStyle(item.style, index)"
      :default-style="item.style"
      :component-type="item.type"
      :current-index="index"
      :lock-status="item.lockStatus"
      :active-index="state.active"
      @changeactiveindex="handleActiveIndex"
    >
      <!-- 图片组件 -->
      <component
        class="component"
        v-if="item.type === 0"
        :is="item.component"
        :prop-value="item.propValue"
        :border-radius="item.style.borderRadius"
        :prop-index="index"
        @deleteitem="handleDelete"
        @move="handleMove"
      />
      <!-- 热区组件 -->
      <component
        class="component"
        v-else-if="item.type === 1"
        :is="item.component"
        :prop-index="index"
        :border-radius="item.style.borderRadius"
        :prop-default="item.default"
        :prop-color="item.style.color"
        @deleteitem="handleDelete"
        @move="handleMove"
      />

      <!-- 文字组件 -->
      <component
        class="component"
        v-else="item.type === 2"
        :is="item.component"
        :prop-data="item"
        :prop-index="index"
        :prop-element="item.style"
        @deleteitem="handleDelete"
        @move="handleMove"
      />
    </shapecomponent>
    <!-- 右击菜单 -->
    <contextmenu
      :context-data="state.data"
      :context-status="state.showContextMenu"
      :context-left="state.left"
      :context-top="state.top"
      :context-index="state.active"
    />
  </div>
</template>

<script>
import { defineComponent, watch, reactive } from "vue";
import Shapecomponent from "./Shape.vue";
import Contextmenu from "./contextMenu/menu.vue";
import vImg from "../common/Vimg.vue";
import vWord from "../common/Vword.vue";
import vHot from "../common/Vhotarea.vue";
export default {
  props: {
    componentData: {
      type: Array,
    },
  },
  emits: ["activeindex"],
  components: {
    Shapecomponent,
    Contextmenu,
    vImg,
    vWord,
    vHot,
  },
  setup(props, context) {
    const state = reactive({
      data: [],
      active: 0,
      showContextMenu: false,
      left: 0,
      top: 0,
    });
    watch(
      () => props.componentData,
      (value) => {
        if (value.length == 1) {
          state.active = 0;
        }
        state.data = value;
      },
      {
        deep: true,
      }
    );
    const handleDelete = (e) => {
      state.data.splice(e, 1);
    };
    // 组件样式
    const getShapeStyle = (style, index) => {
      const result = {};
      ["width", "height", "top", "left", "rotate", "borderRadius"].forEach(
        (attr) => {
          if (attr === "rotate") {
            result.transform = "rotate(" + style[attr] + "deg)";
          } else if (attr === "zIndex") {
            result[attr] = style[attr];
          } else {
            result[attr] = style[attr] + "px";
          }
        }
      );
      return result;
    };

    // 展示右击菜单
    const handleContextMenu = (e) => {
      e.stopPropagation();
      e.preventDefault();
      state.showContextMenu = true;
      // 计算菜单相对于编辑器的位移
      let target = e.target;
      let top = e.offsetY;
      let left = e.offsetX;
      while (!target.className.includes("editor")) {
        left = target.offsetLeft + left;
        top = target.offsetTop + top;
        target = target.parentNode;
      }
      state.left = left;
      state.top = top;
    };

    // 选中组件
    const handleActiveIndex = (index) => {
      state.active = index;
      context.emit("activeindex", index);
    };

    // 取消右键
    const cancelContextMenu = (e) => {
      // 点击取消右键菜单
      if (e.button !== 2) {
        state.showContextMenu = false;
      }

      // 取消选中状态组件
      if (e.target.className.includes("editor")) {
        state.active = -1;
        context.emit("activeindex", -1);
      }
    };

    // 键盘方向控制移动
    const handleMove = (index, position) => {
      if (position === "left") {
        state.data[index].style.left =
          state.data[index].style.left <= 0
            ? 0
            : state.data[index].style.left - 1;
      } else if (position === "right") {
        state.data[index].style.left =
          state.data[index].style.left + state.data[index].style.width >= 1280
            ? state.data[index].style.left
            : state.data[index].style.left + 1;
      } else if (position === "up") {
        state.data[index].style.top =
          state.data[index].style.top <= 0
            ? 0
            : state.data[index].style.top - 1;
      } else {
        state.data[index].style.top = state.data[index].style.top + 1;
      }
    };
    return {
      state,
      getShapeStyle,
      handleActiveIndex,
      handleContextMenu,
      cancelContextMenu,
      handleDelete,
      handleMove,
    };
  },
};
</script>

<style lang="scss" scoped>
.editor {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .component {
    width: 100%;
    outline: none;
    height: 100%;
    overflow: hidden;
    user-select: none;
  }
}
</style>