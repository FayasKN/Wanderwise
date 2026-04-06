# 🌍 Wanderwise

Link:https://wanderwise-kn.vercel.app/


> **Your Journey, Perfectly Planned.**  
> A premium, glassmorphic trip planning experience built with React and Vanilla CSS. Wanderwise combines advanced financial tracking, interactive visuals, and smart destination discovery to make your travel seamless.



---

## ✨ Features

- **🛡️ Crew & Budget Management**: Add your travel squad and set a shared trip budget. Track total contributions and remaining funds in real-time.
- **🧾 Smart Expense Tracking**: Log every food, stay, and transport cost. View categorized spending history and group settlements.
- **🗺️ Discovery Map**: Search any destination and instantly get **Wikipedia-powered** tourist attraction suggestions and an embedded interactive map.
- **📥 One-Click Receipt Export**: Generate a high-fidelity image (`.png`) of your trip's full balance sheet, including "who-owes-who" settlement math, directly from the dock.
- **✨ Dynamic Visuals**: 
  - Neon particle background with interactive physics and light trails.
  - Hover-activated "twinkling stars" effect inside all glass cards.
  - MacOS-style lean interaction dock for fluid navigation.
  - Golden progress loaders and smooth UI transitions.
- **💡 Travel Reminders**: A 10-point rotating carousel of smart travel checklists to keep you alert.

---

## 🚀 Tech Stack

- **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS (Custom Glassmorphism engine)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Libraries**: 
  - `html2canvas` for receipt image generation.
- **APIs**:
  - Wikipedia Search API (Tourist Discovery)
  - Google Maps Embed API

---

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/FayasKN/Wanderwise.git
cd Wanderwise
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

---

## 🛠️ Configuration

- **Color Theme**: Customizable via `:root` variables in `src/index.css`.
- **Global State**: Managed through `TripContext.jsx` with full `localStorage` persistence.

---

## 👤 Author
**FayasKN**  
*Building fluid, agentic travel experiences.*

---

*Wanderwise — Because the best trips start with the best plans.*
