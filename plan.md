# Project Blueprint: Kangan Liangyou (康安粮油)

This document serves as a comprehensive technical specification for the Kangan Liangyou e-commerce platform. It provides all necessary details for an AI agent to recreate the website from scratch.

## 1. Project Overview
- **Name:** Kangan Liangyou (康安粮油)
- **Concept:** A premium, health-focused online grocery store specializing in high-quality rice, flour, and edible oils.
- **Core Functionality:** A Landing Page for brand positioning and an Online Ordering system with a dynamic catalog and shopping cart.

## 2. Technical Stack
- **Frontend:** Vanilla HTML5, Vanilla CSS3 (Custom Design System), Vanilla JavaScript (ES6+).
- **Data:** JSON-based product database (`products.json`).
- **Logic Handling:** Asynchronous data fetching, DOM manipulation, shopping cart management.
- **Environment:** Requires a local HTTP server for Fetch API functionality (e.g., Python `http.server`).

## 3. Design System (Aesthetics)
- **Style:** Glassmorphism and Modern Minimalist.
- **Typography:** 'Outfit' (Google Fonts) with fallback to sans-serif.
- **Color Palette:**
    - `Primary (Organic Green)`: `hsl(142, 60%, 45%)`
    - `Secondary (Sunny Orange)`: `hsl(38, 95%, 55%)`
    - `Background`: `#fdfbf7` (Creamy White)
    - `Text`: `#2d3436` (Charcoal)
- **Key UI Elements:**
    - Frosted glass effect (`backdrop-filter: blur(12px)`) for cards and overlays.
    - Large typography with generous letter spacing.
    - Soft shadows and smooth cubic-bezier transitions (`0.16, 1, 0.3, 1`).

## 4. Site Structure

### Page 1: Home/Landing (`index.html`)
- **Navigation:** Floating sticky navbar with Glassmorphism.
- **Hero Section:** High-impact headline: "健康生活，从优质粮油开始" (Healthy life starts from quality oil and grain). Prominent "Online Order" CTA.
- **Feature Grid:** Three-column grid highlighting "Premium Sourcing", "100% Organic", and "Express Delivery".
- **About Section:** Narrative section with high-quality imagery reflecting brand heritage.
- **Popular Products:** Preview cards showcasing top-selling items.
- **Contact Form:** Integrated glass-styled message form.

### Page 2: Ordering System (`booking.html`)
- **Header:** Simplified page title and context.
- **Category Filter:** Dynamic tag-based filtering (e.g., All, Rice, Flour, Oil).
- **Catalog:** 
    - Full-width product cards containing: Image, Category/Tags, Name, Description, Stock Status, Price, and "Add to Cart" button.
- **Shopping Cart System:**
    - **Floating Toggle:** Sticky button showing item count.
    - **Drawer Interface:** Slide-in panel displaying selected items, quantities, subtotal, and checkout action.
    - **Logic:** Handles item addition, quantity increments (if in stock), item removal, and total price calculation.

## 5. Data Schema (`products.json`)
The application relies on a JSON array of objects with the following structure:
```json
{
    "id": 1,
    "name": "特级茉莉香米",
    "category": "大米",
    "tags": ["米"],
    "price": 32.50,
    "stock": 50,
    "image": "https://images.unsplash.com/...",
    "description": "高品质长粒茉莉香米..."
}
```

## 6. Implementation Logic
1. **Data Initialization:** On `DOMContentLoaded`, fetch `products.json` and store globally.
2. **Rendering:** Cycle through the data array to create HTML elements dynamically for the catalog.
3. **Filtering:** Re-render the catalog whenever a filter button is clicked, matching product `tags`.
4. **Checkout:** Simulate checkout with a toast notification and clear the cart state.
5. **Animation:** Use `IntersectionObserver` to trigger fade-in/up animations (`.reveal`) as elements enter the viewport.

## 7. Key Assets & Links
- **Icons:** Emoji-based or simple SVGs.
- **Images:** High-resolution photography from Unsplash (food, grains, oils).
- **Fonts:** `https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap`