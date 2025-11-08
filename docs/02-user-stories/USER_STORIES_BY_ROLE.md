# QA Tools - User Stories by Role

## User Roles & Permissions (RBAC)

Based on the Q-Bridge system architecture, the following user roles are defined:

1. **Student** - Submit evaluations; view personal submissions; receive feedback summaries (course level)
2. **Academic Staff / Tutor** - Self/peer/unit evaluations; access course analytics for their courses; action plans; attach evidence
3. **HOD/Dean** (Academic and non-academic including Dean of Students) - Unit dashboards, approvals, action tracking; view flagged criteria (≤3); assign corrective actions
4. **QAU Analyst / QA Officer** - Full analytics, AI insights, ISEF composer, export packs; tool activation; compliance monitoring; follow-up tracking
5. **QA Admin** - Configure tools, forms, KPIs, academic structures
6. **SysAdmin** - Tenant, SSO, secrets, backups; system integrations
7. **Registrar / Academic Office** - Access programme evaluation reports; accreditation readiness; coordinate with QA
8. **Principal / Management Team** - High-level institutional performance; compliance summaries; aggregated analytics
9. **External Reviewer** (optional) - Read-only scoped access

---

## Priority Markers
- 🔴 **[P1]** = First Priority (Core system functionality from Q-Bridge user story)
- 🟡 **[P2]** = Second Priority (Enhanced features)
- 🟢 **[P3]** = Third Priority (Advanced/optional features)

---

## User Stories by Role

### 1. STUDENT

#### TOOL 2: Teaching & Learning Evaluation
**As a Student, I want to:**
- 🔴 **[P1]** Access and complete surveys on web or mobile device
- 🔴 **[P1]** Submit end-of-module/semester evaluations for courses anonymously
- 🔴 **[P1]** Rate lecturer's teaching effectiveness (knowledge, methods, organization)
- 🔴 **[P1]** Evaluate learning environment and student engagement
- 🔴 **[P1]** Assess use of LMS and teaching aids by lecturers
- 🔴 **[P1]** Provide feedback on assessment fairness and timeliness
- 🔴 **[P1]** Comment on course workload appropriateness
- 🔴 **[P1]** Suggest improvements for teaching and learning
- 🔴 **[P1]** Receive instant confirmation that my feedback has been recorded
- 🔴 **[P1]** View my submitted evaluations
- 🔴 **[P1]** Receive feedback summaries on actions taken (transparent feedback loop)
- 🔴 **[P1]** Contribute to improving learning quality and services at TPI

#### TOOL 4: Student Experience & Support Evaluation
**As a Student, I want to:**
- 🔴 **[P1]** Use my mobile device to rate institutional services anonymously
- 🔴 **[P1]** Evaluate academic support services (staff accessibility, registration, LMS)
- 🔴 **[P1]** Rate administrative and student support services
- 🔴 **[P1]** Assess hostel facilities, cafeteria, and health services
- 🔴 **[P1]** Evaluate counseling and psychosocial support
- 🔴 **[P1]** Rate sports and recreational activities
- 🔴 **[P1]** Assess campus safety and cleanliness
- 🔴 **[P1]** Evaluate online learning experience (if applicable)
- 🔴 **[P1]** Identify best aspects of student experience
- 🔴 **[P1]** Suggest improvements for student support and welfare
- 🔴 **[P1]** Receive confirmation that my feedback has been recorded
- 🔴 **[P1]** View my submission history

#### TOOL 12A: Student Online Learning Experience Survey
**As a Student, I want to:**
- 🔴 **[P1]** Access and complete online course evaluation surveys
- 🔴 **[P1]** Evaluate online course design and materials
- 🔴 **[P1]** Rate tutor performance and support
- 🔴 **[P1]** Assess online assessment and feedback quality
- 🔴 **[P1]** Evaluate digital accessibility and user experience
- 🔴 **[P1]** Rate my engagement in online learning
- 🔴 **[P1]** Provide feedback on online learning platform
- 🔴 **[P1]** Suggest improvements for online courses
- 🔴 **[P1]** View course-level feedback summaries

