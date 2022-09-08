import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import StartView from "../views/StartView.vue";
import DashboardView from "../views/DashboardView.vue";
import HomeView from "../views/HomeView.vue";
import ServicesListView from "../views/ServicesListView.vue";
import CategoriesListView from "../views/CategoriesListView.vue";
import AboutView from "../views/AboutView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "start",
    component: StartView
  },
  {
    path: "/dashboard",
    component: DashboardView,
    children: [
      {
        path: "/",
        name: "home",
        component: HomeView
      },
      {
        path: "services",
        name: "services-list",
        component: ServicesListView
      },
      {
        path: "categories",
        name: "categories-list",
        component: CategoriesListView
      },
      {
        path: "about",
        name: "about",
        component: AboutView
      },
    ],
    // On protège la route /dashboard si l'authentification n'est pas effectuée
    beforeEnter: (to, from, next) => {
      if(!store.getters.authenticated) {
        console.log('sir tl3b');
        // le redirige vers la page start de login
        return next({name: 'start'});
      }
      // le laisse passer
      next();
    }
  },  
];

const router = new VueRouter({
  routes,
});

export default router;
