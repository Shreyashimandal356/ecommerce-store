import { db } from "../firebase";
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, addDoc, serverTimestamp } from "firebase/firestore";

const col = collection(db, "products");

export function listenToProducts(cb) {
  const q = query(col, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    cb(items);
  });
}

export async function fetchProduct(id) {
  const ref = doc(db, "products", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

export async function createProduct(data) {
  // Admin-only (enforced by rules)
  const payload = { ...data, price: Number(data.price), createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
  const ref = await addDoc(col, payload);
  return ref.id;
}
