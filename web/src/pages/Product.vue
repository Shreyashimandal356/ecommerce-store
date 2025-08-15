<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { fetchProduct } from "../api/products";
import { useCartStore } from "../stores/cart";
import { formatCurrency } from "../utils/currency";

const route = useRoute();
const product = ref(null);
const qty = ref(1);
const cart = useCartStore();

onMounted(async () => {
  product.value = await fetchProduct(route.params.id);
});
</script>

<template>
  <div class="container">
    <div v-if="!product">Loading...</div>
    <div v-else class="card" style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
      <img :src="product.imageUrl" :alt="product.title" />
      <div>
        <h1>{{ product.title }}</h1>
        <div class="badge" v-if="product.inStock">In stock</div>
        <p style="color: var(--muted); white-space: pre-wrap;">{{ product.description }}</p>
        <h2 style="margin-top:8px">{{ formatCurrency(product.price) }}</h2>
        <div class="row" style="margin-top:12px">
          <label style="margin:0">Qty</label>
          <input style="width:90px" type="number" min="1" v-model.number="qty" />
          <button class="btn" :disabled="!product.inStock" @click="cart.add(product, qty)">Add to cart</button>
        </div>
      </div>
    </div>
  </div>
</template>
