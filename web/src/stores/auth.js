import { defineStore } from "pinia";
import { auth } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    claims: {},
    ready: null // Promise resolved when initial auth check completes
  }),
  getters: {
    isAdmin: (s) => s.claims?.admin === true
  },
  actions: {
    async init() {
      this.ready = new Promise((resolve) => {
        onAuthStateChanged(auth, async (u) => {
          this.user = u;
          if (u) {
            const token = await u.getIdTokenResult(true);
            this.claims = token.claims || {};
          } else {
            this.claims = {};
          }
          resolve();
        });
      });
      return this.ready;
    },
    async login(email, password) {
      await signInWithEmailAndPassword(auth, email, password);
      const token = await auth.currentUser.getIdTokenResult(true);
      this.claims = token.claims || {};
    },
    async register(email, password) {
      await createUserWithEmailAndPassword(auth, email, password);
      const token = await auth.currentUser.getIdTokenResult(true);
      this.claims = token.claims || {};
    },
    async logout() {
      await signOut(auth);
      this.user = null;
      this.claims = {};
    }
  }
});

// Initialize immediately when imported
const store = useAuthStore();
store.init();
