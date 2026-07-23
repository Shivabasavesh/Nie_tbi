-- Phase 3: Performance Indexing

-- startups
CREATE INDEX IF NOT EXISTS idx_startups_is_featured ON startups(is_featured);
CREATE INDEX IF NOT EXISTS idx_startups_is_graduated ON startups(is_graduated);

-- events
CREATE INDEX IF NOT EXISTS idx_events_is_featured ON events(is_featured);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);

-- blogs
CREATE INDEX IF NOT EXISTS idx_blogs_is_featured ON blogs(is_featured);
CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status);

-- documents
CREATE INDEX IF NOT EXISTS idx_documents_category ON documents(category);

-- leadership
CREATE INDEX IF NOT EXISTS idx_leadership_category ON leadership(category);
CREATE INDEX IF NOT EXISTS idx_leadership_display_order ON leadership(display_order);

-- infrastructure
CREATE INDEX IF NOT EXISTS idx_infrastructure_display_order ON infrastructure(display_order);

-- applications
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
