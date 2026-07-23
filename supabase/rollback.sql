-- Rollback all changes

-- Drop Triggers
DROP TRIGGER IF EXISTS update_infrastructure_updated_at ON infrastructure;
DROP TRIGGER IF EXISTS update_leadership_updated_at ON leadership;
DROP TRIGGER IF EXISTS update_documents_updated_at ON documents;
DROP TRIGGER IF EXISTS update_blogs_updated_at ON blogs;
DROP TRIGGER IF EXISTS update_events_updated_at ON events;
DROP TRIGGER IF EXISTS update_startups_updated_at ON startups;
DROP TRIGGER IF EXISTS update_contact_settings_updated_at ON contact_settings;
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;

-- Drop Functions
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Drop Policies (Storage)
DROP POLICY IF EXISTS "Public Access startup_logos" ON storage.objects;
DROP POLICY IF EXISTS "Admin Access startup_logos" ON storage.objects;
DROP POLICY IF EXISTS "Public Access event_banners" ON storage.objects;
DROP POLICY IF EXISTS "Admin Access event_banners" ON storage.objects;
DROP POLICY IF EXISTS "Public Access policy_documents" ON storage.objects;
DROP POLICY IF EXISTS "Admin Access policy_documents" ON storage.objects;
DROP POLICY IF EXISTS "Public Access leadership_photos" ON storage.objects;
DROP POLICY IF EXISTS "Admin Access leadership_photos" ON storage.objects;
DROP POLICY IF EXISTS "Public Access infrastructure_images" ON storage.objects;
DROP POLICY IF EXISTS "Admin Access infrastructure_images" ON storage.objects;

-- Delete Storage Buckets
DELETE FROM storage.buckets WHERE id IN ('startup_logos', 'event_banners', 'policy_documents', 'leadership_photos', 'infrastructure_images');

-- Drop Tables (which cascades to constraints, indexes, and RLS policies)
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS infrastructure CASCADE;
DROP TABLE IF EXISTS leadership CASCADE;
DROP TABLE IF EXISTS documents CASCADE;
DROP TABLE IF EXISTS blogs CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS startups CASCADE;
DROP TABLE IF EXISTS contact_settings CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
