# 🌾 Voxel Empire RPG: Documentation & Overview

Welcome to the **Voxel Empire RPG** documentation. This project is a world-class, responsive, pixel-art landing and gamified waitlist experience designed to drive community growth for a cozy farming adventure.

## 🎨 Visual Identity & UI/UX Design

The application uses a **Pixel-Perfect Aesthetic** achieved through specific CSS techniques and custom Tailwind configurations:

*   **Pixel Rendering**: `image-rendering: pixelated` is used on critical sprites to ensure sharp, non-blurry edges even when scaled.
*   **Custom Color Palette**:
    *   `Primary (#e67e51)`: Village Roof Orange.
    *   `Field Green (#6db14b)`: Grass textures.
    *   `Warm (#ffedcc)`: Aged parchment background.
    *   `Pixel Dark (#1c190d)`: Deep night-mode contrast.
*   **Dynamic Borders**: A custom `pixel-border` utility simulates the "chunky" outlines characteristic of 8-bit and 16-bit games.

---

## 🗺️ Website "Corners" (Views & Components)

The site is architected as a **Single Page Application (SPA)** with a state-driven view controller.

### 1. The Village Square (Landing View)
The point of entry. It features:
*   **Parallax Backgrounds**: A scrolling layer that gives the world depth.
*   **Empire Guide**: An interactive "Guide Scroll" modal (`GuideScroll.tsx`) that tells the story of the valley.
*   **Social Proof**: Counters for global farmers and rating metrics.

### 2. The Elder's Gate (Game Intro)
A dialogue-driven experience where **Elder Oak** (a pixel character) introduces the player to the mechanics. It uses a sequenced dialogue array to build immersion.

### 3. The Seed Repository (Seed Selection)
A critical "Step 2" where players choose their starting crop:
*   **Turnip**: Fast & Hardy.
*   **Strawberry**: High Market Value.
*   **Pumpkin**: High Risk/Reward.

### 4. The Farmer's Ledger (Waitlist View)
The gamification engine. Users complete tasks to earn **Harvest Weight (Points)**:
*   **X Integration**: Follow and Retweet tasks.
*   **Click-to-Tweet**: A dynamic task that generates a referral tweet with one click.
*   **Wallet Integration**: Validates ETH addresses (0x...) in real-time.

### 5. The Imperial Hall (Success View)
A post-registration hub optimized for mobile and desktop using a **Tabbed Interface**:
*   **Invite & Progress Tab**: Shows the player's randomized **Farmer ID** (high-entropy alphanumeric) and current rank (e.g., *Silver Harvester*).
*   **Leaderboard Tab**: A competitive ranking of the top "Imperial Farmers."
*   **Countdown Timer**: A sense of urgency for the weekly snapshot resets.

---

## 🤖 AI Integration (The Sage)

Powered by **Google Gemini 1.5 Flash**, the `GeminiAssistant.tsx` component serves as a virtual guide:
*   **Empire Tips**: Generates creative farming strategies or character ideas.
*   **Structured Output**: Uses `responseSchema` to ensure the AI always returns JSON with a title and content, preventing UI breakage.

---

## 🛠️ Technical Highlights

| Feature | Implementation |
| :--- | :--- |
| **Framework** | React 19 + TypeScript |
| **Styling** | Tailwind CSS v3 with Custom Pixel Plugins |
| **Responsiveness** | Mobile-first with `max-w` containers and flexible grid layouts |
| **AI SDK** | `@google/genai` with `process.env.API_KEY` |
| **Assets** | Custom sprite sheets for the `PixelCharacter` animation component |
| **Animations** | CSS `@keyframes` for "walking" sprites and tab transitions |

---

## 🚀 Future Roadmap
*   **Empire Hub**: A community space for global trade.
*   **NFT Minting**: Automated distribution of the "Golden Hoe" to Early-Bird farmers.
*   **Live API**: Real-time voice interaction with the Farm Guide using Gemini Live.

---
*Created by the Voxel Empire Engineering Team*