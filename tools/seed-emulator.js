// Seed Firestore & Auth emulators with demo data and an admin user
import admin from "firebase-admin";

const projectId = "demo-ecommerce";
process.env.FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST || "127.0.0.1:8080";
process.env.FIREBASE_AUTH_EMULATOR_HOST = process.env.FIREBASE_AUTH_EMULATOR_HOST || "127.0.0.1:9099";

if (admin.apps.length === 0) {
  admin.initializeApp({ projectId });
}

const db = admin.firestore();
const auth = admin.auth();

async function ensureAdminUser() {
  const email = "admin@example.com";
  const password = "Passw0rd!";
  let user;
  try {
    user = await auth.getUserByEmail(email);
  } catch {
    user = await auth.createUser({ email, password, emailVerified: true, displayName: "Admin" });
  }
  await auth.setCustomUserClaims(user.uid, { admin: true });
  console.log("Admin user ready:", email);
  return user;
}

async function seedProducts() {
  const products = [
    {
      title: "Vintage Backpack",
      description: "Sturdy canvas backpack for everyday carry.",
      price: 79.99,
      imageUrl: "https://picsum.photos/seed/backpack/800/600",
      inStock: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    },
    {
      title: "Wireless Headphones",
      description: "Over-ear, noise-isolating, 30h battery life.",
      price: 129.0,
      imageUrl: "https://picsum.photos/seed/headphones/800/600",
      inStock: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    },
    {
      title: "Ceramic Mug",
      description: "12oz hand-glazed mug.",
      price: 18.5,
      imageUrl: "https://picsum.photos/seed/mug/800/600",
      inStock: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  ];
  const batch = db.batch();
  products.forEach((p) => {
    const ref = db.collection("products").doc();
    batch.set(ref, p);
  });
  await batch.commit();
  console.log("Seeded products:", products.length);
}

(async () => {
  await ensureAdminUser();
  await seedProducts();
  console.log("Done seeding emulator.");
  process.exit(0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
