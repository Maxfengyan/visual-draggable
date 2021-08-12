<template>
  <div>
    <el-button-group>
      <el-button size="small" type="success" round @click="addComponent(0)"
        >添加图片</el-button
      >
      <el-button size="small" type="success" round @click="addComponent(1)"
        >添加热区</el-button
      >
      <el-button size="small" type="success" round @click="addComponent(2)"
        >添加文字</el-button
      >
    </el-button-group>
    <el-button-group style="margin-left: 20px">
      <!-- <el-button size="small" type="primary" round>撤销</el-button> -->
      <el-button size="small" type="primary" round @click="clearCanvas"
        >清空画布</el-button
      >
      <el-button size="small" type="primary" round @click="review"
        >预览</el-button
      >
      <el-button size="small" type="primary" round>保存</el-button>
    </el-button-group>
  </div>
</template>

<script>
import { defineComponent, reactive, watch } from "vue";
export default defineComponent({
  emits: ["addComponent", "clearall"],
  props: {
    componentData: {
      type: Array,
    },
  },
  setup(props, context) {
    const state = reactive({
      data: props.componentData,
    });

    watch(
      () => props.componentData,
      (value) => {
        state.data = value;
      }
    );
    const addComponent = (type) => {
      context.emit("addComponent", type);
    };

    const clearCanvas = () => {
      context.emit("clearall");
    };

    window["params"] = props.componentData;
    const review = () => {
      window.open(
        "./review/review.html",
        "_blank",
        "height=720, width=1280, top=0px, left=0px, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no"
      );
    };
    return { addComponent, clearCanvas, review };
  },
});
</script>