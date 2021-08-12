<template>
  <div
    style="overflow: hidden"
    :style="{ 'border-radius': borderRadius + 'px' }"
  >
    <img
      :src="propValue"
      tabindex="1"
      @keydown.delete="deleteItem"
      @keydown.down="move('down')"
      @keydown.up="move('up')"
      @keydown.left="move('left')"
      @keydown.right="move('right')"
    />
  </div>
</template>

<script>
export default {
  props: {
    propValue: {
      type: String,
      require: true,
    },
    element: {
      type: Object,
    },
    propIndex: {
      type: Number,
    },
    borderRadius: {
      type: Number,
      required: true,
      default: 0,
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
img {
  width: 100%;
  height: 100%;
  outline: none;
}
</style>