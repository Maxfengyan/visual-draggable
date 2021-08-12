import { h } from "vue";

export default {
  render() {
    return h(
      "span",
      {
        style: {
          "line-height": "34px",
          "margin-right": "15px",
          cursor: "pointer",
          "user-select": "none",
        },
      },
      h(
        "i",
        {
          class: "el-icon-back",
          onClick: returnSpecial,
        },
        "返回 |",
      ),
    );
  },
};

function returnSpecial() {
  history.back();
}
