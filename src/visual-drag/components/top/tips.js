import { h } from "vue";
export default {
  render() {
    return h(
      "span",
      {
        style: {
          "line-height": "34px",
          "margin-left": "15px",
          color: "#409eff",
          "font-size": "12px",
        },
      },
      h(
        "i",
        {
          class: "el-icon-bell",
        },
        " 蓝色边框区域内尺寸为1280*720",
      ),
    );
  },
};
