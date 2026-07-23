-- Phase 4: Row Level Security (RLS) Implementation

-- Enable RLS on all tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE startups ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE leadership ENABLE ROW LEVEL SECURITY;
ALTER TABLE infrastructure ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Public Access Policies (Anon Role)
-- Public can read all tables EXCEPT applications
CREATE POLICY "Public can read site_settings" ON site_settings FOR SELECT TO anon USING (true);
CREATE POLICY "Public can read contact_settings" ON contact_settings FOR SELECT TO anon USING (true);
CREATE POLICY "Public can read startups" ON startups FOR SELECT TO anon USING (true);
CREATE POLICY "Public can read events" ON events FOR SELECT TO anon USING (true);
CREATE POLICY "Public can read blogs" ON blogs FOR SELECT TO anon USING (true);
CREATE POLICY "Public can read documents" ON documents FOR SELECT TO anon USING (true);
CREATE POLICY "Public can read leadership" ON leadership FOR SELECT TO anon USING (true);
CREATE POLICY "Public can read infrastructure" ON infrastructure FOR SELECT TO anon USING (true);

-- Applications Table Exception
-- Public can INSERT applications but NOT SELECT/UPDATE/DELETE
CREATE POLICY "Public can insert applications" ON applications FOR INSERT TO anon WITH CHECK (true);

-- Authenticated Administrators Access (Authenticated Role)
-- Admins have full access to all tables
CREATE POLICY "Admins have full access to site_settings" ON site_settings TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to contact_settings" ON contact_settings TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to startups" ON startups TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to events" ON events TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to blogs" ON blogs TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to documents" ON documents TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to leadership" ON leadership TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to infrastructure" ON infrastructure TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to applications" ON applications TO authenticated USING (true) WITH CHECK (true);
