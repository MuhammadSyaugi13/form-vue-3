import { createApp } from "vue";
import App from "./App.vue";
import AppTest from "./AppTest.vue";
import "./index.css";
import AppAlert from "./components/AppAlert.vue";
import BaseInput from "./components/form/BaseInput.vue";
import BaseSelect from "./components/form/BaseSelect.vue";
import Datavue from "./components/datavue/Datavue.vue";

const app = createApp(AppTest);
app.component("datavue", Datavue);
app.component("app-alert", AppAlert);
app.component("base-input", BaseInput);
app.component("base-select", BaseSelect);
app.mount("#app");
