DOCUMENT 2
TECHNICAL ARCHITECTURE & DATA SCHEMA
Project
NIETBI Official Website Platform
Client
NIE Technology Business Incubator (NIETBI)
Host Institution
The National Institute of Engineering (NIE), Mysuru
Document Phase
2 of 4
Version
Final Approved Architecture
________________________________________
1. PURPOSE
This document defines the complete technical architecture, backend structure, storage strategy, security model, CMS architecture, and database schema for the NIETBI Official Website Platform.
This document serves as the primary technical reference for:
•	Development
•	Testing
•	Deployment
•	CMS Implementation
•	Future Maintenance
•	Project Handover
All development activities shall conform to this architecture unless formally revised through a change request process.
________________________________________
2. ARCHITECTURE OVERVIEW
The platform shall follow a modern, lightweight, cloud-native architecture designed for:
•	Performance
•	Security
•	Scalability
•	Ease of Maintenance
•	Low Operational Cost
The architecture is intentionally optimized for institutional websites and content management systems.
________________________________________
Technology Stack
Frontend
•	React 18
•	Vite
•	React Router DOM
Backend Services
•	Supabase
Database
•	PostgreSQL
Authentication
•	Supabase Auth
Storage
•	Supabase Storage
Hosting
•	Vercel
Email Routing
•	Resend
•	SendGrid
•	Equivalent Transactional Email Service
________________________________________
3. FRONTEND APPLICATION STRUCTURE
src/

