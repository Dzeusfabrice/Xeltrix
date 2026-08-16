-- Table: projects
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR NOT NULL,
    slug VARCHAR UNIQUE NOT NULL,
    description TEXT,
    content TEXT,
    image_url TEXT,
    gallery TEXT[],
    category VARCHAR,
    technologies TEXT[],
    project_url TEXT,
    download_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    status VARCHAR DEFAULT 'development',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: testimonials
CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    position VARCHAR,
    photo_url TEXT,
    message TEXT NOT NULL,
    rating INT DEFAULT 5,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: articles (Blog)
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR NOT NULL,
    slug VARCHAR UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_url TEXT,
    category VARCHAR,
    tags TEXT[],
    author_id UUID REFERENCES auth.users(id),
    status VARCHAR DEFAULT 'draft',
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: technologies
CREATE TABLE technologies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    logo_url TEXT,
    category VARCHAR,
    description TEXT,
    proficiency INT DEFAULT 85,
    level VARCHAR DEFAULT 'Intermediaire',
    sort_order INT DEFAULT 0
);

-- Table: messages (Contact)
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone VARCHAR,
    subject VARCHAR NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR DEFAULT 'unread',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: experience_skills
CREATE TABLE experience_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    domain VARCHAR,
    tech TEXT,
    level INT DEFAULT 85,
    color VARCHAR DEFAULT 'from-blue-500 to-cyan-400',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: services
CREATE TABLE services (
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

-- Table: products
CREATE TABLE products (
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

-- RLS (Row Level Security) - Basic setup
-- By default, content is readable by everyone, but only admin (auth) can insert/update/delete

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON projects FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profiles." ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update their own profiles." ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Users can delete their own profiles." ON projects FOR DELETE USING (auth.role() = 'authenticated');

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Readable by everyone." ON testimonials FOR SELECT USING (true);
CREATE POLICY "Insertable by authenticated users." ON testimonials FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Updatable by authenticated users." ON testimonials FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Deletable by authenticated users." ON testimonials FOR DELETE USING (auth.role() = 'authenticated');

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Readable by everyone." ON articles FOR SELECT USING (true);
CREATE POLICY "Insertable by authenticated users." ON articles FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Updatable by authenticated users." ON articles FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Deletable by authenticated users." ON articles FOR DELETE USING (auth.role() = 'authenticated');

ALTER TABLE technologies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Readable by everyone." ON technologies FOR SELECT USING (true);
CREATE POLICY "Insertable by authenticated users." ON technologies FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Updatable by authenticated users." ON technologies FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Deletable by authenticated users." ON technologies FOR DELETE USING (auth.role() = 'authenticated');

-- Messages can only be inserted by anonymous, but read/updated by authenticated
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert messages." ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Only read by authenticated users." ON messages FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Only updated by authenticated users." ON messages FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Only deleted by authenticated users." ON messages FOR DELETE USING (auth.role() = 'authenticated');

ALTER TABLE experience_skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Readable by everyone." ON experience_skills FOR SELECT USING (true);
CREATE POLICY "Insertable by authenticated users." ON experience_skills FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Updatable by authenticated users." ON experience_skills FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Deletable by authenticated users." ON experience_skills FOR DELETE USING (auth.role() = 'authenticated');

ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Readable by everyone." ON services FOR SELECT USING (true);
CREATE POLICY "Insertable by authenticated users." ON services FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Updatable by authenticated users." ON services FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Deletable by authenticated users." ON services FOR DELETE USING (auth.role() = 'authenticated');

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Readable by everyone." ON products FOR SELECT USING (true);
CREATE POLICY "Insertable by authenticated users." ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Updatable by authenticated users." ON products FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Deletable by authenticated users." ON products FOR DELETE USING (auth.role() = 'authenticated');

-- Function to automatically update `updated_at` column
CREATE OR REPLACE FUNCTION update_modified_column() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_modtime BEFORE UPDATE ON projects FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_articles_modtime BEFORE UPDATE ON articles FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_services_modtime BEFORE UPDATE ON services FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_products_modtime BEFORE UPDATE ON products FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- Storage Setup
-- Note: In some Supabase versions, you might need to use the Dashboard UI
-- to create the bucket if this SQL fails.

-- Create the bucket for all site assets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('xeltrix', 'xeltrix', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to read files
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'xeltrix' );

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated Insert Access"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'xeltrix' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update/delete their files (or any files if they are admin)
CREATE POLICY "Authenticated Update Access"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'xeltrix'
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated Delete Access"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'xeltrix'
  AND auth.role() = 'authenticated'
);
