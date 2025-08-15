import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Product from "../pages/Product.vue";
import Cart from "../pages/Cart.vue";
import Checkout from "../pages/Checkout.vue";
import Orders from "../pages/Orders.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Admin from "../pages/Admin.vue";
import NotFound from "../pages/NotFound.vue";
import { useAuthStore } from "../stores/auth";

const routes = [
  { path: "/", component: Home },
  { path: "/product/:id", component: Product, props: true },
  { path: "/cart", component: Cart },
  { path: "/checkout", component: Checkout, meta: { requiresAuth: true } },
  { path: "/orders", component: Orders, meta: { requiresAuth: true } },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/admin", component: Admin, meta: { requiresAdmin: true } },
  { path: "/:pathMatch(.*)*", component: NotFound }
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach(async (to, _from, next) => {
  const auth = useAuthStore();
  // ensure auth state is initialized
  await auth.ready;
  if (to.meta.requiresAuth && !auth.user) return next("/login");
  if (to.meta.requiresAdmin && !auth.isAdmin) return next("/");
  next();
});

export default router;
