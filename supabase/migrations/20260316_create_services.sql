-- Migration: table services (à exécuter dans le SQL Editor Supabase)
-- Inclut RLS + données initiales (les 7 expertises actuelles)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR UNIQUE NOT NULL,
    title VARCHAR NOT NULL,
    tagline TEXT,
    description TEXT,
    icon_name VARCHAR DEFAULT 'Wrench',
    image_url TEXT,
    features TEXT[] DEFAULT '{}',
    deliverables TEXT[] DEFAULT '{}',
    stack TEXT[] DEFAULT '{}',
    timeline VARCHAR,
    sort_order INT DEFAULT 0,
    status VARCHAR DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Readable by everyone." ON services;
CREATE POLICY "Readable by everyone." ON services FOR SELECT USING (true);

DROP POLICY IF EXISTS "Insertable by authenticated users." ON services;
CREATE POLICY "Insertable by authenticated users." ON services FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Updatable by authenticated users." ON services;
CREATE POLICY "Updatable by authenticated users." ON services FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Deletable by authenticated users." ON services;
CREATE POLICY "Deletable by authenticated users." ON services FOR DELETE USING (auth.role() = 'authenticated');

DROP TRIGGER IF EXISTS update_services_modtime ON services;
CREATE TRIGGER update_services_modtime
    BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

