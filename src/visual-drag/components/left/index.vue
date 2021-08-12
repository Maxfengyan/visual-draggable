<template>
  <div
    class="special-left"
    @drop="handleDrop"
    @dragend="handleDragEnd"
    @dragstart="handleDragStart"
    @dragover="handleDragOver"
  >
    <el-scrollbar height="100%">
      <!-- @click="positionItem(index, $event)" -->
      <div
        draggable="true"
        class="special-left-item"
        v-for="(item, index) in data"
        :data-index="index"
      >
        <div
          class="special-left-item-mark"
          title="序号越大，显示层级优先级越高"
          :class="{
            activeMark: activeIndex === index,
          }"
        ></div>
        <div
          class="special-left-item-index"
          title="序号越大，显示层级优先级越高"
        >
          {{ index + 1 }}
        </div>
        <div class="special-left-item-content">
          <i v-if="item.type == 0" class="el-icon-picture"></i>
          <i v-else-if="item.type == 1" class="el-icon-full-screen"></i>
          <iconText v-else />
          <span>{{ item.label }}</span>
        </div>
        <div class="special-left-item-button">
          <i
            v-show="!item.lockStatus"
            class="el-icon-unlock"
            title="锁定"
            @click="item.lockStatus = true"
          />
          <i
            v-show="item.lockStatus"
            class="el-icon-lock"
            title="解锁"
            style="color: red"
            @click="item.lockStatus = false"
          />
          <i
            class="el-icon-bottom"
            @click="moveItem('down', index)"
            title="向下移动"
          />
          <i
            class="el-icon-top"
            @click="moveItem('up', index)"
            title="向上移动"
          />
          <i class="el-icon-delete" title="删除" @click="deleteItem(index)" />
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import IconText from "../icon/text.vue";
import { watch, ref, defineComponent } from "vue";
import { ElMessageBox } from "element-plus";
export default defineComponent({
  props: {
    componentData: {
      type: Array,
      required: true,
    },
    activeIndex: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  components: {
    IconText,
  },
  emits: ["changeindex"],
  setup(props, context) {
    const data = ref([]);
    const domList = ref();
    watch(
      () => props.componentData,
      (value) => {
        data.value = value;
      },
      {
        deep: true,
      }
    );

    const handleDragStart = (e) => {
      var lockStatus = props.componentData[e.target.dataset.index].lockStatus;
      if (lockStatus) {
        ElMessageBox.alert("组件已锁定", {
          type: "error",
        });
        return false;
      }
      domList.value = Array.from(
        document.querySelectorAll(".special-left-item")
      );
      e.target.style.opacity = 0.4;
      e.dataTransfer.setData("index", e.target.dataset.index);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      let target;
      // 找出覆盖dom
      for (let i = 0; i < domList.value.length; i++) {
        let item = domList.value[i];
        if (item.contains(e.target)) {
          target = item;
          break;
        }
      }

      const index = parseInt(e.dataTransfer.getData("index"));
      if (target) {
        // console.log(target.getBoundingClientRect().top);
        let moveIndex;
        const topDistance = e.target.getBoundingClientRect().top + "";
        for (let i = 0; i < domList.value.length; i++) {
          let item = domList.value[i];
          if (item.getBoundingClientRect().top < topDistance) {
            moveIndex = i;
          }
        }
        let movedItem = data.value.splice(index, 1);
        data.value.splice(moveIndex, 0, movedItem[0]);
      } else {
        // 排除viewclass
        if (e.target.className.includes("el-scrollbar__wrap")) {
          let movedItem = data.value.splice(index, 1);
          data.value.splice(data.value.length, 0, movedItem[0]);
        }
      }
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    };

    //还原透明值
    const handleDragEnd = (e) => {
      e.target.style.opacity = 1;
    };

    // 删除
    const deleteItem = (index) => {
      if (data.value[index].lockStatus) {
        ElMessageBox.alert("组件已锁定", {
          type: "error",
        });
        return false;
      }
      data.value.splice(index, 1);
    };

    // 移动
    const moveItem = (position, index) => {
      if (data.value[index].lockStatus) {
        ElMessageBox.alert("组件已锁定", {
          type: "error",
        });
        return false;
      }
      if (position === "up") {
        if (index > 0) {
          const result = data.value[index];
          data.value[index] = data.value[index - 1];
          data.value[index - 1] = result;
        }
      } else {
        if (index < data.value.length - 1) {
          const result = data.value[index];
          data.value[index] = data.value[index + 1];
          data.value[index + 1] = result;
        }
      }
    };
    const positionItem = (index, event) => {
      event.preventDefault();
      context.emit("changeindex", index);
    };
    return {
      data,
      handleDragStart,
      handleDrop,
      handleDragOver,
      handleDragEnd,
      deleteItem,
      moveItem,
      positionItem,
    };
  },
});
</script>

<style lang="scss" scoped>
.special-left {
  overflow: hidden;
  box-sizing: border-box;
  width: 200px;
  border-radius: 5px;
  height: calc(100% - 92px);
  margin-left: 15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  display: inline-block;
  vertical-align: top;

  .special-left-item {
    position: relative;
    width: 100%;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.17);
    height: 101px;
    margin-bottom: 15px;
    border-top: 1px solid #ddd;
    cursor: pointer;
    overflow: hidden;

    .special-left-item-mark {
      width: 0px;
      height: 0px;
      position: absolute;
      right: -4px;
      top: -17px;
      border-top: 27px solid transparent;
      border-left: 27px solid #409eff;
      border-bottom: 27px solid transparent;
      transform: rotate(-45deg);
      // border-radius: 50%;
    }

    .special-left-item-index {
      position: absolute;
      right: 5px;
      top: 5px;
      font-size: 13px;
      color: #fff;
      user-select: none;
    }

    .special-left-item-content {
      box-sizing: border-box;
      display: flex;
      padding: 5px;
      border-bottom: 1px solid #ddd;
      height: 58px;

      i {
        font-size: 50px;
        color: #409eff;
        margin-right: 10px;
      }

      svg {
        font-size: 40px !important;
        margin-left: 5px;
      }

      span {
        font-size: 14px;
        line-height: 60px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        user-select: none;
      }
    }

    .special-left-item-button {
      overflow: hidden;
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      height: 43px;

      i,
      svg {
        padding: 7px;
        box-sizing: content-box;
        font-size: 19px;
        border-radius: 50%;
        display: block;
        color: #409eff;
      }

      i:hover,
      svg:hover {
        color: #fff;
        transition: all 0.5s ease-in;
        background: #409eff;
      }
    }
  }
}

.activeMark {
  border-left: 27px solid #67c23a !important;
}
</style>