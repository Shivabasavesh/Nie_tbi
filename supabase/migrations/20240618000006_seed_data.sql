-- Phase 6: Insert realistic seed data

-- Startups
INSERT INTO startups (slug, name, founder_name, sector, description, is_graduated, is_featured)
VALUES 
('agri-vectra', 'Agri Vectra Systems', 'John Doe', 'Agritech', 'IoT based smart agriculture solutions.', false, true),
('edusphere', 'EduSphere', 'Jane Smith', 'EdTech', 'VR based interactive learning platform.', false, true),
('healthsync', 'HealthSync', 'Dr. Alan Grant', 'HealthTech', 'AI-driven patient monitoring system.', true, false);

-- Events
INSERT INTO events (slug, title, event_start_date, event_end_date, description, status, is_featured)
VALUES 
('startup-pitch-2026', 'Annual Startup Pitch 2026', '2026-08-15 09:00:00+05:30', '2026-08-15 17:00:00+05:30', 'Join us for the biggest pitching event of the year.', 'Upcoming', true),
('founder-meetup-june', 'Founders Meetup June Edition', '2026-06-25 18:00:00+05:30', '2026-06-25 20:00:00+05:30', 'Networking session for incubated startups.', 'Upcoming', false);

-- Blogs
INSERT INTO blogs (slug, title, author, content_md, status, is_featured)
VALUES 
('welcome-to-nietbi', 'Welcome to the new NIETBI Platform', 'Admin', 'We are excited to launch our new official website...', 'Published', true),
('agritech-future', 'The Future of Agritech', 'John Doe', 'Agriculture is changing rapidly with IoT...', 'Published', false);

-- Documents
INSERT INTO documents (title, category, file_url)
VALUES 
('Incubation Policy 2026', 'Policies', 'https://example.com/policy.pdf'),
('Startup Application Template', 'Templates', 'https://example.com/template.pdf');

-- Leadership
INSERT INTO leadership (name, designation, category, display_order)
VALUES 
('Dr. Robert Ford', 'Chief Executive Officer', 'CEO', 1),
('Prof. Sarah Connor', 'Faculty In-Charge', 'Faculty', 2);

-- Infrastructure
INSERT INTO infrastructure (title, description, image_url, display_order)
VALUES 
('Co-Working Space', 'Fully furnished AC co-working space with high-speed internet.', 'https://example.com/coworking.jpg', 1),
('Hardware Lab', 'State-of-the-art lab for prototyping and testing.', 'https://example.com/lab.jpg', 2);
