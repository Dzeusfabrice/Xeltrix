-- Migration: ajoute une image d'illustration aux services
-- À exécuter dans le SQL Editor Supabase.

ALTER TABLE services ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Images d'illustration par défaut pour les pôles existants (modifiables depuis l'admin)
UPDATE services SET image_url = 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1200&auto=format&fit=crop'
WHERE slug = 'web' AND (image_url IS NULL OR image_url = '');

UPDATE services SET image_url = 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=1200&auto=format&fit=crop'
WHERE slug = 'mobile' AND (image_url IS NULL OR image_url = '');

UPDATE services SET image_url = 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop'
WHERE slug = 'desktop' AND (image_url IS NULL OR image_url = '');

UPDATE services SET image_url = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop'
WHERE slug = 'erp' AND (image_url IS NULL OR image_url = '');

UPDATE services SET image_url = 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200&auto=format&fit=crop'
WHERE slug = 'ai' AND (image_url IS NULL OR image_url = '');

UPDATE services SET image_url = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop'
WHERE slug = 'devops' AND (image_url IS NULL OR image_url = '');

UPDATE services SET image_url = 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200&auto=format&fit=crop'
WHERE slug = 'maintenance' AND (image_url IS NULL OR image_url = '');