#### TOOL 10A: Graduate Tracer Survey
**As a Student (Graduate/Alumni), I want to:**
- 🟡 **[P2]** Provide feedback on my employment status
- 🟡 **[P2]** Rate relevance of skills acquired at TPI
- 🟡 **[P2]** Assess programme preparation for work environment
- 🟡 **[P2]** Evaluate curriculum alignment with market demands
- 🟡 **[P2]** Rate internship/fieldwork relevance
- 🟡 **[P2]** Comment on career guidance received
- 🟡 **[P2]** Suggest improvements for training programmes
- 🟡 **[P2]** Indicate willingness to participate in alumni mentorship

---

### 2. ACADEMIC STAFF / TUTOR

#### Core System Access
**As an Academic Staff Member, I want to:**
- 🔴 **[P1]** Log into the system and access only the QA tools assigned to me (e.g., Teaching & Learning Evaluation, LMS Utilization, Online Course QA)
- 🔴 **[P1]** Fill in forms easily (on web or mobile)
- 🔴 **[P1]** Attach evidence (screenshots, lesson plans, student feedback)
- 🔴 **[P1]** Submit evaluations and receive instant confirmation
- 🔴 **[P1]** See a summary of my submissions
- 🔴 **[P1]** Get automated recommendations when my scores or student feedback fall below standard (e.g., "Improve feedback turnaround time")
- 🔴 **[P1]** View how my department or course performed on key indicators (averages, trends, improvement plans)
- 🔴 **[P1]** Continuously improve my teaching quality and comply with QA requirements

#### TOOL 3: Academic Staff Performance & Development
**As an Academic Staff Member, I want to:**
- 🔴 **[P1]** Complete annual self-assessment of my performance
- 🔴 **[P1]** Rate my teaching, learning, and assessment activities
- 🔴 **[P1]** Document my research, publications, and innovations
- 🔴 **[P1]** Record community engagement and institutional service
- 🔴 **[P1]** Track my professional development activities
- 🔴 **[P1]** Identify areas needing improvement
- 🔴 **[P1]** Create a development plan with required support
- 🔴 **[P1]** View my performance history and trends
- 🔴 **[P1]** Access action plans assigned to me

#### TOOL 12B: Academic & E-Tutor Online Course Quality Evaluation
**As an Academic Staff Member, I want to:**
- 🔴 **[P1]** Complete self-evaluation of my online courses
- 🔴 **[P1]** Assess course quality and design
- 🔴 **[P1]** Evaluate my online teaching performance
- 🔴 **[P1]** Review assessment integrity measures
- 🔴 **[P1]** Monitor student engagement analytics for my courses
- 🔴 **[P1]** Identify strengths and challenges
- 🔴 **[P1]** Suggest improvements for online delivery
- 🔴 **[P1]** Access course-level analytics for my courses
- 🔴 **[P1]** View student feedback summaries for my courses

#### General Academic Staff Functions
**As an Academic Staff Member, I want to:**
- 🔴 **[P1]** Provide input on LMS usability and effectiveness
- 🔴 **[P1]** Report technical issues with LMS or E-library
- 🔴 **[P1]** Access training on LMS and E-library usage
- 🔴 **[P1]** Use LMS effectively for content delivery and student engagement
- 🔴 **[P1]** Access E-library resources for teaching materials
- 🔴 **[P1]** View action items assigned to me
- 🔴 **[P1]** Upload evidence for completed actions
- 🔴 **[P1]** Receive notifications for pending evaluations (Email/SMS/Push)

---

### 3. HOD/DEAN (Academic and Non-Academic including Dean of Students)

#### Core Dashboard & Auto-Flagging System
**As a Head of Department, I want to:**
- 🔴 **[P1]** View a dashboard summarizing responses from all staff and students under my department
- 🔴 **[P1]** Automatically see the average rating per criterion
- 🔴 **[P1]** Automatically see which criteria scored **3 or below** (auto-highlighted in red)
- 🔴 **[P1]** Receive AI-generated recommendations/interventions for those flagged items
- 🔴 **[P1]** Assign specific staff to take corrective action and set follow-up timelines
- 🔴 **[P1]** Download or print departmental QA reports for internal meetings and audits
- 🔴 **[P1]** Monitor teaching quality, implement improvements, and ensure departmental compliance with NACTVET standards