├── assets/
│
├── components/
│   ├── layout/
│   ├── ui/
│
├── layouts/
│
├── pages/
│
├── admin/
│
├── hooks/
│
├── services/
│   ├── supabase/
│   └── uploads/
│
├── utils/
│
├── styles/
│
├── lib/
│
└── App.jsx
________________________________________
Directory Purpose
assets
Static assets:
•	Logos
•	Placeholder Images
•	Icons
components
Reusable UI components:
•	Cards
•	Buttons
•	Forms
•	Sections
layouts
Application layout wrappers:
•	Public Layout
•	Admin Layout
pages
Public-facing pages.
admin
CMS pages.
hooks
Reusable React hooks.
services
API integrations and Supabase services.
utils
Helper functions and utilities.
styles
Global styles and design tokens.
________________________________________
4. DATABASE DESIGN PRINCIPLES
The database shall follow the following standards:
•	UUID Primary Keys
•	Row Level Security (RLS)
•	Timestamp Tracking
•	CMS-driven Content
•	Minimal Relational Complexity
•	Mobile Optimized Data Structures
•	Future Scalability
All content visible on the website shall originate from the database or CMS.
________________________________________
5. DATABASE TABLES
TABLE 1
site_settings
Purpose:
Global website configuration.
Fields
Field	Type
id	uuid
site_name	text
application_status	text
created_at	timestamp
updated_at	timestamp
Allowed Values
application_status:
•	Open
•	Closed
________________________________________
TABLE 2
contact_settings
Purpose:
Manage website contact information without code deployment.
Fields
Field	Type
id	uuid
address	text
phone	text
mobile	text
email	text
working_hours	text
google_map_url	text
linkedin_url	text
twitter_url	text
instagram_url	text
youtube_url	text
updated_at	timestamp
________________________________________
TABLE 3
startups
Purpose:
Manage both active and graduated startup portfolios.
Fields
Field	Type
id	uuid
slug	text unique
name	text
founder_name	text
sector	text
description	text
logo_url	text
website_link	text
is_graduated	boolean
is_featured	boolean
created_at	timestamp
updated_at	timestamp
Logic
is_graduated = false
→ Currently Incubated
is_graduated = true
→ Graduated Startup
Homepage Logic
is_featured = true
→ Display in Featured Startup section
________________________________________
TABLE 4
events
Purpose:
Manage institutional events and activities.
Fields
Field	Type
id	uuid
slug	text unique
title	text
event_start_date	timestamp
event_end_date	timestamp
description	text
banner_url	text
registration_link	text
status	text
is_featured	boolean
created_at	timestamp
updated_at	timestamp
Allowed Status Values
•	Upcoming
•	Completed
Homepage Logic
is_featured = true
→ Display in Featured Events section
________________________________________
TABLE 5
blogs
Purpose:
Manage announcements, articles, and startup stories.
Fields
Field	Type
id	uuid
slug	text unique
title	text
author	text
featured_image	text
content_md	text
meta_title	text
meta_description	text
status	text
is_featured	boolean
created_at	timestamp
updated_at	timestamp
Allowed Status Values
•	Draft
•	Published
Homepage Logic
is_featured = true
→ Display in Featured News section
Content Format
Markdown Only
Custom HTML, scripts, and inline CSS are prohibited.
________________________________________
TABLE 6
documents
Purpose:
Manage downloadable institutional documents.
Fields
Field	Type
id	uuid
title	text
description	text
category	text
file_url	text
created_at	timestamp
updated_at	timestamp
Categories
•	Policies
•	Reports
•	Templates
•	Forms
•	Guidelines
________________________________________
TABLE 7
leadership
Purpose:
Manage leadership, faculty, advisors, and mentors.
Fields
Field	Type
id	uuid
name	text
designation	text
bio	text
photo_url	text
category	text
display_order	integer
created_at	timestamp
updated_at	timestamp
Categories
•	CEO
•	Faculty
•	Advisor
•	Mentor
Ordering Logic
The CMS shall manage ordering automatically through:
•	Move Up
•	Move Down
Administrators shall not manually manage sorting values.
________________________________________
TABLE 8
infrastructure
Purpose:
Manage infrastructure and facility showcase content.
Fields
Field	Type
id	uuid
title	text
description	text
image_url	text
display_order	integer
created_at	timestamp
updated_at	timestamp
Ordering Logic
Managed automatically through CMS controls.
________________________________________
TABLE 9
applications
Purpose:
Store startup incubation applications.
Fields
Field	Type
id	uuid
startup_name	text
founder_name	text
email	text
phone	text
startup_stage	text
sector	text
city	text
message	text
pitch_deck_url	text
link_accessibility_confirmed	boolean
admin_notes	text
status	text
submitted_at	timestamp
Default Status
Pending
Allowed Status Values
•	Pending
•	Under Review
•	Accepted
•	Rejected
Submission Rule
Application submission shall only be permitted when:
link_accessibility_confirmed = true
Purpose
This field serves as applicant confirmation that reviewers can access the submitted pitch deck link.
________________________________________
6. STORAGE ARCHITECTURE
Bucket 1
startup_logos
Purpose:
Startup Logos
Allowed Formats:
•	PNG
•	JPG
•	SVG
Maximum Size:
2 MB
________________________________________
Bucket 2
event_banners
Purpose:
Events and Blog Images
Allowed Formats:
•	PNG
•	JPG
•	WEBP
Maximum Size:
5 MB
________________________________________
Bucket 3
policy_documents
Purpose:
Downloadable Documents
Allowed Formats:
•	PDF
Maximum Size:
10 MB
________________________________________
Bucket 4
leadership_photos
Purpose:
Leadership Images
Maximum Size:
2 MB
________________________________________
Bucket 5
infrastructure_images
Purpose:
Infrastructure Gallery
Maximum Size:
5 MB
________________________________________
7. ROW LEVEL SECURITY (RLS)
All tables shall have Row Level Security enabled.
________________________________________
Public Users
Allowed:
•	Read Public Website Content
Restricted:
•	Update Records
•	Delete Records
•	Access CMS
________________________________________
Applications Table Exception
Public Users shall be allowed:
•	INSERT only
Purpose:
Allow startup application submissions.
Public Users shall NOT be allowed:
•	SELECT
•	UPDATE
•	DELETE
for application records.
________________________________________
Authenticated Administrators
Allowed:
•	SELECT
•	INSERT
•	UPDATE
•	DELETE
on all authorized tables.
________________________________________
8. CMS DATA FLOW
Administrator Login
↓
Admin Dashboard
↓
Create / Edit Content
↓
Supabase Database
↓
Frontend Fetches Updated Data
↓
Website Updates Automatically
No code deployment shall be required for content updates.
________________________________________
9. DATA FETCHING STRATEGY
The frontend shall use direct Supabase queries.
All content shall be dynamically fetched and rendered through reusable React components.
Examples:
•	Startup Cards
•	Event Cards
•	Blog Cards
•	Leadership Cards
•	Infrastructure Cards
•	Download Cards
The platform shall remain database-driven while preserving a static-site user experience.
________________________________________
10. PERFORMANCE STRATEGY
The platform shall prioritize:
•	Fast Loading Times
•	Optimized Images
•	Responsive Rendering
•	Lightweight Assets
•	Efficient Queries
•	Minimal Third-Party Dependencies
No unnecessary scripts or tracking libraries shall be included.
________________________________________
11. DEVELOPMENT STRATEGY
Development shall proceed independently of pending institutional assets.
Temporary content may include:
•	Placeholder Images
•	Stock Photography
•	Sample Startups
•	Sample Events
•	Mock Documents
until official content is supplied by NIETBI.
This approach ensures uninterrupted development and timely delivery.
________________________________________
12. BACKUP & RECOVERY
The platform relies on Supabase-managed database and storage infrastructure.
All uploaded files and CMS records shall be stored within the designated Supabase project.
Database exports may be generated periodically by administrators for backup purposes.
________________________________________
13. TECHNICAL HANDOVER
Upon project completion:
Agri Vectra Systems Private Limited shall transfer:
•	Supabase Project Ownership
•	Vercel Project Access
•	Environment Variables Documentation
•	Storage Bucket Documentation
•	CMS Credentials
•	Deployment Documentation
to NIETBI.
________________________________________
APPROVAL
This document defines the approved technical architecture, backend structure, database schema, storage strategy, CMS framework, security model, and deployment foundation for the NIETBI Official Website Platform.
All implementation activities shall adhere to this architecture unless modified through an approved change request process.