INSERT INTO services (slug, title, tagline, description, icon_name, features, deliverables, stack, timeline, sort_order, status)
VALUES
(
    'web',
    'Développement Web, Plateformes & SaaS',
    'Des applications web réactives, modulaires et pensées pour la montée en charge',
    'Nous concevons des portails B2B, des applications SaaS multi-tenants et des plateformes transactionnelles sécurisées en exploitant le plein potentiel de Next.js, React 19, TypeScript et des Server Components.',
    'Globe',
    ARRAY[
        'Architecture modulaire et Server-Side Rendering (SSR)',
        'Optimisation SEO technique et Core Web Vitals (> 90)',
        'Gestion d''états complexes et intégration d''APIs REST / GraphQL',
        'Tableaux de bord analytiques et passerelles de paiement'
    ],
    ARRAY['Code source TypeScript documenté', 'Tests unitaires & E2E', 'Pipeline CI/CD', 'Documentation API OpenAPI'],
    ARRAY['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    '3 à 8 semaines',
    10,
    'published'
),
(
    'mobile',
    'Applications Mobiles iOS & Android',
    'Expérience native 120Hz et performance sans compromis',
    'Développement d''applications mobiles hybrides et cross-platform à haute fluidité. Synchronisation hors-ligne, notifications push ciblées et intégration fine avec les capteurs matériels.',
    'Smartphone',
    ARRAY[
        'Expérience utilisateur soignée avec animations 60/120 FPS',
        'Architecture Offline-First avec base de données locale sécurisée',
        'Publication et gestion des versions sur App Store et Google Play',
        'Authentification biométrique (Face ID, Touch ID, Fingerprint)'
    ],
    ARRAY['Binaires IPA / APK & AAB', 'Configuration stores', 'Codebase unifiée iOS/Android'],
    ARRAY['React Native', 'Flutter', 'Expo', 'Swift', 'Kotlin', 'Supabase'],
    '4 à 10 semaines',
    20,
    'published'
),
(
    'desktop',
    'Logiciels Desktop & Systèmes Embarqués',
    'Puissance native et empreinte mémoire minimale',
    'Création de logiciels de bureau modernes et ultra-légers pour Windows, macOS et Linux via Tauri et Rust, évitant la surcharge des technologies traditionnelles.',
    'Monitor',
    ARRAY[
        'Exécutables ultra-légers (< 15 Mo) et démarrage instantané',
        'Communication directe avec le matériel (ports séries, imprimantes, scanners)',
        'Système de mise à jour automatique chiffré (Auto-Updater)',
        'Sécurité renforcée par le typage strict et la mémoire sécurisée de Rust'
    ],
    ARRAY['Installateurs signés (.msi, .dmg, .deb)', 'Mises à jour OTA', 'Logs et télémétrie'],
    ARRAY['Tauri', 'Rust', 'TypeScript', 'Electron', 'SQLite'],
    '4 à 12 semaines',
    30,
    'published'
),
(
    'erp',
    'ERP & Systèmes d''Information sur Mesure',
    'Digitalisez et automatisez l''ensemble de vos processus métiers',
    'Finies les solutions génériques rigides. Nous construisons des progiciels de gestion intégrés parfaitement alignés sur vos flux opérationnels : stocks, RH, CRM, logistique et facturation.',
    'Database',
    ARRAY[
        'Modélisation personnalisée des entités métiers et workflows',
        'Gestion granulaire des permissions et audit trail complet',
        'Synchronisation multi-filiales et multi-devises',
        'Génération automatisée de rapports comptables et factures PDF'
    ],
    ARRAY['ERP déployé', 'Formation des équipes', 'Guide administrateur', 'Export de données'],
    ARRAY['PostgreSQL', 'Prisma / Drizzle', 'FastAPI / NestJS', 'Docker', 'Redis'],
    '6 à 16 semaines',
    40,
    'published'
),
(
    'ai',
    'Intelligence Artificielle & Automatisation LLM',
    'Propulsez votre productivité grâce à des agents IA entraînés sur vos données',
    'Intégration d''architectures RAG (Retrieval-Augmented Generation), d''agents autonomes pour le service client, de classification documentaire automatique et de modèles de prédiction business.',
    'Bot',
    ARRAY[
        'Recherche sémantique vectorielle sur votre base de connaissances',
        'Agents IA conversationnels connectés à vos bases de données',
        'Extraction structurée de données depuis des documents PDF/factures',
        'Protection stricte de la confidentialité (données privées non réinjectées)'
    ],
    ARRAY['Moteur RAG opérationnel', 'Connecteurs de données', 'Dashboard de monitoring des coûts IA'],
    ARRAY['Python', 'LangChain', 'OpenAI / Claude API', 'pgvector', 'Ollama'],
    '2 à 6 semaines',
    50,
    'published'
),
(
    'devops',
    'DevOps, Cloud & Haute Disponibilité',
    'Infrastructures infogérées résilientes et pipelines automatisés',
    'Déploiement et gestion d''infrastructures cloud scalables. Nous configurons des pipelines de déploiement continu sans interruption de service (Zero-Downtime), avec surveillance proactive et sauvegardes automatiques.',
    'Cloud',
    ARRAY[
        'Infrastructure as Code (Terraform, Docker Compose)',
        'Pipelines CI/CD GitHub Actions & GitLab CI',
        'Monitoring 24/7, alertes d''incidents et métriques Prometheus/Grafana',
        'Stratégie de reprise après sinistre (Disaster Recovery Plan)'
    ],
    ARRAY['Scripts IaC', 'Monitoring en direct', 'Certificats SSL & configurations de sécurité'],
    ARRAY['Docker', 'Kubernetes', 'AWS', 'DigitalOcean', 'Supabase', 'GitHub Actions'],
    '1 à 4 semaines',
    60,
    'published'
),
(
    'maintenance',
    'Tierce Maintenance Applicative (TMA) & SLA',
    'Assurez la continuité, la sécurité et l''évolution permanente de vos logiciels',
    'Un partenariat sur le long terme pour garantir la disponibilité de vos applications critiques avec des engagements de temps de réponse stricts (GTI / GTR) et des montées de versions régulières.',
    'Wrench',
    ARRAY[
        'Intervention prioritaire en cas d''incident (SLA 99.9%)',
        'Mises à jour de sécurité et correctifs de dépendances',
        'Optimisation continue des performances et de la base de données',
        'Crédit d''heures mensuel dédié aux nouvelles fonctionnalités'
    ],
    ARRAY['Rapport mensuel d''activité', 'Dashboard de santé du système', 'Canal Slack/WhatsApp direct'],
    ARRAY['Monitoring Sentry', 'Datadog', 'Uptime Kuma', 'PostgreSQL Tune'],
    'Contrat mensuel ou annuel',
    70,
    'published'
)
ON CONFLICT (slug) DO NOTHING;