#### TOOL 1: LMS & E-Library Evaluation
**As a Head of Department, I want to:**
- 🔴 **[P1]** Evaluate LMS and E-Library quality monthly
- 🔴 **[P1]** Rate staff training effectiveness on LMS usage
- 🔴 **[P1]** Assess availability of studio facilities and technical support
- 🔴 **[P1]** Monitor online assessment and grading features
- 🔴 **[P1]** Track two-way feedback mechanisms
- 🔴 **[P1]** Review LMS analytics on student progress
- 🔴 **[P1]** Assess LMS integration with institutional systems
- 🔴 **[P1]** Verify data privacy and security compliance
- 🔴 **[P1]** Evaluate E-library resource adequacy
- 🔴 **[P1]** Document challenges and suggest improvements
- 🔴 **[P1]** Submit monthly evaluation reports
- 🔴 **[P1]** View unit dashboard for LMS/E-Library performance

#### TOOL 2: Teaching & Learning Evaluation
**As a Head of Department, I want to:**
- 🔴 **[P1]** Coordinate student evaluation surveys
- 🔴 **[P1]** Compile and analyze student feedback data
- 🔴 **[P1]** Calculate average scores by category
- 🔴 **[P1]** Identify areas requiring improvement (auto-flagged criteria ≤3)
- 🔴 **[P1]** Submit evaluation summaries
- 🔴 **[P1]** View unit dashboard for teaching quality
- 🔴 **[P1]** Track action items for my department
- 🔴 **[P1]** Approve corrective actions

#### TOOL 3: Academic Staff Performance & Development
**As a Head of Department, I want to:**
- 🔴 **[P1]** Review staff self-assessments annually
- 🔴 **[P1]** Provide ratings and comments on staff performance
- 🔴 **[P1]** Identify staff development needs
- 🔴 **[P1]** Support staff improvement plans
- 🔴 **[P1]** Submit performance evaluations
- 🔴 **[P1]** View unit dashboard for staff performance
- 🔴 **[P1]** Track staff development activities
- 🔴 **[P1]** Make evidence-based decisions on promotions

#### TOOL 5: Departmental Work Planning & Accountability
**As a Head of Department, I want to:**
- 🔴 **[P1]** Create annual departmental objectives and targets
- 🔴 **[P1]** Plan activities aligned with institutional strategic plan
- 🔴 **[P1]** Define key performance indicators (KPIs)
- 🔴 **[P1]** Assign responsibilities and timelines
- 🔴 **[P1]** Track resource requirements and gaps
- 🔴 **[P1]** Document departmental meetings and decisions
- 🔴 **[P1]** Monitor quarterly performance against targets
- 🔴 **[P1]** Track staff attendance and performance
- 🔴 **[P1]** Record student feedback and departmental responses
- 🔴 **[P1]** Submit quarterly and annual accountability reports
- 🔴 **[P1]** View unit dashboard with RAG (Red/Amber/Green) status
- 🔴 **[P1]** Track action items to closure

#### TOOL 6: Infrastructure and Resource Audit
**As a Head of Department, I want to:**
- Conduct semi-annual infrastructure audits
- Rate quality of lecture rooms, laboratories, and workshops
- Assess library facilities and office spaces
- Evaluate sanitation, accessibility, and security
- Rate ICT and digital infrastructure
- Assess equipment and teaching aids condition
- Identify areas requiring immediate improvement
- Submit audit reports
- View unit dashboard for infrastructure status

#### TOOL 9: Programme Review & Accreditation Checklist
**As a Head of Department, I want to:**
- Review programmes before NACTVET submission
- Evaluate programme rationale and relevance
- Assess programme design and structure
- Verify staffing adequacy and qualifications
- Assess facilities and resources
- Submit programme review reports
- View programme accreditation readiness scores
- Track programme review timelines

#### TOOL 11: Risk Assessment & Corrective Action
**As a Head of Department, I want to:**
- Identify risks in my department annually
- Assess likelihood and impact of risks
- Document existing risk controls
- Propose corrective actions for high-risk issues
- Monitor risk mitigation implementation
- Submit risk assessment reports
- View unit risk dashboard
- Track corrective actions to closure

