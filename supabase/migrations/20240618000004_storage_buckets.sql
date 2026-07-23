-- Phase 5: Storage Buckets Configuration

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('startup_logos', 'startup_logos', true, 2097152, ARRAY['image/png', 'image/jpeg', 'image/svg+xml']),
  ('event_banners', 'event_banners', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/webp']),
  ('policy_documents', 'policy_documents', true, 10485760, ARRAY['application/pdf']),
  ('leadership_photos', 'leadership_photos', true, 2097152, ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']),
  ('infrastructure_images', 'infrastructure_images', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'])
ON CONFLICT (id) DO UPDATE SET 
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Storage RLS

-- startup_logos
CREATE POLICY "Public Access startup_logos" ON storage.objects FOR SELECT TO anon USING ( bucket_id = 'startup_logos' );
CREATE POLICY "Admin Access startup_logos" ON storage.objects TO authenticated USING ( bucket_id = 'startup_logos' ) WITH CHECK ( bucket_id = 'startup_logos' );

-- event_banners
CREATE POLICY "Public Access event_banners" ON storage.objects FOR SELECT TO anon USING ( bucket_id = 'event_banners' );
CREATE POLICY "Admin Access event_banners" ON storage.objects TO authenticated USING ( bucket_id = 'event_banners' ) WITH CHECK ( bucket_id = 'event_banners' );

-- policy_documents
CREATE POLICY "Public Access policy_documents" ON storage.objects FOR SELECT TO anon USING ( bucket_id = 'policy_documents' );
CREATE POLICY "Admin Access policy_documents" ON storage.objects TO authenticated USING ( bucket_id = 'policy_documents' ) WITH CHECK ( bucket_id = 'policy_documents' );

-- leadership_photos
CREATE POLICY "Public Access leadership_photos" ON storage.objects FOR SELECT TO anon USING ( bucket_id = 'leadership_photos' );
CREATE POLICY "Admin Access leadership_photos" ON storage.objects TO authenticated USING ( bucket_id = 'leadership_photos' ) WITH CHECK ( bucket_id = 'leadership_photos' );

-- infrastructure_images
CREATE POLICY "Public Access infrastructure_images" ON storage.objects FOR SELECT TO anon USING ( bucket_id = 'infrastructure_images' );
CREATE POLICY "Admin Access infrastructure_images" ON storage.objects TO authenticated USING ( bucket_id = 'infrastructure_images' ) WITH CHECK ( bucket_id = 'infrastructure_images' );
