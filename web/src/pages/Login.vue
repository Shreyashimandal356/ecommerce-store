<script setup>
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useAuthStore } from "../stores/auth";

const email = ref("");
const password = ref("");
const err = ref("");
const loading = ref(false);
const auth = useAuthStore();
const router = useRouter();

async function submit() {
  try {
    loading.value = true;
    err.value = "";
    await auth.login(email.value, password.value);
    router.push("/");
  } catch (e) {
    err.value = e?.message || "Login failed";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="container" style="max-width: 520px;">
    <div class="card">
      <h2>Login</h2>
      <label>Email</label>
      <input v-model="email" />
      <label>Password</label>
      <input type="password" v-model="password" />
      <div class="row" style="margin-top:12px">
        <button class="btn" :disabled="loading" @click="submit">Login</button>
        <RouterLink to="/register" class="btn secondary">Create account</RouterLink>
      </div>
      <div v-if="err" style="color: var(--danger); margin-top: 8px;">{{ err }}</div>
    </div>
  </div>
</template>
