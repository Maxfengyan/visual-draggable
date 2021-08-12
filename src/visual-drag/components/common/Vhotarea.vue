<template>
  <div
    class="hotarea"
    :style="{
      'border-radius': borderRadius + 'px',
      'border-color': propDefault ? '#67C23A' : propColor,
    }"
    tabindex="1"
    @keydown.delete="deleteItem"
    @keydown.down="move('down')"
    @keydown.up="move('up')"
    @keydown.left="move('left')"
    @keydown.right="move('right')"
  ></div>
</template>

<script>
export default {
  props: {
    borderRadius: {
      type: Number,
      require: true,
    },
    propColor: {
      type: String,
      require: true,
    },
    propIndex: {
      type: Number,
      require: true,
    },
    propDefault: {
      type: Boolean,
      require: true,
    },
  },
  emits: ["deleteitem", "move"],
  setup(props, context) {
    const deleteItem = () => {
      context.emit("deleteitem", props.propIndex);
    };

    const move = (position) => {
      context.emit("move", props.propIndex, position);
    };
    return { deleteItem, move };
  },
};
</script>

<style scoped>
.hotarea {
  width: 100%;
  height: 100%;
  border: 2px dashed #409eff;
}
</style>