#### TOOL 13: Field/Practical Supervision & Quality Assurance
**As a Head of Department/Field Coordinator, I want to:**
- Evaluate field site quality and learning environment
- Monitor supervision quality and assessment practices
- Track student performance and competence development
- Review student logbooks and record keeping
- Assess student safety and welfare
- Identify placement strengths and challenges
- Submit field supervision reports
- View field placement dashboards

#### General HOD/Dean Functions
**As a Head of Department/Dean, I want to:**
- View comprehensive unit dashboard with all KPIs
- Access heatmap by standard/tool for my unit
- Monitor completion and compliance rates
- View RAG (Red/Amber/Green) status for all metrics
- Approve action items for my unit
- Track action items assigned to my staff
- Receive alerts for overdue items
- Export unit reports (PDF/XLSX)

---

### 4. QAU ANALYST / QA OFFICER

#### Core QA Officer Functions
**As a QA Officer, I want to:**
- 🔴 **[P1]** Have full visibility into all QA tools and all departments
- 🔴 **[P1]** Activate and share tools (e.g., Tool 3: Staff Performance or Tool 10: Online Course Evaluation) to the appropriate user groups
- 🔴 **[P1]** Track which departments have completed tools and which are pending
- 🔴 **[P1]** View summaries of findings, flagged criteria, recommendations, and responsible persons for action
- 🔴 **[P1]** Approve departmental reports or request clarifications before final submission
- 🔴 **[P1]** Generate institutional QA reports, ISEF summaries, and NACTVET compliance reports with a single click
- 🔴 **[P1]** Follow up on corrective actions assigned to staff or HODs and mark them as completed once verified
- 🔴 **[P1]** Oversee institutional quality, track performance trends, and provide evidence for accreditation or audits

#### TOOL 1: LMS & E-Library Evaluation
**As a QAU Analyst, I want to:**
- 🔴 **[P1]** Review monthly LMS and E-Library evaluation reports
- Analyze average scores and performance levels across departments
- Identify institutional priority actions
- Track implementation of recommendations
- Monitor compliance with quality standards
- View institution-wide LMS/E-Library analytics

#### TOOL 2: Teaching & Learning Evaluation
**As a QAU Analyst, I want to:**
- Review teaching and learning evaluation reports
- Identify trends in teaching quality across institution
- Recommend interventions for improvement
- Track follow-up actions and timelines
- View institution-wide teaching effectiveness analytics

#### TOOL 3: Academic Staff Performance & Development
**As a QAU Analyst, I want to:**
- Review staff performance appraisals for completeness
- Identify institutional staff development needs
- Track performance gaps and improvement actions
- Monitor follow-up on development plans
- Ensure compliance with quality standards
- View institution-wide staff performance analytics

#### TOOL 4: Student Experience & Support Evaluation
**As a QAU Analyst, I want to:**
- Review student experience evaluation reports
- Identify key observations and trends across institution
- Recommend actions for improvement
- Assign responsibilities to relevant offices
- Track follow-up timelines and implementation
- View institution-wide student satisfaction analytics

#### TOOL 5: Departmental Work Planning & Accountability
**As a QAU Analyst, I want to:**
- Review departmental planning and execution
- Monitor meeting documentation and follow-up
- Assess student feedback integration
- Track staff performance monitoring
- Evaluate resource utilization
- Recommend improvements and assign responsibilities
- View cross-departmental performance comparisons

#### TOOL 6: Infrastructure and Resource Audit
**As a QAU Analyst, I want to:**
- Review infrastructure audit reports
- Assess compliance with NACTVET standards
- Recommend improvements and investments
- Assign responsibilities for corrective actions
- Track implementation timelines
- View institution-wide infrastructure status

#### TOOL 7: Governance and Institutional Integrity Audit
**As a QAU Analyst, I want to:**
- Conduct annual governance and integrity audits
- Evaluate governance structure and functionality
- Assess strategic management and planning
- Review institutional integrity and ethical conduct
- Monitor compliance with regulatory requirements
- Evaluate institutional transparency and accountability
- Identify governance strengths and weaknesses
- Recommend strategies for improvement
- Submit audit reports to Rector and Board

