import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Users from "../views/Users.vue";
import Maquina from "../views/maquina.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/users", name: "users", component: Users },
  { path: "/maquina", name: "maquina", component: Maquina }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

