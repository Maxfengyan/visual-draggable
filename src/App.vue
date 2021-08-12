<template>
  <canvastools />
</template>

<script setup>
import canvastools from "./visual-drag/index.vue";
</script>

<style>
body,
html {
  height: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
