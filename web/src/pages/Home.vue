<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { listenToProducts } from "../api/products";
import ProductCard from "../components/ProductCard.vue";

const products = ref([]);
let unsub = null;
onMounted(() => {
  unsub = listenToProducts((items) => { products.value = items; });
});
onUnmounted(() => unsub && unsub());
</script>

<template>
  <div class="container">
    <h1>Latest Products</h1>
    <div class="grid">
      <ProductCard v-for="p in products" :key="p.id" :product="p" />
    </div>
  </div>
</template>
