<template>
  <el-form :inline="true" size="mini">
    <el-form-item label="画布大小：">
      <el-input v-model="state.canvasWidth" style="width: 60px" />
    </el-form-item>
    <el-form-item>
      <span>*</span>
    </el-form-item>
    <el-form-item label="">
      <el-input v-model="state.canvasHeight" style="width: 60px" />
    </el-form-item>
  </el-form>
</template>

<script>
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const state = reactive({
      canvasWidth: 1280,
      canvasHeight: 860,
    });
    return { state };
  },
});
</script>

<style>
</style>