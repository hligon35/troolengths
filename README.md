# Troo Lengths - E-commerce Hair Extension Store

A modern, responsive e-commerce website built with React, TypeScript, and Tailwind CSS, designed to mimic the layout and functionality of Nadula.com with custom branding and color scheme.

## 🌟 Features

### ✅ Completed Core Features
- **Sticky Header** with logo, navigation (Wigs, Bundles, Closures, Sale), and cart icon
- **Hero Banner** with rotating promotions, headlines, and CTAs
- **Category Grid** with image tiles for different product categories
- **Product Listing Pages** with filters (length, texture, color, price)
- **Shopping Cart Drawer** that slides in from the right
- **Mobile-First Design** with collapsible navigation and responsive layout
- **Trust Signals** prominently displayed (100% human hair, free shipping, 30-day returns)
- **Floating Promo Button** for mobile engagement
- **Custom Color Palette** with lavender, powder blue, and accent colors

### 🎨 Design System

#### Color Palette
- **Primary (Lavender)**: `#B57EDC` - Used for headers, CTAs, and hero backgrounds
- **Secondary (Powder Blue)**: `#B0E0E6` - Used for navigation highlights and secondary buttons
- **Accent Colors** for warmth and purchase encouragement:
  - **Warm Peach**: `#FFB07C` - Sale tags and discount highlights
  - **Soft Coral**: `#FF6F61` - Hover states and promotional CTAs
  - **Golden Honey**: `#FFC857` - Trust badges and upsell prompts

#### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser

### Installation
1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd troolengths
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and visit `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## 📱 Responsive Design

The application is built mobile-first with breakpoints for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

Key mobile features:
- Collapsible hamburger navigation
- Sticky cart icon with item count
- Floating promotional button
- Touch-optimized product browsing
- Responsive grid layouts

## 🛒 E-commerce Features

### Shopping Cart
- Persistent cart using Zustand state management
- Add/remove items with quantity controls
- Real-time price calculations
- Cart drawer with upsell suggestions
- Free shipping threshold notifications

### Product Management
- Category-based product filtering
- Multiple product variants (length, texture, color, density)
- Sale price handling with discount displays
- Stock status tracking
- Customer reviews and ratings

### Trust & Conversion Optimization
- Prominent trust badges
- Free shipping banners
- Limited-time offer displays
- Customer review integration
- Mobile engagement features

## 🎯 Conversion-Optimized UX

### Emotional Branding
- **Lavender + Powder Blue**: Creates calm trust and reliability
- **Peach/Coral/Honey Accents**: Adds warmth and purchase urgency
- **Consistent Visual Hierarchy**: Guides users toward key actions

### Trust Signals
- 100% Human Hair guarantees
- Free shipping thresholds
- 30-day return policy
- Customer reviews with photos
- SSL security badges

## 🔧 Customization

### Adding New Products
Edit `src/data/mockData.ts` to add new products with:
- Product information (name, description, price)
- Multiple variants (length, texture, color options)
- Image galleries
- Category assignments

### Modifying Colors
Update colors in `tailwind.config.js` under the `extend.colors` section:
```javascript
colors: {
  primary: {
    500: '#B57EDC', // Your primary lavender
    // ... other shades
  },
  accent: {
    peach: '#FFB07C',
    coral: '#FF6F61',
    honey: '#FFC857',
  }
}
```

### Adding New Pages
1. Create new page components in `src/pages/`
2. Add routes in `src/App.tsx`
3. Update navigation links in `src/components/Header.tsx`

## 📁 Project Structure

```
src/
├── components/                 # Reusable UI components
│   ├── Header.tsx             # Main navigation header
│   ├── Footer.tsx             # Site footer with links
│   ├── CartDrawer.tsx         # Shopping cart sidebar
│   ├── HeroBanner.tsx         # Homepage hero section
│   ├── CategoryGrid.tsx       # Product category display
│   └── FloatingPromoButton.tsx# Mobile promo button
├── pages/                     # Main page components
│   ├── HomePage.tsx           # Landing page
│   └── CategoryPage.tsx       # Product listing with filters
├── store/                     # State management
│   └── cartStore.ts           # Shopping cart state (Zustand)
├── data/                      # Mock data and configuration
│   └── mockData.ts            # Product and category data
├── types/                     # TypeScript type definitions
│   └── index.ts               # Shared interfaces
└── index.css                  # Global styles and Tailwind imports
```

## How to run (Windows PowerShell)

```powershell
# 1) Install dependencies (first time only)
npm install

# 2) Start the dev server
npm run dev

# The app will be available at:
# http://localhost:5173

# Stop the server anytime with Ctrl+C
```

## Deploy to GitHub Pages

This repo is preconfigured to deploy to GitHub Pages at:

- Live URL (after first deploy): https://hligon35.github.io/troolengths/

What I set up:
- Vite `base` set to `/troolengths/` so assets resolve under the Pages path
- React Router `basename` bound to Vite base so routes work
- GitHub Actions workflow at `.github/workflows/deploy.yml`
- SPA fallback (copies `dist/index.html` to `dist/404.html`) for deep links

Steps to publish:
1) Push your changes to `main` on GitHub
2) In the GitHub repo, go to Settings → Pages
3) Under “Build and deployment”, set Source = “GitHub Actions”
4) Wait for the `Deploy to GitHub Pages` workflow to finish (Actions tab)
5) Open https://hligon35.github.io/troolengths/

Notes:
- If you change the repository name, update `base` in `vite.config.ts`
- If you move to a custom domain, remove the `base` or set it to `'/'`

## 🎨 Component Highlights

### Header Component
- Sticky positioning with promotional banner
- Responsive navigation with mobile hamburger menu
- Shopping cart icon with item count badge
- Search functionality (desktop/mobile)

### Hero Banner
- Auto-rotating slides with promotional content
- Conversion-optimized CTAs
- Background image support
- Mobile-responsive design

### Category Grid
- Hover effects with overlay CTAs
- Responsive grid layout
- Category descriptions and imagery
- Special promotional banners

### Cart Drawer
- Slide-in animation from right
- Product variant details
- Quantity controls
- Upsell suggestions and trust badges
- Free shipping progress indicator

## 🚀 Next Steps (Future Enhancements)

### Phase 2 Features to Add:
- **Product Detail Pages** with image zoom and variant selectors
- **User Authentication** and account management
- **Checkout Flow** with PayPal/Klarna integration
- **Customer Reviews** with photo uploads
- **Wishlist Functionality**
- **Search with Autocomplete**
- **Product Recommendations**
- **Email Newsletter Integration**

### Performance Optimizations:
- Image lazy loading and optimization
- Code splitting for better load times
- Service worker for offline functionality
- CDN integration for assets

## 📧 Support

For questions or customization requests, please refer to the code comments and component documentation within the source files.

## 🎉 Ready to Launch!

Your Troo Lengths e-commerce site is now ready! The application successfully replicates Nadula.com's layout and functionality while featuring your custom lavender and powder blue branding with conversion-optimized accent colors.

Visit `http://localhost:5173` to see your beautiful new hair extension e-commerce store in action!