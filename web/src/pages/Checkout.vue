<script setup>
import { useCartStore } from "../stores/cart";
import { useRouter } from "vue-router";
import { placeOrder } from "../api/orders";
import { ref } from "vue";
import { formatCurrency } from "../utils/currency";

const router = useRouter();
const cart = useCartStore();
const loading = ref(false);
const err = ref("");

async function submit() {
  err.value = "";
  try {
    loading.value = true;
    const orderId = await placeOrder(cart.items);
    cart.clear();
    router.push(`/orders`);
  } catch (e) {
    err.value = e?.message || "Checkout failed";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="container">
    <h1>Checkout</h1>
    <div class="card">
      <h3>Order Summary</h3>
      <div v-for="i in cart.items" :key="i.id" class="row" style="justify-content: space-between;">
        <span>{{ i.title }} × {{ i.qty }}</span>
        <span>{{ formatCurrency(i.price * i.qty) }}</span>
      </div>
      <hr />
      <div class="row" style="justify-content: space-between;">
        <strong>Subtotal</strong>
        <strong>{{ formatCurrency(cart.subtotal) }}</strong>
      </div>
      <p class="muted">This demo places an order in Firestore (no payment processing).</p>
      <div class="row" style="margin-top:12px">
        <button class="btn" :disabled="loading || !cart.items.length" @click="submit">Place order</button>
      </div>
      <div v-if="err" style="color: var(--danger); margin-top: 8px;">{{ err }}</div>
    </div>
  </div>
</template>
