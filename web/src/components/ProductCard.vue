<script setup>
import { RouterLink } from "vue-router";
import { useCartStore } from "../stores/cart";
import { formatCurrency } from "../utils/currency";
const props = defineProps({ product: Object });
const cart = useCartStore();
</script>

<template>
  <div class="card">
    <img :src="product.imageUrl" :alt="product.title" />
    <h3 style="margin:8px 0 4px 0">{{ product.title }}</h3>
    <div class="row" style="justify-content: space-between;">
      <span class="badge" v-if="product.inStock">In stock</span>
      <span>{{ formatCurrency(product.price) }}</span>
    </div>
    <div class="row" style="margin-top:12px">
      <RouterLink class="btn secondary" :to="`/product/${product.id}`">Details</RouterLink>
      <button class="btn" :disabled="!product.inStock" @click="cart.add(product)">
        Add to cart
      </button>
    </div>
  </div>
</template>