#### TOOL 8: Institutional Self-Evaluation Framework (ISEF)
**As a QAU Analyst, I want to:**
- Coordinate annual institutional self-evaluation
- Evaluate performance against 10 NACTVET Quality Standards
- Collect data from all departments and units
- Rate institutional compliance by standard
- Identify strengths, weaknesses, opportunities, and threats (SWOT)
- Create action plans for continuous improvement
- Use ISEF composer to generate reports
- Submit self-evaluation report to Rector and Board
- Support NACTVET re-accreditation processes
- View institution heatmap by NACTVET 1–10

#### TOOL 9: Programme Review & Accreditation Checklist
**As a QAU Analyst, I want to:**
- Verify programme review completeness
- Assess programme compliance with standards
- Recommend improvements before submission
- Validate programme documentation
- Support NACTVET accreditation processes
- Track programme review timelines
- View programme accreditation readiness scores

#### TOOL 10: Graduate Tracer & Employer Feedback
**As a QAU Analyst, I want to:**
- Conduct annual graduate tracer surveys
- Collect employer feedback on graduates
- Analyze employability and job relevance data
- Identify curriculum gaps and improvement areas
- Create action plans based on feedback
- Track collaboration opportunities with employers
- Report findings to management and departments
- View tracer summaries and employability metrics

#### TOOL 11: Risk Assessment & Corrective Action
**As a QAU Analyst, I want to:**
- Compile institutional risk assessments
- Categorize risks by type and severity
- Monitor corrective action implementation
- Report critical risks to management
- Track risk mitigation progress
- Recommend institutional risk management strategies
- View institution-wide risk dashboard
- Generate risk index by unit

#### TOOL 12A & 12B: Online Learning Evaluation
**As a QAU Analyst, I want to:**
- Collect student feedback on online courses
- Review online course quality reports
- Analyze online learning effectiveness
- Monitor compliance with e-learning standards
- Identify areas for improvement
- Recommend actions to enhance online learning
- Track implementation of improvements
- View online learning analytics across institution

#### TOOL 13: Field/Practical Supervision & Quality Assurance
**As a QAU Analyst, I want to:**
- Review field supervision quality reports
- Monitor compliance with placement standards
- Assess student safety and welfare measures
- Identify gaps in field supervision
- Recommend improvements and resources
- Track implementation of corrective actions
- View field placement analytics

#### AI & Advanced Analytics Functions
**As a QAU Analyst, I want to:**
- 🔴 **[P1]** **Auto-Flagging Engine**: Identify all criteria ≤3 and highlight for review
- 🔴 **[P1]** **Recommendation Generator**: Get AI-suggested intervention actions tailored to the tool and department
- 🔴 **[P1]** **Risk Analyzer**: Predict areas likely to underperform based on historical data
- 🔴 **[P1]** **NLP Comment Analyzer**: Extract themes and sentiment from open-ended responses
- 🔴 **[P1]** **Report Composer**: Automatically create reports for each QA tool or standard
- 🟡 **[P2]** Access AI-powered forecasting (satisfaction, dropout risk, assessment delays)
- 🟡 **[P2]** View anomaly detection alerts (sudden drops in engagement, unusual scores)
- 🟡 **[P2]** Access text analytics from open-ended responses (topic extraction, sentiment)
- 🟡 **[P2]** View risk scoring by unit
- 🟡 **[P2]** Receive AI-generated recommendations for corrective actions
- 🟡 **[P2]** Access early warning alerts based on ML models
- 🟡 **[P2]** View trend analysis and time-series comparisons
- 🟡 **[P2]** Access cohort comparisons across programmes

#### Reporting & Export Functions
**As a QAU Analyst, I want to:**
- 🔴 **[P1]** Generate one-click NACTVET evidence packs (PDF + XLSX)
- 🔴 **[P1]** Create ISEF matrices with mapped evidence
- 🔴 **[P1]** Generate programme checklists
- 🔴 **[P1]** Create tracer summaries
- 🔴 **[P1]** Generate drill-down reports (instrument → standard → unit → course)
- 🔴 **[P1]** Schedule automated report distribution
- 🔴 **[P1]** Export data in multiple formats (PDF, XLSX, CSV)
- 🔴 **[P1]** Access watermarked reports with audit trails

