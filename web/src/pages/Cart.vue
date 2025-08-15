<script setup>
import { useCartStore } from "../stores/cart";
import { RouterLink } from "vue-router";
import { formatCurrency } from "../utils/currency";
const cart = useCartStore();
</script>

<template>
  <div class="container">
    <h1>Your Cart</h1>
    <div v-if="cart.items.length === 0" class="card">Your cart is empty.</div>
    <div v-else class="card">
      <div v-for="i in cart.items" :key="i.id" class="row" style="justify-content: space-between;">
        <div class="row" style="gap:10px">
          <img :src="i.imageUrl" style="width:64px; height:64px; object-fit: cover;" />
          <div>
            <div>{{ i.title }}</div>
            <div class="muted">{{ formatCurrency(i.price) }}</div>
          </div>
        </div>
        <div class="row">
          <input type="number" min="1" style="width:90px" v-model.number="i.qty" @change="cart.setQty(i.id, i.qty)" />
          <button class="btn danger" @click="cart.remove(i.id)">Remove</button>
        </div>
      </div>
      <hr />
      <div class="row" style="justify-content: space-between;">
        <strong>Subtotal</strong>
        <strong>{{ formatCurrency(cart.subtotal) }}</strong>
      </div>
      <div style="margin-top:12px" class="row" >
        <RouterLink to="/checkout" class="btn" v-if="cart.items.length">Checkout</RouterLink>
        <button class="btn secondary" @click="cart.clear()">Clear cart</button>
      </div>
    </div>
  </div>
</template>
