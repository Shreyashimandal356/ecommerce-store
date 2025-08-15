<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { listenToMyOrders } from "../api/orders";
import { formatCurrency } from "../utils/currency";

const orders = ref([]);
let unsub = null;

onMounted(() => {
  unsub = listenToMyOrders((list) => { orders.value = list; });
});

onUnmounted(() => unsub && unsub());
</script>

<template>
  <div class="container">
    <h1>My Orders</h1>
    <div v-if="orders.length === 0" class="card">No orders yet.</div>
    <div v-else class="grid">
      <div v-for="o in orders" :key="o.id" class="card">
        <div class="row" style="justify-content: space-between;">
          <strong>Order #{{ o.id }}</strong>
          <span class="badge">{{ o.status }}</span>
        </div>
        <ul>
          <li v-for="i in o.items" :key="i.productId">{{ i.title }} × {{ i.qty }} — {{ formatCurrency(i.price * i.qty) }}</li>
        </ul>
        <div class="row" style="justify-content: space-between;">
          <span class="muted">{{ new Date(o.createdAt?.seconds ? o.createdAt.seconds * 1000 : Date.now()).toLocaleString() }}</span>
          <strong>{{ formatCurrency(o.subtotal) }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>
