# hanzo.app

Marketing and product site for Hanzo AI native applications (hanzo.app). Serves as the main app landing, product catalog, and account management portal for the Hanzo ecosystem.

## Stack

- React 18 + TypeScript (Vite 5, SWC)
- React Router v6 (client-side routing)
- Tailwind CSS v4 + Radix UI primitives
- Framer Motion (animations), Three.js (3D), Recharts (charts)
- @paper-design/shaders-react (WebGL shader effects)
- @xyflow/react (node graph editor)

## Structure

```
src/
  App.tsx             # Root router -- splits AccountRoutes vs MarketingRoutes
  pages/
    AppLanding.tsx    # Homepage (/) -- app showcase (Dev, Chat, Design, Flow)
    Index.tsx         # Alternate homepage (/original, /index)
    AI.tsx, Cloud.tsx, Commerce.tsx, Blockchain.tsx, ...  # Product pages
    blockchain/       # Sub-pages: Nodes, Wallet, Bridge, DeFi, Explorer, etc.
    products/         # Dynamic taxonomy: CategoryPage, ProductPage, Integrations
    LoginPage.tsx, SignUpPage.tsx, Dashboard.tsx          # Auth + account
  components/
    navigation/       # Navbar, DesktopNav, MobileMenu, ProductsMenu
    account/          # AccountLayout (billing, usage, invoices, settings)
    hero/, landing/   # Hero sections, marketing blocks
    ai/, cloud/, blockchain/, commerce/  # Feature-specific UI
  contexts/           # ThemeContext, AccountContext, BillingContext
  data/               # Static data (product lists, pricing tiers)
  services/           # API client helpers
  hooks/              # Custom React hooks
```

## Key Routes

- `/` -- AppLanding (app showcase hero)
- `/ai`, `/cloud`, `/platform`, `/commerce`, `/blockchain` -- Product pages
- `/products/:categoryId/:productId` -- Dynamic product taxonomy
- `/pricing`, `/solutions`, `/enterprise` -- Sales pages
- `/account/*` -- Dashboard, billing, usage, invoices, settings
- `/team/:role` -- 16 AI team member pages (dev, vi, opera, chat, etc.)

## Commands

```bash
pnpm install
pnpm dev            # Vite dev server (localhost:5173)
pnpm build          # Production build to dist/
pnpm preview        # Preview production build
pnpm lint           # ESLint
```

## Notes

- All 5 domain sites (hanzo.app, hanzo.id, hanzo.network, hanzo.one, sensei.group) share the same component library and routes. Each has a unique landing page and index.html metadata.
- This site uses `AppLanding` as its homepage, showcasing Hanzo Dev, Chat, Design, and Flow apps.
- GlobalChatWidget renders on every page. KonamiCode provides an easter egg.
- Node.js v20+ required (.nvmrc). Use `--no-warnings` flag with Vite.
- Built with lovable-tagger dev dependency (Lovable.dev scaffolded origin).
