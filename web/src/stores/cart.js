import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: JSON.parse(localStorage.getItem("cart.items") || "[]") // [{id, title, price, imageUrl, qty}]
  }),
  getters: {
    count: (s) => s.items.reduce((a, b) => a + b.qty, 0),
    subtotal: (s) => s.items.reduce((a, b) => a + b.price * b.qty, 0)
  },
  actions: {
    persist() { localStorage.setItem("cart.items", JSON.stringify(this.items)); },
    add(product, qty = 1) {
      const existing = this.items.find((i) => i.id === product.id);
      if (existing) existing.qty += qty;
      else this.items.push({ id: product.id, title: product.title, price: product.price, imageUrl: product.imageUrl, qty });
      this.persist();
    },
    setQty(id, qty) {
      const item = this.items.find((i) => i.id === id);
      if (!item) return;
      item.qty = Math.max(1, qty);
      this.persist();
    },
    remove(id) {
      this.items = this.items.filter((i) => i.id !== id);
      this.persist();
    },
    clear() { this.items = []; this.persist(); }
  }
});
