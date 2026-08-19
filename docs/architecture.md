# ARCHITECTURE TECHNIQUE - zeltrix

## 1. Vue d'Ensemble

La plateforme zeltrix est conçue selon les meilleures pratiques du développement moderne avec Next.js 16 (App Router) et une architecture en couches étanche.

```
                    ┌─────────────────────────┐
                    │      Client Browser     │
                    └────────────┬────────────┘
                                 │
                     HTTP / HTTPS / WebSockets
                                 │
                    ┌────────────▼────────────┐
                    │     Next.js 16 App      │
                    │   (Server Components)   │
                    └────────────┬────────────┘
                                 │
             ┌───────────────────┼───────────────────┐
             │                   │                   │
    ┌────────▼────────┐ ┌────────▼────────┐ ┌────────▼────────┐
    │  Public Routes  │ │   Admin Portal  │ │ API Server Actions
    │  (/services,    │ │   (/admin/*)    │ │ (/api/*, actions)
    │   /products...) │ │                 │ │                 │
    └────────┬────────┘ └────────┬────────┘ └────────┬────────┘
             │                   │                   │
             └───────────────────┼───────────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │   Supabase Cloud / DB   │
                    │ (PostgreSQL, Auth, RLS) │
                    └─────────────────────────┘
```

## 2. Principes Fondamentaux

- **Server-First par défaut** : Utilisation maximale des React Server Components (RSC) pour le rendu initial rapide, la sécurité des clés et le SEO.
- **Client Components isolés** : Réservés aux parties interactives (animations Framer Motion, simulateur de devis, filtres dynamiques).
- **Sécurité RLS (Row Level Security)** : Politiques strictes PostgreSQL sur la base Supabase pour isoler les messages, articles et données sensibles.
- **Modularité du Design System** : Primitives unifiées dans `components/ui/index.tsx` respectant les directives Linear / Vercel.

## 3. Structure des Données Supabase

1. `projects` : Portfolio et réalisations (slug, category, title, description, technologies, is_featured, status).
2. `articles` : Publications du blog technique (slug, content, excerpt, category, tags, published_at).
3. `messages` : Leads, demandes de contact et devis générés (name, email, phone, subject, message, status).
4. `testimonials` : Avis et recommandations vérifiés (name, position, message, rating, is_featured).
5. `technologies` : Stack technique maîtrisée (name, category, level, sort_order).
