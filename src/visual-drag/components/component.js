import image from "./image/image.png";
class ComponentData {
  constructor(type) {
    this.type = type;
  }

  judgeType() {
    let componentDataItem;
    if (this.type === 0) {
      componentDataItem = {
        label: "图片", // 左侧组件显示的值
        type: 0,
        component: "v-img",
        propValue: image,
        lockStatus: false,
        url: "",
        style: {
          width: 300,
          rotate: 0,
          height: 200,
          left: 40,
          top: 40,
          borderRadius: 5,
        },
      };
    } else if (this.type === 1) {
      componentDataItem = {
        label: "热区",
        type: 1,
        component: "v-hot",
        lockStatus: false,
        propValue: "",
        default: false,
        url: "",
        style: {
          width: 100,
          color: "#409eff",
          rotate: 0,
          height: 100,
          top: 40,
          left: 40,
          borderRadius: 5,
        },
      };
    } else {
      componentDataItem = {
        label: "文字",
        component: "v-word",
        propValue: "请输入文字",
        lockStatus: false,
        type: 2,
        style: {
          width: 200,
          height: 20,
          rotate: 0,
          left: 40,
          top: 40,
          fontSize: 18,
          fontWeight: 400,
          lineHeight: 20,
          letterSpacing: 0,
          textAlign: "left",
          color: "#000",
          backgroundColor: "",
        },
      };
    }
    return componentDataItem;
  }
}

export default ComponentData;