---

### 5. REGISTRAR / ACADEMIC OFFICE

**As the Registrar, I want to:**
- 🔴 **[P1]** Access summarized reports on programme evaluation, student feedback, and academic operations
- 🔴 **[P1]** Review accreditation readiness reports generated through the system
- 🔴 **[P1]** Coordinate with the QA Officer to address compliance issues
- 🔴 **[P1]** Ensure academic operations and programme development remain aligned with quality assurance findings

---

### 6. PRINCIPAL / MANAGEMENT TEAM

**As the Principal, I want to:**
- 🔴 **[P1]** Access a high-level dashboard summarizing institutional QA performance (by department, standard, or tool)
- 🔴 **[P1]** View trends in staff performance, student satisfaction, and programme quality
- 🔴 **[P1]** See institutional risk indicators and pending actions from QA recommendations
- 🔴 **[P1]** Download summary reports for Council and Board meetings
- 🔴 **[P1]** Make data-driven management and policy decisions for institutional improvement

---

### 7. QA ADMIN

#### Configuration & Setup Functions
**As a QA Admin, I want to:**
- Configure all QA tools and instruments
- Create and edit versioned evaluation forms
- Define question types (Likert, MCQ, matrix, numeric, file, open-ended)
- Set up targeting rules (by program, cohort, course, semester, role)
- Configure scheduling (opening/closing windows, reminders, nudges)
- Set anonymity modes (anonymous, pseudonymous, identified)
- Configure validation and branching logic
- Ensure accessibility compliance (WCAG 2.1 AA)

#### Academic Structure Management
**As a QA Admin, I want to:**
- Configure organizational structure (departments, schools, programs)
- Define academic programmes and cohorts
- Set up course codes and semesters
- Configure staff roles and assignments
- Map courses to programmes
- Define academic calendar and evaluation periods

#### KPI & Standards Configuration
**As a QA Admin, I want to:**
- Define institutional KPIs
- Configure NACTVET standards mapping
- Set up performance thresholds and RAG criteria
- Configure alert rules and escalation policies
- Define SLA timelines for action items
- Set up compliance requirements

#### Integration Management
**As a QA Admin, I want to:**
- Configure LMS (Moodle) integration settings
- Set up SIS/HR data sync rules
- Configure authentication/SSO settings
- Set up email/SMS notification templates
- Configure webhook endpoints
- Manage API access and rate limits

#### Form & Workflow Management
**As a QA Admin, I want to:**
- Create and version all 13 QA tools
- Configure workflow states and approvals
- Set up notification triggers
- Define data retention policies
- Configure consent prompts
- Set up data masking rules for anonymity

---

### 8. SYSADMIN / SYSTEM ADMINISTRATOR

#### Core System Administrator Functions
**As the System Administrator, I want to:**
- 🔴 **[P1]** Manage user accounts, permissions, and role assignments
- 🔴 **[P1]** Integrate the QA system with other platforms (e.g., Moodle LMS, Student Information System)
- 🔴 **[P1]** Backup data securely and ensure uptime
- 🔴 **[P1]** Configure notifications and workflows per tool activation
- 🔴 **[P1]** Ensure the system remains secure, reliable, and properly synchronized with institutional systems

#### Tenant Management
**As a SysAdmin, I want to:**
- 🟡 **[P2]** Create and manage tenant configurations
- Configure multi-tenant isolation
- Set up tenant-specific settings
- Monitor tenant resource usage
- Manage tenant lifecycle (activation, suspension, deletion)

#### Authentication & Security
**As a SysAdmin, I want to:**
- Configure SSO/OAuth2/OIDC providers
- Manage MFA settings
- Set up IP allowlists for admin access
- Configure session timeout policies
- Manage API keys and secrets
- Rotate encryption keys
- Configure security headers and policies

#### Infrastructure & Operations
**As a SysAdmin, I want to:**
- Monitor system health and performance
- Configure backup schedules
- Manage disaster recovery procedures (RPO ≤ 24h, RTO ≤ 8h)
- Set up monitoring and alerting (Prometheus/Grafana)
- Manage log aggregation (Loki)
- Configure auto-scaling rules
- Manage database maintenance

