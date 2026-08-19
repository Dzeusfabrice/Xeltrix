# STRATÉGIE & OPTIMISATIONS SEO - zeltrix

## 1. Métadonnées & Balises Globales
- **Titre dynamique** : `[Page] | zeltrix` avec titre par défaut axé sur l'ingénierie logicielle et le développement sur mesure.
- **Description & OpenGraph** : Cartes Twitter et Facebook intégrées avec prévisualisation enrichie.
- **Indexation** : Directives strictes autorisant les moteurs de recherche tout en protégeant les routes d'administration (`/admin`).

## 2. Données Structurées (JSON-LD)
La plateforme intègre des schémas Schema.org injectés côté serveur dans `app/layout.tsx` :
- `Organization` : Nom officiel, URL, logo, réseaux sociaux et point de contact.
- `WebSite` : Déclaration du domaine racine et de l'autorité éditoriale.

## 3. Sitemap & Fichiers Techniques
- `app/sitemap.ts` : Génération automatique des URLs statiques et dynamiques (projets du portfolio et articles du blog depuis Supabase).
- `app/robots.ts` : Exclusion des bots des répertoires privés et pointage vers `sitemap.xml`.
