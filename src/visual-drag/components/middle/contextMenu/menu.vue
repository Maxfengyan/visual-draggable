<template>
  <div
    class="contextmenu"
    v-show="contextStatus"
    :style="{ top: contextTop + 'px', left: contextLeft + 'px' }"
  >
    <ul>
      <li v-if="Object.keys(state.copyData).length > 0" @click="paste">粘贴</li>
      <template v-if="contextIndex !== -1">
        <!-- !curComponent.isLock -->
        <li @click="copy">复制</li>
        <!-- <li @click="paste">粘贴</li> -->
        <!-- <li @click="cut">剪切</li> -->
        <li
          v-if="
            contextData[contextIndex] && contextData[contextIndex].lockStatus
          "
          @click="unLock"
        >
          解锁
        </li>
        <li v-else @click="lock">锁定</li>
        <li
          v-if="
            contextData[contextIndex] && !contextData[contextIndex].lockStatus
          "
          @click="deleteComponent"
        >
          删除
        </li>
        <li
          v-if="
            contextData[contextIndex] && !contextData[contextIndex].lockStatus
          "
          @click="topComponent"
        >
          置顶
        </li>
        <li
          v-if="
            contextData[contextIndex] && !contextData[contextIndex].lockStatus
          "
          @click="bottomComponent"
        >
          置底
        </li>
        <!-- <li @click="upComponent">上移</li>
        <li @click="downComponent">下移</li> -->
      </template>
    </ul>
  </div>
</template>

<script>
import { reactive, defineComponent } from "vue";
export default defineComponent({
  props: {
    contextStatus: {
      type: Boolean,
      required: true,
    },
    contextLeft: {
      type: Number,
      required: true,
    },
    contextTop: {
      type: Number,
      required: true,
    },
    contextIndex: {
      type: Number,
      // required: true,
    },
    contextData: {
      type: Array,
      required: true,
    },
  },
  setup(props, context) {
    const state = reactive({
      copyData: {},
    });
    const copy = () => {
      const { contextData, contextIndex } = props;
      state.copyData = JSON.parse(JSON.stringify(contextData[contextIndex]));
    };
    const paste = (e) => {
      if (Object.keys(state.copyData).length > 0) {
        state.copyData.style.top = e.clientY - 100;
        state.copyData.style.left = e.clientX - 250;
        // 复制后组件为解锁状态
        state.copyData.lockStatus = false;
        props.contextData.push(state.copyData);
        state.copyData = {};
      }
    };
    const lock = () => {
      const { contextData, contextIndex } = props;
      contextData[contextIndex].lockStatus = true;
    };
    const unLock = () => {
      const { contextData, contextIndex } = props;
      contextData[contextIndex].lockStatus = false;
    };
    const deleteComponent = () => {
      const { contextData, contextIndex } = props;
      contextData.splice(contextIndex, 1);
    };
    const topComponent = () => {
      const { contextData, contextIndex } = props;
      var itemData = contextData.splice(contextIndex, 1);
      contextData.push(itemData[0]);
    };
    const bottomComponent = () => {
      const { contextData, contextIndex } = props;
      var itemData = contextData.splice(contextIndex, 1);
      contextData.unshift(itemData[0]);
    };
    return {
      state,
      copy,
      paste,
      lock,
      unLock,
      deleteComponent,
      topComponent,
      bottomComponent,
    };
  },
});
</script>

<style scoped lang="scss">
.contextmenu {
  position: absolute;
  z-index: 1000;

  ul {
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    margin: 5px 0;
    padding: 6px 0;

    li {
      font-size: 14px;
      padding: 0 20px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #606266;
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;
      user-select: none;

      &:hover {
        background-color: #e6e8ea;
      }
    }
  }
}
</style>