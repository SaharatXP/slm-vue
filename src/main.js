import { createApp } from "vue";
import App from "./App.vue";
import "daisyui/dist/full.css";
import axios from "axios";
import Home from "./views/Home.vue";
import "../src/assets/style.css";
import { createRouter, createWebHistory } from "vue-router";
import { LoadingPlugin } from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import VueGoogleMaps from "@fawmi/vue-google-maps";
axios.defaults.baseURL = "https://prodslm.devshr.com/";
// axios.defaults.baseURL = "http://127.0.0.1:8000/";

//
const app = createApp(App);

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
    path: "/slmSales",
    component: () => import("./views/slmSales.vue"),
  },
  {
    path: "/vehicle/:vehicle_id",
    component: () => import("./views/detailCar.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app
  .use(VueGoogleMaps, {
    load: {
      key: "AIzaSyD-GFIpwykj1JotEvvjyjF3R-JykoTFzxw",
    },
  })
  .use(router)
  .use(LoadingPlugin)

  .mount("#app");
