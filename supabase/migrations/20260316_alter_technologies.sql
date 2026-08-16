-- Migration: aligner la table technologies sur le code de l'application
-- Le formulaire admin envoie `description` et `proficiency`, absents du schéma initial.
-- À exécuter dans le SQL Editor Supabase.

ALTER TABLE technologies ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE technologies ADD COLUMN IF NOT EXISTS proficiency INT DEFAULT 85;

-- Reprend l'ancien champ texte `level` pour initialiser le pourcentage
UPDATE technologies
SET proficiency = CASE level
    WHEN 'Expert' THEN 95
    WHEN 'Intermediaire' THEN 75
    WHEN 'Debutant' THEN 50
    ELSE 85
END
WHERE proficiency IS NULL;
