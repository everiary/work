import { createApp } from "vue";
import "./assets/main.css";
import 'amfe-flexible'

import App from "./App.vue";
import router from "./router";

/*const _isMobile = () => {
  const flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return flag;
};*/

/*const app = createApp(_isMobile() ? App_m : App);*/

const app = createApp(App)
import pinia from "./stores/index";

app.use(pinia);
app.use(router);

app.mount("#app");
