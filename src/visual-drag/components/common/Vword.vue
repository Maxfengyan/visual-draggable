<template>
  <textarea
    v-if="state.editable"
    rows="1"
    v-model="propData.propValue"
    @change="handleLine"
    :style="{
      color: propElement.color,
      'font-size': propElement.fontSize + 'px',
      'font-weight': propElement.fontWeight,
    }"
  ></textarea>
  <div
    @dblclick="changeEditable"
    tabindex="1"
    @keydown.delete="deleteItem"
    @keydown.down="move('down')"
    @keydown.up="move('up')"
    @keydown.left="move('left')"
    @keydown.right="move('right')"
    v-else="!state.editable"
    :style="{
      color: propElement.color,
      'font-size': propElement.fontSize + 'px',
      'font-weight': propElement.fontWeight,
    }"
  >
    {{ propData.propValue }}
  </div>
</template>

<script>
import { reactive, watch, nextTick } from "vue";
export default {
  props: {
    /* propValue: {
      type: String,
      require: true,
    }, */
    propData: {
      type: Object,
      required: true,
    },
    propIndex: {
      type: Number,
    },
    propElement: {
      type: Object,
      required: true,
    },
  },
  emits: ["deleteitem", "move"],
  setup(props, context) {
    const state = reactive({
      editable: false,
    });
    // 失去焦点后变为div
    const handleLine = (e) => {
      state.editable = false;
    };
    const changeEditable = async (e) => {
      state.editable = true;
      await nextTick();
      document.querySelector("textarea").focus();
    };
    const deleteItem = () => {
      context.emit("deleteitem", props.propIndex);
    };
    const move = (position) => {
      context.emit("move", props.propIndex, position);
    };
    return { state, handleLine, changeEditable, deleteItem, move };
  },
};
</script>

<style scoped lang="scss">
textarea {
  background: transparent;
  border: 0;
  outline: 0;
  resize: none;
}
</style>