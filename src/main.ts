import { createApp } from "vue";
import './assets/main.css'

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
import pinia from "./stores/index";

app.use(pinia);
app.use(router);

app.mount("#app");
