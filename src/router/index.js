import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/examples",
      name: "examples",
      component: () => import("../views/ExamplesView.vue"),
    },
    {
      path: "/donate",
      name: "donate",
      component: () => import("../views/DonateView.vue"),
    },
    {
      path: "/shoutout",
      name: "shoutout",
      component: () => import("../views/ShoutoutView.vue"),
    },
  ],
});

export default router;
