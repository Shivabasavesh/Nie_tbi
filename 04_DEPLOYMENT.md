DOCUMENT 4
DEPLOYMENT, ACCEPTANCE & HANDOFF PROTOCOL
Project
NIETBI Official Website Platform
Client
NIE Technology Business Incubator (NIETBI)
Host Institution
The National Institute of Engineering (NIE), Mysuru
Vendor
Agri Vectra Systems Private Limited
Document Phase
4 of 4
Version
Final Approved Deployment & Commercial Closure Framework
________________________________________
1. PURPOSE
This document defines the deployment process, acceptance methodology, ownership transfer procedure, warranty boundaries, commercial protections, and project closure mechanism for the NIETBI Official Website Platform.
This document shall govern:
•	Production Deployment
•	User Acceptance Testing (UAT)
•	Project Acceptance
•	Final Invoicing
•	Ownership Transfer
•	Warranty Support
•	Post-Handover Responsibilities
This document shall be read together with:
•	Document 1 – Product Requirements Document (PRD)
•	Document 2 – Technical Architecture & Data Schema
•	Document 3 – UI/UX Component Library & Site Architecture
________________________________________
2. PRODUCTION DEPLOYMENT PIPELINE
2.1 Infrastructure Architecture
The production deployment stack shall consist of:
Source Control
GitHub (Private Repository)
Frontend Hosting
Vercel
Backend Services
Supabase
Database
PostgreSQL (Supabase Managed)
Storage
Supabase Storage
Email Routing
Resend or equivalent transactional email service.
________________________________________
2.2 Deployment Workflow
The deployment process shall follow:
Developer
    ↓
GitHub Repository
    ↓
Vercel Build Pipeline
    ↓
Production Deployment
    ↓