#### Data Management
**As a SysAdmin, I want to:**
- Manage encrypted backups
- Configure data retention policies
- Implement right-to-erasure procedures
- Manage data export requests
- Monitor storage usage
- Configure database sharding
- Manage data archival

#### Security & Compliance
**As a SysAdmin, I want to:**
- Review audit logs
- Monitor security events
- Conduct security assessments
- Manage vulnerability scanning
- Configure DLP rules for PII exports
- Ensure OWASP ASVS L2 compliance
- Manage TLS certificates
- Configure secrets vault

---

### 9. EXTERNAL REVIEWER (Optional)

#### Read-Only Access Functions
**As an External Reviewer, I want to:**
- Access scoped institutional reports
- View NACTVET evidence packs
- Review ISEF reports and matrices
- Access programme review documentation
- View governance and integrity audit reports
- Access infrastructure audit summaries
- Review graduate tracer and employer feedback
- View aggregated performance metrics
- Access read-only dashboards
- Export authorized reports (with watermarks)
- View compliance documentation

---

## Cross-Role Functional Requirements

### All Users
**As any authenticated user, I want to:**
- 🔴 **[P1]** Log in securely via SSO or credentials
- 🔴 **[P1]** Enable MFA for my account
- 🔴 **[P1]** Receive notifications (email, SMS, push) for pending tasks
- 🔴 **[P1]** View my dashboard relevant to my role
- 🔴 **[P1]** Access help documentation
- 🔴 **[P1]** Change my password
- 🔴 **[P1]** Update my profile information
- 🔴 **[P1]** View system announcements
- 🔴 **[P1]** Access the system via web or mobile app
- 🔴 **[P1]** Switch between English/Swahili language

### Mobile-Responsive Web (All Users - Phase 1)
**As a mobile browser user, I want to:**
- 🔴 **[P1]** Access the system via mobile browser (no app installation required)
- 🔴 **[P1]** Experience mobile-first responsive design on all screen sizes
- 🔴 **[P1]** Submit evaluations via mobile browser
- 🔴 **[P1]** View my dashboard optimized for mobile screens
- 🔴 **[P1]** Upload evidence/files using mobile browser (camera access)
- 🔴 **[P1]** Navigate with touch-friendly UI (buttons, forms optimized for mobile)
- 🔴 **[P1]** Install as Progressive Web App (PWA) - "Add to Home Screen" (optional)
- 🔴 **[P1]** Receive web push notifications
- 🟡 **[P2]** Access basic offline functionality via service workers

### Native Mobile Apps (Future - Phase 3)
**As a native app user, I want to:**
- 🟢 **[P3]** Download dedicated Android/iOS app from app stores
- 🟢 **[P3]** Enhanced offline sync with local database
- 🟢 **[P3]** Native camera integration for evidence capture
- 🟢 **[P3]** Native push notifications
- 🟢 **[P3]** Biometric authentication (fingerprint/face ID)

---

## System Flow Narrative (P1 - Core Workflow)

The Q-Bridge system follows this automated workflow:

1. **Tool Activation** 🔴 **[P1]**: QA Officer activates a QA tool (e.g., "Teaching and Learning Evaluation")
2. **Data Collection** 🔴 **[P1]**: Academic staff or students fill in the forms online; the system stores responses instantly
3. **Aggregation** 🔴 **[P1]**: The system auto-computes departmental averages, trends, and compliance percentages
4. **Flagging** 🔴 **[P1]**: All criteria rated **3 or below** are auto-highlighted in red and sent to HOD dashboards
5. **Recommendation Generation** 🔴 **[P1]**: AI module proposes specific interventions based on the flagged areas
6. **Assignment** 🔴 **[P1]**: HOD assigns responsible staff to take corrective actions; QA receives updates automatically
7. **QA Review** 🔴 **[P1]**: QA reviews actions taken, verifies evidence, and closes the item upon resolution
8. **Reporting** 🔴 **[P1]**: The system generates visual dashboards and exportable reports (PDF/Excel) for QA, departments, and management

---

## Notifications & Alerts (P1 - Core Communication)

