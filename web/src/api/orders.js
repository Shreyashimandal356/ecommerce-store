import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export async function placeOrder(cartItems) {
  const auth = getAuth();
  if (!auth.currentUser) throw new Error("Not signed in");
  const items = cartItems.map((i) => ({ productId: i.id, title: i.title, price: i.price, qty: i.qty }));
  const subtotal = items.reduce((a, b) => a + b.price * b.qty, 0);
  const payload = {
    userId: auth.currentUser.uid,
    items,
    subtotal,
    status: "placed",
    createdAt: serverTimestamp()
  };
  const ref = await addDoc(collection(db, "orders"), payload);
  return ref.id;
}

export function listenToMyOrders(cb) {
  const auth = getAuth();
  if (!auth.currentUser) return () => {};
  const q = query(
    collection(db, "orders"),
    where("userId", "==", auth.currentUser.uid),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, (snap) => {
    const orders = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    cb(orders);
  });
}
