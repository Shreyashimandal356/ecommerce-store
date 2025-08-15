<script setup>
import { RouterLink } from "vue-router";
import { useCartStore } from "../stores/cart";
import { useAuthStore } from "../stores/auth";
const cart = useCartStore();
const auth = useAuthStore();
</script>

<template>
  <div class="navbar">
    <div class="nav-inner container">
      <RouterLink to="/" class="row" style="gap:8px; font-weight:700; color:var(--text)">
        <span>🛍️</span><span>Shop</span>
      </RouterLink>
      <div class="row">
        <RouterLink to="/" class="btn secondary">Home</RouterLink>
        <RouterLink to="/cart" class="btn secondary">Cart ({{ cart.count }})</RouterLink>
        <template v-if="auth.user">
          <RouterLink to="/orders" class="btn secondary">My Orders</RouterLink>
          <RouterLink v-if="auth.isAdmin" to="/admin" class="btn">Admin</RouterLink>
          <button class="btn danger" @click="auth.logout">Logout</button>
        </template>
        <template v-else>
          <RouterLink to="/login" class="btn secondary">Login</RouterLink>
          <RouterLink to="/register" class="btn">Sign up</RouterLink>
        </template>
      </div>
    </div>
  </div>
</template>
