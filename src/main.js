import { createApp } from "vue";
import App from "./App.vue";
import useElementUi from "./elementui";
import "element-plus/packages/theme-chalk/src/base.scss";
const app = createApp(App);
useElementUi(app); // 引用element-ui
app.mount("#app");
