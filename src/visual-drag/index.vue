<template>
  <div class="special">
    <!-- 顶部-按钮+全局配置 区域 -->
    <div class="special-top">
      <backbutton />
      <!-- 按钮操作区 -->
      <buttongroup
        @addComponent="createComponent"
        @clearall="state.componentData = []"
        :component-data="state.componentData"
      />
      <!-- 全局设置区 -->
      <globalsetting />
      <!-- 提示 -->
      <tipscomponent />
      <showmodel />
    </div>

    <!-- 左部-图层 区域 -->
    <leftarea
      :component-data="state.componentData"
      :active-index="state.activeIndex"
      @changeindex="handleActiveIndex"
    />
    <!-- 中部-画布 区域 -->
    <div class="special-middle">
      <!-- 网格 -->
      <gridcomponent />
      <editorcomponent
        :component-data="state.componentData"
        @activeindex="handleActiveIndex"
      />
    </div>

    <!-- 右部-属性 区域 -->
    <rightarea
      :component-data="state.componentData[state.activeIndex]"
      :component-all="state.componentData"
    />
  </div>
</template>

<script>
import { watch, reactive, defineComponent, onMounted } from "vue";
import { ElMessageBox } from "element-plus";
// import { useRoute } from "vue-router";
/* top */
import Backbutton from "./components/top/back.js";
import Buttongroup from "./components/top/ButtonGroup.vue";
import Globalsetting from "./components/top/globalSetting.vue";
import Tipscomponent from "./components/top/tips";
import Showmodel from "./components/top/showmodel.vue";

/* left */
import Leftarea from "./components/left/index.vue";

/* middle */
import Gridcomponent from "./components/middle/Grid.vue";
import Editorcomponent from "./components/middle/Editor.vue";

/* right */
import Rightarea from "./components/right/index.vue";

/* component */
import ComponentData from "./components/component.js";

export default defineComponent({
  components: {
    Buttongroup,
    Globalsetting,
    Leftarea,
    Backbutton,
    Gridcomponent,
    Tipscomponent,
    Editorcomponent,
    Rightarea,
    Showmodel,
  },
  setup(prop, context) {
    // const route = useRoute();
    /* 自由发挥 */
    console.log(
      "%cdeveloper:mafengyan",
      "color: #000;background: linear-gradient(to right,#9ED110, #50B517, #179067, #476EAF, #9f49ac, #CC42A2, #FF3BA7, #FF5800, #FF8100, #FEAC00, #FFCC00, #EDE604);font-size:20px;border-radius:15px;padding: 0 20px"
    );
    console.log(
      "%csource:https://gitee.com/Maxfengyan/visual-drag",
      "color: #000;background: linear-gradient(to right,#9ED110, #50B517, #179067, #476EAF, #9f49ac, #CC42A2, #FF3BA7, #FF5800, #FF8100, #FEAC00, #FFCC00, #EDE604);font-size:20px;border-radius:15px;padding: 0 20px"
    );
    const state = reactive({
      dialogValue: false,
      componentData: [],
      activeIndex: 0,
      confirm: false,
    });
    onMounted(() => {
      // f5刷新页面时提示一下，别把数据清没了
      /* document.onkeydown = function (e) {
        // 排除非专题路由的情况
        if (route.name !== "special-create") {
          document.onkeydown = undefined;
        } else {
          if (e.keyCode === 116) {
            if (state.componentData.length > 0) {
              // 防止无限刷f5导致确认框很多
              if (!state.confirm) {
                state.confirm = true;
                ElMessageBox.confirm(
                  "当前专题未保存，刷新页面会丢失已编辑数据，确认刷新？",
                  "警告",
                  {
                    type: "warning",
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                  },
                )
                  .then(() => {
                    state.confirm = false;
                    window.location.reload();
                  })
                  .catch(() => {
                    state.confirm = false;
                  });
              }
              return false;
            }
          }
        }
      }; */
    });
    const createComponent = (type) => {
      const newComponentItme = new ComponentData(type).judgeType();
      // newComponentItme.index = state.componentData.length + 1;
      state.componentData.push(newComponentItme);
    };
    const handleActiveIndex = (index) => {
      state.activeIndex = index;
    };
    return { state, createComponent, handleActiveIndex };
  },
});
</script>

<style lang="scss" scoped>
.special {
  height: 100%;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;

  .special-top {
    display: flex;
    height: 64px;
    box-sizing: border-box;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.17);

    form {
      padding-left: 20px;
    }
  }

  .special-middle {
    width: 1280px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    height: calc(100% - 92px);
    margin-left: 15px;
    display: inline-block;
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #409eff;
    vertical-align: top;
  }
}
</style>