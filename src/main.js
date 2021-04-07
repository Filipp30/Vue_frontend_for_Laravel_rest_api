
// eslint-disable-next-line no-undef
require('../public/normalize.css');

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).mount("#app");
