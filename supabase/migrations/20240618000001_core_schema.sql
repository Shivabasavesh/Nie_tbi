-- Phase 2: Schema Creation & Constraints

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table 1: site_settings
CREATE TABLE site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_name TEXT NOT NULL,
    application_status TEXT NOT NULL CHECK (application_status IN ('Open', 'Closed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table 2: contact_settings
CREATE TABLE contact_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    address TEXT,
    phone TEXT,
    mobile TEXT,
    email TEXT,
    working_hours TEXT,
    google_map_url TEXT,
    linkedin_url TEXT,
    twitter_url TEXT,
    instagram_url TEXT,
    youtube_url TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table 3: startups
CREATE TABLE startups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    founder_name TEXT NOT NULL,
    sector TEXT NOT NULL,
    description TEXT NOT NULL,
    logo_url TEXT,
    website_link TEXT,
    is_graduated BOOLEAN NOT NULL DEFAULT FALSE,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table 4: events
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    event_start_date TIMESTAMPTZ NOT NULL,
    event_end_date TIMESTAMPTZ NOT NULL,
    description TEXT NOT NULL,
    banner_url TEXT,
    registration_link TEXT,
    status TEXT NOT NULL CHECK (status IN ('Upcoming', 'Completed')),
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table 5: blogs
CREATE TABLE blogs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    featured_image TEXT,
    content_md TEXT NOT NULL,
    meta_title TEXT,
    meta_description TEXT,
    status TEXT NOT NULL CHECK (status IN ('Draft', 'Published')),
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table 6: documents
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    file_url TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table 7: leadership
CREATE TABLE leadership (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    bio TEXT,
    photo_url TEXT,
    category TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table 8: infrastructure
CREATE TABLE infrastructure (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table 9: applications
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    startup_name TEXT NOT NULL,
    founder_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    startup_stage TEXT NOT NULL,
    sector TEXT NOT NULL,
    city TEXT NOT NULL,
    message TEXT NOT NULL,
    pitch_deck_url TEXT NOT NULL,
    link_accessibility_confirmed BOOLEAN NOT NULL CHECK (link_accessibility_confirmed = TRUE),
    admin_notes TEXT,
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Under Review', 'Accepted', 'Rejected')),
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert singleton default rows for settings tables
INSERT INTO site_settings (site_name, application_status) VALUES ('NIE Technology Business Incubator', 'Closed');
INSERT INTO contact_settings (address, email, phone) VALUES ('The National Institute of Engineering, Mysuru', 'info@nietbi.in', '+91 0000000000');
