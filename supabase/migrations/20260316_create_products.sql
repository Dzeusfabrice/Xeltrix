-- Migration: table products (à exécuter dans le SQL Editor Supabase)
-- Inclut RLS + données initiales (les 5 produits du catalogue)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR UNIQUE NOT NULL,
    name VARCHAR NOT NULL,
    badge VARCHAR,
    tagline TEXT,
    description TEXT,
    icon_name VARCHAR DEFAULT 'Package',
    modules TEXT[] DEFAULT '{}',
    specs JSONB DEFAULT '{}'::jsonb,
    target VARCHAR,
    highlight_metric VARCHAR,
    highlight_label VARCHAR,
    sort_order INT DEFAULT 0,
    status VARCHAR DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Readable by everyone." ON products;
CREATE POLICY "Readable by everyone." ON products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Insertable by authenticated users." ON products;
CREATE POLICY "Insertable by authenticated users." ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Updatable by authenticated users." ON products;
CREATE POLICY "Updatable by authenticated users." ON products FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Deletable by authenticated users." ON products;
CREATE POLICY "Deletable by authenticated users." ON products FOR DELETE USING (auth.role() = 'authenticated');

DROP TRIGGER IF EXISTS update_products_modtime ON products;
CREATE TRIGGER update_products_modtime
    BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

INSERT INTO products (
    slug, name, badge, tagline, description, icon_name,
    modules, specs, target, highlight_metric, highlight_label,
    sort_order, status
)
VALUES
(
    'erp',
    'zeltrix ERP',
    'Enterprise Suite',
    'Progiciel de gestion intégrée agile, modulaire et ultra-performant',
    'zeltrix ERP centralise et automatise l''ensemble des processus opérationnels : achats, ventes, facturation électronique, gestion des stocks multi-entrepôts, suivi de trésorerie et conformité fiscale.',
    'Database',
    ARRAY[
        'Facturation & Comptabilité analytique automatisée',
        'Gestion des stocks en temps réel & alertes de réapprovisionnement',
        'Ressources Humaines : paie, congés, plannings & contrats',
        'Gestion de la chaîne logistique et traçabilité des livraisons',
        'API REST & Webhooks pour interconnecter vos outils existants'
    ],
    '{"deployment":"Cloud SaaS managé ou On-Premise","database":"PostgreSQL avec réplication temps réel","security":"Chiffrement AES-256, 2FA, conformité RGPD / OHADA","integrations":"Banques, Stripe, PayPal, Factur-X, Sage, WhatsApp"}'::jsonb,
    'PME, ETI, Grandes Entreprises',
    '40%',
    'de gain de productivité opérationnelle',
    10,
    'published'
),
(
    'crm',
    'zeltrix CRM',
    'Sales Acceleration',
    'Générateur de closing et fidélisation client assisté par IA',
    'Un CRM moderne conçu pour les équipes commerciales et support. Suivez chaque opportunité de vente, automatisez les relances par email et WhatsApp, et bénéficiez d''un scoring prédictif des leads.',
    'Users',
    ARRAY[
        'Pipeline commercial Kanban personnalisable par équipe',
        'Suivi omnicanal des interactions (Email, WhatsApp, Téléphone)',
        'Scoring prédictif des prospects basé sur l''activité',
        'Automatisation des devis, relances et signatures électroniques',
        'Rapports de performance commerciale et prévisions de revenus'
    ],
    '{"deployment":"Cloud SaaS sécurisé","database":"PostgreSQL / Redis cache","security":"Contrôle d''accès par rôle (RBAC)","integrations":"Gmail, Outlook, WhatsApp Business API, Zapier"}'::jsonb,
    'Équipes commerciales, Startups, B2B',
    'x2.5',
    'd''accélération sur le cycle de vente',
    20,
    'published'
),
(
    'chatsdk',
    'zeltrix Chat SDK',
    'Developer Infrastructure',
    'Moteur de messagerie instantanée temps réel & assistant IA embarqué',
    'Intégrez en quelques lignes de code une expérience de chat complète (1-to-1, groupes, salons, vocaux, partage de fichiers) au sein de vos applications web et mobiles avec une latence mondiale < 50ms.',
    'MessageSquare',
    ARRAY[
        'Messagerie temps réel par WebSockets & MQTT haute résilience',
        'Support complet des messages vocaux, médias riches et réactions',
        'Chiffrement de bout en bout (E2EE) côté client',
        'Intégration d''un bot IA de support client (RAG prêt à l''emploi)',
        'SDK natifs pour React, React Native, Flutter, Swift et Kotlin'
    ],
    '{"deployment":"Multi-région Edge Cloud","latency":"< 50ms mondialement","security":"Chiffrement E2EE Signal Protocol","integrations":"Webhooks, Push notifications (FCM / APNs)"}'::jsonb,
    'Développeurs, Apps Web & Mobile',
    '< 50ms',
    'de latence temps réel mondiale',
    30,
    'published'
),
(
    'kiosk',
    'zeltrix Kiosk',
    'Hardware & Retail',
    'Système tactile et autonome pour bornes interactives et points de vente',
    'Une solution logicielle robuste conçue pour les bornes en libre-service, les caisses tactiles de restaurants/magasins et les bornes d''accueil. Fonctionne parfaitement en mode hors-ligne sans interruption.',
    'Tablet',
    ARRAY[
        'Architecture Offline-First avec synchronisation différée',
        'Mode Kiosk Lockdown anti-intrusion au niveau système d''exploitation',
        'Intégration transparente avec les terminaux de paiement (TPE) et scanners',
        'Impression thermique instantanée des tickets et reçus',
        'Supervision et maintenance de la flotte à distance'
    ],
    '{"deployment":"Linux / Windows Embedded / Android","offline":"100% autonome sans connexion internet","hardware":"Compatible TPE Ingenico, Verifone, imprimantes ESC/POS","telemetry":"Monitoring d''état de santé du matériel en direct"}'::jsonb,
    'Retail, Restauration, Salons, Hôpitaux',
    '99.99%',
    'de disponibilité en environnement physique',
    40,
    'published'
),
(
    'analytics',
    'zeltrix Analytics',
    'Business Intelligence',
    'Observabilité opérationnelle et tableaux de bord décisionnels en temps réel',
    'Plateforme d''ingestion et de visualisation de données d''entreprise. Connectez vos bases de données opérationnelles, définissez vos KPI stratégiques et recevez des alertes intelligentes sur les anomalies.',
    'BarChart3',
    ARRAY[
        'Connecteurs prêts à l''emploi pour PostgreSQL, MySQL, REST APIs et fichiers CSV',
        'Tableaux de bord dynamiques interactifs (ventes, trésorerie, rétention)',
        'Génération et envoi automatisé de rapports exécutifs par email',
        'Détection automatique d''anomalies par machine learning',
        'Gestion fine des droits de consultation par département'
    ],
    '{"deployment":"Cloud SaaS ou Docker privé","performance":"Requêtes analytiques sub-seconde indexées","security":"Masquage automatique des données sensibles","export":"PDF haute résolution, Excel, CSV, API JSON"}'::jsonb,
    'Directions générales, DAF, Ops',
    '0 latence',
    'sur les requêtes décisionnelles',
    50,
    'published'
)
ON CONFLICT (slug) DO NOTHING;
