# E‑commerce Store (Vue 3 + Firebase)

A small shop app with product listing, cart, checkout (order creation), and real-time product updates using **Cloud Firestore**. Auth via Firebase Email/Password. Free to run locally with the **Firebase Emulator Suite**.

## Tech
- **Frontend:** Vue 3, Vite, Vue Router, Pinia, Firebase JS SDK
- **Backend:** Firestore + Auth
- **Quality:** ESLint + Prettier + EditorConfig

## Quick Start
1. **Install tools**
   ```bash
   npm i -g firebase-tools
   ```
2. **Web app**
   ```bash
   cd web
   cp .env.example .env              # keep defaults for emulator
   npm install
   npm run dev
   ```
3. **Emulators + Seed (in project root)**
   ```bash
   cd ..
   npm install --prefix tools
   npm run emu   # starts Firestore/Auth emulators
   # In another terminal:
   npm run seed  # creates sample products + admin user (admin@example.com / Passw0rd!)
   ```

Open the dev server URL (typically `http://localhost:5173`). Log in with the admin account to see the **Admin** link and create products.

## Project Structure
- `web/` – Vue SPA
- `firestore.rules` – security rules (admin via custom claim `admin: true`)
- `firestore.indexes.json` – sample index
- `tools/seed-emulator.js` – seeds emulator with products & admin user

## Admin
- The seeder sets `admin@example.com` as admin (`Passw0rd!`).
