import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from './plugins/vuetify';
import axios from "axios";

Vue.config.productionTip = false;
/**
 *  Définir la baseURL pour des raisons :
 * Eviter de répeter le préfixe commun.
 * Simplifier l'update de l'url lorsque on va déployer l'app.
 */ 
axios.defaults.baseURL = "http://localhost:8000";
// Pour activer la connexion entre l'api et le http client il faut configurer le Cors avec
axios.defaults.withCredentials = true;


new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
