# zeltrix - Plateforme Web Officielle

Bienvenue sur le dépôt officiel de **zeltrix**, une startup technologique spécialisée dans le développement de solutions logicielles innovantes.

## 🚀 Technologies Utilisées

- **Frontend** : Next.js 16 (App Router), React 19, Tailwind CSS 4
- **Backend & BDD** : Supabase (PostgreSQL), Edge Functions
- **Animations** : GSAP, Framer Motion
- **Design** : Glassmorphism, Responsive Design
- **Utilitaires** : Lucide React, Zod, React Hook Form, Swiper.js

## 📁 Structure du Projet

- `/app` : Routes de l'application (Public & Admin)
- `/components` : Composants UI réutilisables et layout
- `/lib` : Configurations (Supabase client, utils)
- `/types` : Définitions TypeScript pour la BDD
- `/public` : Assets statiques (Logos, Images)

## 🛠️ Installation

1. **Cloner le projet**
2. **Installer les dépendances** :
   ```bash
   npm install
   ```
3. **Configurer les variables d'environnement** :
   Copiez le fichier `.env.local.example` vers `.env.local` et renseignez vos clés Supabase.
4. **Initialiser la base de données** :
   Utilisez le script SQL fourni dans les documents du projet pour créer les tables et les politiques RLS sur votre dashboard Supabase.
5. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```

## 🔐 Administration

L'accès au Dashboard Admin se fait via `/admin/login`. 
Assurez-vous d'avoir configuré les politiques RLS pour restreindre l'accès aux données sensibles.

## 📈 Performance & SEO

Le projet est optimisé pour les **Core Web Vitals** :
- Scores Lighthouse cibles > 90
- Optimisation des images (WebP)
- SEO sémantique (JSON-LD, Meta Tags)

---
© 2025 zeltrix - Direction Technique
