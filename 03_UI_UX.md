DOCUMENT 3
UI/UX COMPONENT LIBRARY, DESIGN SYSTEM & SITE ARCHITECTURE
Project
NIETBI Official Website Platform
Client
NIE Technology Business Incubator (NIETBI)
Host Institution
The National Institute of Engineering (NIE), Mysuru
Document Phase
3 of 4
Version
Final Approved UI/UX Architecture
________________________________________
1. PURPOSE
This document defines the complete frontend architecture, route hierarchy, reusable component library, user interface standards, user experience patterns, CMS interaction model, and design governance rules for the NIETBI Official Website Platform.
The objective is to ensure:
•	Consistent UI across all pages
•	Reusable component architecture
•	Mobile-first implementation
•	Reduced development complexity
•	Long-term maintainability
•	Prevention of design drift
•	Faster AI-assisted development
This document acts as the single source of truth for all frontend implementation activities.
________________________________________
2. SITE ARCHITECTURE & ROUTE HIERARCHY
2.1 Public Website Routes
All public pages shall be wrapped inside:
PublicLayout.jsx
Routes
Route	Component
/	Home.jsx
/about	About.jsx
/programs	Programs.jsx
/startups	Startups.jsx
/startups/:slug	StartupDetail.jsx
/leadership	Leadership.jsx
/events	Events.jsx
/events/:slug	EventDetail.jsx
/blogs	Blogs.jsx
/blogs/:slug	BlogDetail.jsx
/infrastructure	Infrastructure.jsx
/downloads	Downloads.jsx
/donate	Donate.jsx
/contact	Contact.jsx
/*	NotFound.jsx
________________________________________
2.2 Admin Routes
All CMS pages shall be wrapped inside:
AdminLayout.jsx
and protected through authentication.
Routes
Route	Component
/admin/login	Login.jsx
/admin	AdminDashboard.jsx
/admin/startups	AdminStartups.jsx
/admin/events	AdminEvents.jsx
/admin/blogs	AdminBlogs.jsx
/admin/documents	AdminDocuments.jsx
/admin/settings	AdminSettings.jsx
________________________________________
3. NAVIGATION GOVERNANCE
To maintain institutional consistency and prevent uncontrolled modifications:
Editable Through CMS
•	Contact Information
•	Social Media Links
•	Application Status
Not Editable Through CMS
•	Navigation Structure
•	Navigation Labels
•	Menu Ordering
•	Page Hierarchy
•	Route Architecture
Any modifications to these items shall require a development change request.
________________________________________
4. HOMEPAGE GOVERNANCE
The homepage storytelling sequence is fixed.
Administrators cannot reorder homepage sections.
Approved Homepage Structure
1.	Hero Section
2.	Impact Statistics
3.	Focus Areas
4.	Programs Overview
5.	Featured Startups
6.	Infrastructure Highlights
7.	Featured Events
8.	Call To Action
This structure preserves institutional storytelling and conversion flow.
________________________________________
5. DESIGN SYSTEM
Design Philosophy
The website shall reflect:
•	NIE Institutional Identity
•	Academic Excellence
•	Innovation
•	Professionalism
•	Government-backed Credibility
The website shall not resemble:
•	Startup SaaS Platforms
•	Marketing Landing Pages
•	Agency Portfolio Websites
________________________________________
Brand Colors
:root {
  --nie-navy: #0D2B6E;
  --nie-orange: #F5821F;
  --text-body: #334155;
  --bg-light: #F8FAFC;
}
________________________________________
Typography
Heading Font
Professional Sans Serif
Examples:
•	Inter Tight
•	Plus Jakarta Sans
Body Font
Inter
________________________________________
Responsive Standards
Mobile First
Supported Devices:
•	Mobile
•	Tablet
•	Laptop
•	Desktop
No horizontal scrolling shall occur.
________________________________________
6. CORE COMPONENT LIBRARY
All pages shall be assembled from reusable components.
________________________________________
6.1 Layout Components
Navbar.jsx
Features:
•	Sticky Navigation
•	Mobile Hamburger Menu
•	Active Link State
•	Scroll Shadow
________________________________________
Footer.jsx
Desktop:
•	4 Column Layout
Sections:
•	Quick Links
•	Programs
•	Contact
•	Social Media
Mobile:
•	Accordion Layout
________________________________________
PublicLayout.jsx
Contains:
•	Navbar
•	Footer
•	Page Wrapper
________________________________________
AdminLayout.jsx
Contains:
•	Sidebar
•	Header
•	Main Content Area
________________________________________
7. PAGE STRUCTURE COMPONENTS
PageHero.jsx
Purpose:
Reusable page hero section.
Fields:
•	Title
•	Subtitle
•	Breadcrumb
Used On:
•	About
•	Programs
•	Events
•	Blogs
•	Infrastructure
•	Downloads
•	Contact
________________________________________
Breadcrumb.jsx
Example:
Home > Events > Innovation Bootcamp
Automatically generated based on route.
________________________________________
SectionHeader.jsx
Purpose:
Standardized section title component.
Includes:
•	Heading
•	Description
•	Orange Accent Divider
________________________________________
CTASection.jsx
Reusable Call-To-Action component.
Examples:
•	Apply Now
•	Contact Us
•	Become a Partner
•	Donate
________________________________________
8. DATA DISPLAY COMPONENTS
StartupCard.jsx
Fields:
•	Name
•	Logo
•	Sector
•	Description
•	Website Link
Features:
•	Featured Badge
•	Description Clamp
•	Fixed Card Height
•	Image Fallback
________________________________________
EventCard.jsx
Fields:
•	Title
•	Date
•	Banner
•	Description
Features:
•	Status Badge
•	Registration Button
•	Fixed Image Ratio
Status:
•	Upcoming
•	Completed
________________________________________
BlogCard.jsx
Fields:
•	Title
•	Author
•	Publish Date
•	Featured Image
Features:
•	Featured Badge
•	Read More Link
________________________________________
LeadershipCard.jsx
Fields:
•	Photo
•	Name
•	Designation
•	Bio
Used For:
•	CEO
•	Faculty
•	Advisors
•	Mentors
________________________________________
InfrastructureCard.jsx
Fields:
•	Image
•	Title
•	Description
________________________________________
DownloadRow.jsx
Fields:
•	Title
•	Description
•	Category
Actions:
•	Preview
•	Download
________________________________________
StatCard.jsx
Used For:
•	Startups Incubated
•	Programs Conducted
•	Mentors
•	Partnerships
Displays:
•	Number
•	Label
•	Icon
________________________________________
9. SYSTEM STATE COMPONENTS
ImageFallback.jsx
Mandatory Component.
Displays placeholder when:
•	Image Missing
•	Image Broken
•	URL Invalid
Prevents layout breakage.
________________________________________
EmptyState.jsx
Examples:
•	No Startups Available
•	No Events Scheduled
•	No Blogs Published
________________________________________
LoadingSpinner.jsx
Used For:
•	Buttons
•	Form Submission
•	Small Actions
________________________________________
CardSkeleton.jsx
Used While Loading:
•	Startups
•	Events
•	Blogs
•	Leadership
Prevents layout shifts.
________________________________________
ErrorState.jsx
Displays user-friendly messages when content cannot be loaded.
________________________________________
10. ADMIN COMPONENTS
DataTable.jsx
Reusable table component.
Used For:
•	Startups
•	Events
•	Blogs
•	Documents
•	Applications
________________________________________
SlideOverDrawer.jsx
Purpose:
Create and edit content.
Benefits:
•	Faster workflow
•	Reduced navigation
•	Cleaner UX
________________________________________
MarkdownEditor.jsx
Used For:
•	Blogs
•	News Articles
Restrictions:
•	No HTML
•	No Inline CSS
•	No Script Tags
Maintains brand consistency.
________________________________________
ConfirmationModal.jsx
Required Before:
•	Delete Startup
•	Delete Event
•	Delete Blog
•	Delete Document
________________________________________
ToastProvider.jsx
Success Examples:
•	Startup Added Successfully
•	Event Published
•	Blog Updated
Error Examples:
•	Upload Failed
•	Validation Error
•	Network Error
Recommended Library:
sonner
________________________________________
11. ADMIN DASHBOARD
Dashboard shall display:
Statistics
•	Total Startups
•	Total Events
•	Total Blogs
•	Total Documents
•	Pending Applications
________________________________________
Quick Actions
•	Add Startup
•	Add Event
•	Publish Blog
•	Upload Document
________________________________________
12. SEARCH & FILTERING
Startups
Search:
•	Startup Name
Filter:
•	Sector
________________________________________
Downloads
Search:
•	Document Title
________________________________________
Events
Filter:
•	Upcoming
•	Completed
________________________________________
13. PAGINATION STRATEGY
Default Page Size:
12 items per page
Applied To:
•	Startups
•	Blogs
•	Events
Benefits:
•	Faster loading
•	Better scalability
•	Improved user experience
________________________________________
14. FORM STANDARDS
All forms shall use:
React Hook Form
for state management.
Zod
for validation.
________________________________________
Validation Rules
Email
Valid email format required.
Phone
Minimum:
10 digits
Pitch Deck
Allowed Domains:
•	Google Drive
•	OneDrive
•	Dropbox
________________________________________
Error Handling
Errors shall appear below fields.
Browser default validation popups shall not be used.
________________________________________
15. DATA FETCHING STRATEGY
Public Website
Use:
•	Supabase Client
•	Custom React Hooks
________________________________________
Admin CMS
Use:
TanStack Query
Benefits:
•	Automatic Cache Updates
•	Faster CMS Experience
•	Reduced Refetching
________________________________________
16. IMAGE STANDARDS
Startup Logos
Aspect Ratio:
1:1
Preferred Format:
Transparent PNG
________________________________________
Leadership Photos
Aspect Ratio:
1:1
________________________________________
Event Banners
Aspect Ratio:
16:9
________________________________________
Infrastructure Images
Aspect Ratio:
16:9
________________________________________
Official NIE & NIETBI Logos
Rules:
•	Never Crop
•	Never Recolor
•	Never Distort
________________________________________
17. MOBILE NAVIGATION REQUIREMENTS
Menu Type
Full Screen Overlay
Requirements
•	Minimum 48px Tap Targets
•	Auto Close After Navigation
•	Scroll Lock While Open
•	Smooth Native Transitions
________________________________________
18. ACCESSIBILITY & BROWSER SUPPORT
Accessibility Lite
Required:
•	Alt Text Support
•	Visible Focus States
•	Keyboard Accessible Navigation
________________________________________
Supported Browsers
Latest Two Versions Of:
•	Chrome
•	Edge
•	Firefox
•	Safari
________________________________________
19. PERFORMANCE CONSTRAINTS
Prohibited Libraries
•	AOS
•	Lenis
Reason:
Prevent animation-related rendering issues.
________________________________________
Recommended
Use:
Tailwind Native Transitions
for all animations.
________________________________________
20. APPROVAL
This document defines the approved UI architecture, component library, route hierarchy, CMS interaction model, design governance framework, and frontend development standards for the NIETBI Official Website Platform.
All frontend development activities shall adhere to this document unless modified through an approved change request process.

