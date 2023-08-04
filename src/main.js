import { createApp } from "vue";
import App from "./App.vue";
import "daisyui/dist/full.css";
import axios from "axios";
import Home from "./views/Home.vue";
import "../src/assets/style.css";
import { createRouter, createWebHistory } from "vue-router";
import { LoadingPlugin } from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
axios.defaults.baseURL = "https://prodslm.devshr.com/";
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);
const routes = [
  {
    path: "/",
    component: Home,
  },

  {
    path: "/search",
    component: () => import("./views/searchCar.vue"),
  },
  {
    path: "/promotions",
    component: () => import("./views/Promotion.vue"),
  },

  {
    path: "/vehicle/:vehicle_id",
    component: () => import("./views/detailCar.vue"),
  },
];
createApp(App).use(LoadingPlugin);
const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
