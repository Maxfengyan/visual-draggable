<template>
  <div class="special-right">
    <el-tabs v-model="state.activeName" @tab-click="handleClick" stretch>
      <el-tab-pane label="属性" name="property">
        <propertycomponent
          v-if="componentData && !componentData.lockStatus"
          :property-data="componentData"
        />
      </el-tab-pane>
      <el-tab-pane disabled label="动画" name="animation">动画</el-tab-pane>
      <el-tab-pane disabled label="事件" name="event">事件</el-tab-pane>
    </el-tabs>
    <div class="plsSelectItem" v-if="!componentData">请选择组件</div>
    <div class="plsSelectItem" v-if="componentData && componentData.lockStatus">
      组件已锁定
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import Propertycomponent from "./component/Property.vue";
export default defineComponent({
  props: {
    componentData: {
      type: Object || undefined,
    },
    componentAll: {
      type: Array,
    },
  },
  components: {
    Propertycomponent,
  },
  setup() {
    const state = reactive({
      activeName: "property",
    });

    const handleClick = (tab, event) => {};
    return { state, handleClick };
  },
});
</script>

<style lang="scss">
.special-right {
  height: calc(100% - 99px);
  width: calc(100% - (1280px + 200px + 60px));
  margin-left: 15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  display: inline-block;
  box-sizing: border-box;
  vertical-align: top;
  padding: 0 15px;

  .el-tabs__nav {
    width: 90%;
    display: flex;
    justify-content: space-evenly;
  }
}

.plsSelectItem {
  width: 100%;
  height: 100%;
  writing-mode: vertical-lr;
  color: #409eff;
  font-size: 50px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 75px;
  text-align: center;
  user-select: none;
  opacity: 0.5;
}
</style>