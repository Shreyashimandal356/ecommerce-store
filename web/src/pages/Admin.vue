<script setup>
import { ref } from "vue";
import { createProduct } from "../api/products";

const form = ref({
  title: "",
  description: "",
  price: 0,
  imageUrl: "",
  inStock: true
});

const err = ref("");
const ok = ref("");

async function submit() {
  err.value = ""; ok.value = "";
  try {
    await createProduct(form.value);
    ok.value = "Product created!";
    form.value = { title: "", description: "", price: 0, imageUrl: "", inStock: true };
  } catch (e) {
    err.value = e?.message || "Failed to create product";
  }
}
</script>

<template>
  <div class="container" style="max-width: 720px;">
    <h1>Admin: New Product</h1>
    <div class="card">
      <label>Title</label>
      <input v-model="form.title" />
      <label>Description</label>
      <textarea rows="5" v-model="form.description"></textarea>
      <label>Price</label>
      <input type="number" min="0" step="0.01" v-model.number="form.price" />
      <label>Image URL</label>
      <input v-model="form.imageUrl" />
      <label>In Stock</label>
      <select v-model="form.inStock">
        <option :value="true">Yes</option>
        <option :value="false">No</option>
      </select>
      <div class="row" style="margin-top:12px">
        <button class="btn" @click="submit">Create</button>
      </div>
      <div v-if="ok" style="color: #45d483; margin-top: 8px;">{{ ok }}</div>
      <div v-if="err" style="color: var(--danger); margin-top: 8px;">{{ err }}</div>
    </div>
  </div>
</template>