Supabase Backend Services
________________________________________
2.3 Environment Configuration
Production environment variables shall include:
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
Additional variables may be configured as required for email routing and platform operation.
________________________________________
2.4 Authentication Domain Configuration
Supabase Authentication shall be configured to allow access only from approved deployment domains.
All authentication callbacks and administrative access shall be restricted to approved production URLs.
________________________________________
3. DOMAIN MANAGEMENT
Scenario A – Independent Domain
Example:
nietbi.in
Vendor Responsibility
Agri Vectra Systems Private Limited shall:
•	Purchase the domain
•	Configure DNS
•	Connect the domain to Vercel
•	Verify SSL certificate issuance
________________________________________
Scenario B – Institutional Subdomain (Recommended)
Example:
tbi.nie.ac.in
NIE Responsibility
The NIE IT Department shall:
•	Configure DNS records
•	Add required CNAME records
•	Add required A records
•	Approve subdomain activation
Vendor Responsibility
Agri Vectra Systems Private Limited shall provide:
•	DNS instructions
•	Required Vercel records
•	Technical support during setup
________________________________________
DNS Liability Exemption
Delays arising from:
•	DNS configuration
•	Domain approvals
•	Institutional IT approvals
•	Subdomain provisioning
shall not constitute delays attributable to Agri Vectra Systems Private Limited.
________________________________________
4. THIRD-PARTY SERVICE LIMITATIONS
The project utilizes third-party services including:
•	GitHub
•	Vercel
•	Supabase
•	Domain Registrars
•	Email Routing Providers
Following handover, the Vendor shall not be responsible for:
•	Service outages
•	Pricing changes
•	API changes
•	Service discontinuation
•	Platform limitations
•	Infrastructure policy changes
implemented by third-party providers.
________________________________________
5. USER ACCEPTANCE TESTING (UAT)
5.1 Staging Delivery
Upon completion of development, the Vendor shall deploy a fully functional staging environment.
Examples:
https://nietbi-staging.vercel.app
The staging platform may contain:
•	Placeholder images
•	Mock content
•	Sample startup records
•	Sample event records
where final institutional assets are unavailable.
________________________________________
5.2 UAT Period
NIETBI shall be granted:
Seven (7) Calendar Days
to review the staging platform.
The review period begins on the date the staging URL is officially shared.
________________________________________
5.3 Acceptable UAT Outcomes
Outcome A – Approved
The platform is accepted without objections.
The project proceeds to:
•	Final Invoicing
•	Handover Preparation
________________________________________
Outcome B – Approved with Minor Defects
The platform is accepted subject to correction of non-critical issues.
Examples:
•	Minor UI inconsistencies
•	Typographical corrections
•	Non-blocking display issues
The Vendor shall correct such issues before handover.
________________________________________
Outcome C – Rejected
Rejection must include:
•	Written feedback
•	Detailed defect list
•	Specific references to deviations from Documents 1–3
Requests beyond approved scope shall not constitute valid rejection grounds.
________________________________________
6. DEEMED ACCEPTANCE
If NIETBI does not provide:
•	Written approval
•	Written rejection
•	Defect reports
within the seven (7) calendar day UAT period, the platform shall be deemed accepted for the purposes of:
•	Project Closure
•	Final Invoicing
•	Handover Preparation
________________________________________
7. PROJECT ACCEPTANCE CERTIFICATE
Following successful UAT, NIETBI may issue a written Project Acceptance Certificate confirming:
•	Deliverables comply with approved requirements.
•	The platform is operational.
•	The project is accepted.
Issuance of the Acceptance Certificate shall constitute formal project acceptance.
If no certificate or written defect report is issued within the UAT period, deemed acceptance shall apply.
________________________________________
8. FINAL INVOICING
Invoice Trigger
The final invoice shall be raised upon:
•	Formal Acceptance
OR
•	Deemed Acceptance
whichever occurs first.
________________________________________
Payment Terms
Payment shall be processed in accordance with:
•	Purchase Order Terms
•	Institutional Financial Procedures
•	Applicable Internal Approval Processes
________________________________________
9. OFFICIAL HANDOFF PACKAGE
Upon invoice clearance and project completion, Agri Vectra Systems Private Limited shall transfer the complete operational ownership package.
________________________________________
9.1 Technical Assets
GitHub Repository
Ownership transfer of the source code repository.
________________________________________
Vercel Project
Ownership transfer of:
•	Production Deployment
•	Environment Settings
•	Domain Configuration
________________________________________
Supabase Project
Ownership transfer of:
•	Database
•	Storage Buckets
•	Authentication Configuration
________________________________________
Domain Ownership
Applicable only where the Vendor procured the domain.
________________________________________
9.2 Administrative Assets
Transfer of:
•	CMS Credentials
•	Super Admin Account
•	Configuration Documentation
________________________________________
9.3 Documentation Package
The Vendor shall provide:
Document 1
Product Requirements Document
Document 2
Technical Architecture & Data Schema
Document 3
UI/UX Component Library & Site Architecture
Document 4
Deployment, Acceptance & Handoff Protocol
CMS User Guide
Operational guide for managing:
•	Startups
•	Events
•	Blogs
•	Documents
•	Contact Information
________________________________________
10. CONTENT DEPENDENCY CLAUSE
Development shall proceed independently of pending institutional content.
Delays in providing:
•	Logos
•	Photographs
•	Startup Profiles
•	Policies
•	Documents
•	Contact Information
•	Approvals
shall not constitute project delays.
Placeholder assets may be used until final content is supplied.
Content replacement after deployment shall be managed through the CMS.
________________________________________
11. CHANGE REQUEST PROCEDURE
Any requirement not explicitly defined within:
•	Document 1
•	Document 2
•	Document 3
•	Document 4
shall be considered:
Out of Scope
Out-of-scope requests require:
•	Written Change Request
•	Cost Estimation
•	Timeline Revision
•	Formal Approval
prior to implementation.
________________________________________
12. POST-HANDOVER RESPONSIBILITIES
Following ownership transfer, NIETBI assumes responsibility for:
Infrastructure
•	Hosting Accounts
•	Domain Accounts
•	Subscription Management
Renewals
•	Domain Renewals
•	Hosting Upgrades
•	Usage-Based Charges
Security
•	Password Management
•	MFA Configuration
•	Credential Distribution
Content Management
•	Startup Updates
•	Event Updates
•	Blog Publishing
•	Document Uploads
Backup Operations
•	Database Exports
•	Backup Retention
•	Recovery Procedures
________________________________________
13. WARRANTY
Warranty Duration
One (1) Year
from the date of Formal Acceptance or Deemed Acceptance.
________________________________________
Covered Under Warranty
The Vendor shall remediate:
Technical Defects
•	Broken Functionality
•	Routing Failures
•	Authentication Errors
•	Database Query Failures
•	Delivered Feature Malfunctions
where caused by defects in the delivered codebase.
________________________________________
Excluded from Warranty
The warranty does not include:
New Features
•	Additional Pages
•	New Modules
•	New Integrations
Content Management
•	Uploading Content
•	Editing Content
•	Formatting Documents
Infrastructure Issues
•	Expired Domains
•	Subscription Failures
•	Third-Party Service Outages
User Actions
•	Deleted Records
•	Misconfigured Settings
•	Lost Credentials
________________________________________
14. WARRANTY SERVICE LEVEL AGREEMENT (SLA)
Critical Issues
Examples:
•	Website Offline
•	Authentication Failure
•	Major Routing Failure
Vendor Response Time:
Within Three (3) Business Days
________________________________________
Minor Issues
Examples:
•	Visual Bugs
•	Layout Inconsistencies
•	Non-Critical UI Issues
Vendor Response Time:
Within Five (5) Business Days
________________________________________
SLA Clarification
Response Time refers to acknowledgement and investigation commencement.
Resolution timelines may vary based on issue complexity.
________________________________________
15. PROJECT CLOSURE
The project shall be considered complete when:
•	Deliverables defined in Documents 1–4 are implemented.
•	UAT is completed or deemed accepted.
•	Final invoice is issued.
•	Handover package is prepared.
•	Ownership transfer obligations are fulfilled.
Upon completion of these activities, the project shall be formally closed.
________________________________________
16. APPROVAL
This document defines the approved deployment methodology, acceptance framework, invoicing trigger, ownership transfer process, warranty boundaries, and project closure procedure for the NIETBI Official Website Platform.
Together with Documents 1, 2, and 3, this document constitutes the complete and approved project framework governing execution, delivery, handover, and support of the NIETBI Official Website Platform.