**Email/SMS/Push notifications for:**
- 🔴 **[P1]** New tool activation
- 🔴 **[P1]** Pending submissions
- 🔴 **[P1]** Flagged performance issues (criteria ≤3)
- 🔴 **[P1]** Overdue follow-up actions
- 🔴 **[P1]** Completion confirmation

**Color-coded alerts:**
- 🔴 **Red** = Critical (requires immediate action)
- 🟠 **Orange** = Moderate (needs attention)
- 🟢 **Green** = Compliant (on track)

---

## Dashboard Structure by Role (P1 - Core Views)

| Role | Dashboard Features |
|------|-------------------|
| **Academic Staff** | My Courses, My Evaluations, AI Recommendations, Progress Tracker |
| **HOD** | Department Summary, Flagged Criteria (≤3), Improvement Plans, Reports |
| **QA Officer** | Institution-wide Overview, Compliance Index, Follow-up Tracker, Tool Manager |
| **Principal / Board** | Executive Dashboard, NACTVET Standards Summary, Institutional KPIs |
| **Student** | Course Evaluation History, Feedback Summary (anonymous) |

---

## Summary of Tools by User Role

| Tool | Student | Academic Staff | HOD/Dean | QAU Analyst | QA Admin | SysAdmin | External Reviewer |
|------|---------|----------------|----------|-------------|----------|----------|-------------------|
| **Tool 1**: LMS & E-Library | Input | Input | Submit | Review/Analyze | Configure | - | View |
| **Tool 2**: Teaching & Learning | Submit | - | Compile | Review/Analyze | Configure | - | View |
| **Tool 3**: Staff Performance | - | Self-Assess | Review | Analyze | Configure | - | View |
| **Tool 4**: Student Experience | Submit | - | Compile | Review/Analyze | Configure | - | View |
| **Tool 5**: Dept Work Planning | - | - | Submit | Review/Analyze | Configure | - | View |
| **Tool 6**: Infrastructure Audit | - | Input | Submit | Review/Analyze | Configure | - | View |
| **Tool 7**: Governance Audit | - | - | - | Conduct | Configure | - | View |
| **Tool 8**: ISEF | - | Input | Input | Coordinate | Configure | - | View |
| **Tool 9**: Programme Review | - | Input | Submit | Verify | Configure | - | View |
| **Tool 10**: Tracer & Employer | Submit (Alumni) | - | - | Conduct | Configure | - | View |
| **Tool 11**: Risk Assessment | - | - | Submit | Compile | Configure | - | View |
| **Tool 12A**: Online Learning (Student) | Submit | - | - | Analyze | Configure | - | View |
| **Tool 12B**: Online Learning (Academic) | - | Self-Assess | Review | Analyze | Configure | - | View |
| **Tool 13**: Field Supervision | Input | Supervise | Coordinate | Review/Analyze | Configure | - | View |

---

## Key Performance Indicators by Role

### Student KPIs
- Evaluation completion rate ≥ 70% per course
- Mobile app satisfaction ≥ 90%
- Feedback loop visibility (actions taken on feedback)

### Academic Staff KPIs
- Self-assessment completion rate ≥ 95%
- Course analytics utilization rate
- Action plan completion rate ≥ 90%

### HOD/Dean KPIs
- Unit evaluation completion rate ≥ 95%
- Action item closure rate ≥ 90% within SLA
- Unit compliance score by NACTVET standard

### QAU Analyst KPIs
- Report generation time ≤ 60s
- ISEF completion within deadline
- AI model accuracy (MAE within thresholds, anomaly precision ≥ 0.75)
- Forecasting MAPE ≤ 15%

### QA Admin KPIs
- Form deployment success rate ≥ 99%
- Configuration change accuracy ≥ 99%
- System uptime ≥ 99.5%

### SysAdmin KPIs
- System uptime ≥ 99.5% monthly
- Backup success rate 100%
- Security incident response time ≤ 4h
- P95 page load < 2.5s (web), < 1s (mobile)

---

## Conclusion

This document provides role-based user stories aligned with the Q-Bridge system architecture. Each role has clearly defined permissions and functional requirements that support the overall Quality Assurance framework at Tandabui Polytechnic Institute.
